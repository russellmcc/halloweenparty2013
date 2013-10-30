keycode = 'elm'

debug = process.argv.length > 2

express = require 'express.io'
http = require 'http'
osc = require 'osc-min'
dgram = require 'dgram'
binpack = require 'binpack'

udp = dgram.createSocket 'udp4'

app = express()
app.http().io()
app.use (req, res, next) ->
  req.headers['if-none-match'] = 'no-match-for-this'
  next()

app.use express.bodyParser()

app.use express.static(
  if debug
    "#{process.cwd()}/client"
  else
    "#{process.cwd()}/client/build"
)

sendOSC = (address, val) ->
  buf = osc.toBuffer {
    address
    args: val
  }
  udp.send buf, 0, buf.length, 8000, 'localhost'

app.io.route 'login', (req) ->
  if req.data?.toLowerCase?() is keycode
    req.socket.stupidAuth = true

lastLight = 50
sendLight = (p) ->
  udp.send (binpack.packUInt8 p), 0, 1, 8001, '192.168.1.112'
startLight = ->
  sendLight lastLight
moveLight = (v)->
  lastLight = v
  sendLight v
endLight = ->
  setTimeout (-> sendLight 200), 100
airhornLight = ->
  sendLight 255

for k in ['airhorn', 'filter', 'glitch'] then do (k) =>
  app.io.route k, (req) ->
    return unless req.socket.stupidAuth
    req.io.broadcast k, req.data
    if req.data.action is 'move'
      if typeof req.data.value isnt 'object'
        req.data.value = {value: req.data.value}
      for key, v of req.data.value
        sendOSC "#{k}/#{key}", +v/128
      moveLight(req.data.value[0]) if k is 'glitch'
    if req.data.action is 'start'
      sendOSC "#{k}/active", 1
      startLight() if k is 'glitch'
      airhornLight() if k is 'airhorn'
    if req.data.action is 'end'
      sendOSC "#{k}/active", 0
      endLight() if k is 'glitch'
      
app.listen if debug then 8080 else 69
