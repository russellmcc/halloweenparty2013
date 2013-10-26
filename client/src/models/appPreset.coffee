define ['cs!./preset'], (Preset)->
  Preset.extend
    initialize: ->
      Preset.prototype.initialize
        volume: 'v'

