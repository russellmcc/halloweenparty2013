express = require 'express.io'
http = require 'http'
osc = require 'osc-min'
dgram = require 'dgram'

udp = dgram.createSocket 'udp4'

app = express()
app.http().io()

app.use express.bodyParser()

app.use express.static(
  if process.argv.length > 2
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

for k in ['airhorn', 'filter', 'glitch'] then do (k) =>
  app.io.route k, (req) ->
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
app.listen 80
