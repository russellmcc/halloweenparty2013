define [], () -> -> $ ->
  socket = io.connect()

  $('#airhorn').bind 'mousedown touchstart', ->
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
      @currVal = v
      @send()

  class XY extends Controllable
    constructor: (id) ->
      super(id)
      @$ = $("##{id}")
      @elem = @$.xy {
        @start
        release: @end
        cancel: @end
        change: @move
        fgColor: '#90465D'
        height: 128
        width: 128
        min: 0
        max: 128
        displayInput: off
      }
      @elem.css
        border: '5px solid #AF7C83'
        'border-radius': '10px'
    start: ->
      @peerstart()
      super()
    end: ->
      @peerend()
      super()
    peerstart: ->
      @$.trigger 'configure', fgColor: '#360F24'
    peerend: ->
      @$.trigger 'configure', fgColor: '#90465D'
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
        fgColor: '#360F24'
        bgColor: '#AF7C83'
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