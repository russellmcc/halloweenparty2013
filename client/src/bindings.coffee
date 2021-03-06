# this defines a class that binds
# a backbone model to audio params.
define [], ->
  class Bindings
    constructor: ->
      @binds = []
      _.extend @, Backbone.Events

    # primative that binds a group of model params
    # to a function - if the any were changed, the
    # function is called with the new values as arguments.
    #
    # c is the context at which to call the function.
    bindFunc: (ps, f, c) ->
      b = {ps: ps, f: f, c: c}
      @binds.push b
      @sync b
      
    # directly binds a parameter.
    bindParam: (modelParam, audioParam, scale) ->
      scale ?= (v) -> v
      @bindFunc [modelParam], (v) -> audioParam.value = scale v

    # helper to create a log scale
    @logScale: (min, max, base) ->
      base ?= 2
      l = (x) -> (Math.log x)/(Math.log base)
      logmin = l min
      logmax = l max
      (v) ->
        Math.pow(base, v * (logmax - logmin) + logmin)

    @arrayIndex: (arr) -> (v) ->
      v *= arr.length
      v = ~~v
      v = arr.length - 1 if v >= arr.length
      arr[v]

    # binds a parameter with an associated "range" knob
    bindRange: (baseParam, rangeParam, audioParam, ranges, baseScale) ->
      baseScale ?= (v) -> v
      set = (base, range) ->
        range = Math.floor range * (ranges.length - .001)
        audioParam.value = ranges[range] * baseScale base
      @bindFunc [baseParam, rangeParam], set

    sync: (b) ->
      if not b?
        (@sync b) for b in @binds
      else
        # if everything's ready, call it now.
        if (_.all b.ps, (p) => (@model?.get p)?)
          b.f.apply b.c, ((@model.get p) for p in b.ps)

    # callback
    change: (e) ->
      for b in @binds
        if (_.any b.ps, (p) -> e.changed[p]?) and
           (_.all b.ps, (p) -> (e.get p)?)
          b.f.apply b.c, ((e.get p) for p in b.ps)

    bindPreset: (@model) ->
      @stopListening()
      @listenTo @model, 'change', @change
      @sync()