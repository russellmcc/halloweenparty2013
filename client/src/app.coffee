define [], () -> -> $ ->
  socket = io.connect()
  $(document).bind 'touchmove', false
  $('#airhorn').bind 'mousedown touchstart', (e) ->
    e.preventDefault()
    socket.emit 'airhorn', {action:'start'}
    $(document).bind 'mouseup touchend', ->
      $(document).unbind 'mouseup touchend'
      socket.emit 'airhorn', {action:'end'}

  socket.on 'airhorn', (data) ->
    if data.action is 'start'
      $('#airhorn').addClass 'active'
    else
      $('#airhorn').removeClass 'active'

  class Controllable
    constructor: (@id) ->
      @send = _.throttle @doSend, 100
      socket.on @id, (data) =>
        @["peer#{data.action}"]?(data.value) unless @controlling

    doSend: =>
      socket.emit "#{@id}", {action: 'move', value:@currVal}
    start: =>
      @controlling = true
      socket.emit "#{@id}", {action: 'start'}
    end: =>
      @controlling = false
      socket.emit "#{@id}", {action: 'end'}
    move: (v) =>
      if @controlling
        @currVal = v
        @send()

  fgColor = '#eaff50'
  bgColor = '#ff0063'
  
  class XY extends Controllable
    constructor: (id) ->
      super(id)
      @$ = $("##{id}")
      @elem = @$.xy {
        @start
        release: @end
        cancel: @end
        change: @move
        fgColor: bgColor
        height: 100
        width: 100
        min: 0
        max: 128
        displayInput: off
      }
      @elem.css
        border: "5px solid #{bgColor}"
        'border-radius': '10px'
    start: ->
      @peerstart()
      super()
    end: ->
      @peerend()
      super()
    peerstart: ->
      @$.trigger 'configure', fgColor: fgColor
    peerend: ->
      @$.trigger 'configure', fgColor: bgColor
    peermove: (v) ->
      @$.find('input').each (k) ->
        $(@).val v[k]
        $(@).trigger 'change'

  new XY('glitch')

  class Dial extends Controllable
    constructor: (id) ->
      super(id)
      @$ = $("##{id}")
      elem = @$.dial
        fgColor: fgColor
        bgColor: bgColor
        angleArc:270
        angleOffset:225
        flatMouse: on
        noScroll: on
        height: 60
        width: 60
        min: 0
        max: 128
        displayInput: off
        start: @start
        release: @end
        cancel: @end
        change: @move
    peermove: (v) ->
      @$.val v
      @$.trigger 'change'
  new Dial('filter')

  socket.emit 'login', prompt "what's the password?"
