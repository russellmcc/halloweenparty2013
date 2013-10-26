keycode = 'nightmare'

debug = process.argv.length > 2

express = require 'express.io'
http = require 'http'
osc = require 'osc-min'
dgram = require 'dgram'

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
  if req.data is keycode
    req.socket.stupidAuth = true

for k in ['airhorn', 'filter', 'glitch'] then do (k) =>
  app.io.route k, (req) ->
    return unless req.socket.stupidAuth
    req.io.broadcast k, req.data
    if req.data.action is 'move'
      if typeof req.data.value isnt 'object'
        req.data.value = {value: req.data.value}
      for key, v of req.data.value
        sendOSC "#{k}/#{key}", +v/128
    if req.data.action is 'start'
      sendOSC "#{k}/active", 1
    if req.data.action is 'end'
      sendOSC "#{k}/active", 0
app.listen if debug then 8080 else 80
