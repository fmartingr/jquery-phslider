(($, window) ->
  pluginName = 'phslider'
  defaults =
    width: 0
    height: 0
    # Seconds
    duration:1
    animation:'fade'
    # Miliseconds
    animationDuration:2000
    # Handlers
    onInit: (totalSlides) ->
    onSlideChange: (slide, totalSlides) ->

  actualSlide = 1
  nextSlide = 1
  previousSlide = null
  $actualSlide = null
  slidesNumber = 0
  _styles = null
  _slideshowRunning = true

  class Plugin
    constructor: (@element, options) ->
      @options = $.extend {}, defaults, options

      @_defaults = defaults
      @_name = pluginName

      @init()

    init: ->
      # Getting slides info
      slidesNumber = $(@element).children(".slide").length
      $(@element).children('.slide').each ->
        $(@).attr 'data-slide', $(@).index() + 1

      if not @options.width and not @options.height
        @options.width = $(@element).parent.width
        @options.height = $(@element).parent.height
      else
        $(@element).width @options.width
        $(@element).height @options.height

      @createViewport()
      @prepareStyles()
      @prepareSlides()
      @options.onInit slidesNumber
      @prepareButtons()
      @start()

    prepareButtons: ->
      $('*[data-phslider="nextButton"]').click =>
        @next true

      $('*[data-phslider="prevButton"]').click =>
        @prev true

      $('*[data-phslider="slideToButton"]').click { plg: this }, (e) ->
        slide = parseInt $(@).attr 'data-slide'
        e.data.plg.slideTo slide
        e.data.plg.pause()

    prepareStyles: ->
      _styles =
        # First
        first:
          display: 'block'

        # Reset
        reset:
          opacity: 1

        # Slide top
        slidetop:
          actualSlide:
            position: 'absolute'
          actualSlideAnimationTo:
            top: -1 * @getViewportHeight()
          nextSlide:
            display: 'block'
            left: 0
            position: 'absolute'
            top: @getViewportHeight()
          nextSlideAnimationTo:
            top: 0

        # Slide right
        slideright:
          actualSlide:
            position: 'absolute'
          actualSlideAnimationTo:
            left: @getViewportWidth()
          nextSlide:
            display: 'block'
            left: -1 * @getViewportWidth()
            position: 'absolute'
            top: 0
          nextSlideAnimationTo:
            left: 0
        # Slide bottom
        slidebottom:
          actualSlide:
            position: 'absolute'
          actualSlideAnimationTo:
            top: @getViewportHeight()
          nextSlide:
            display: 'block'
            left: 0
            position: 'absolute'
            top: -1 * @getViewportHeight()
          nextSlideAnimationTo:
            top: 0

        # Slide left
        slideleft:
          actualSlide:
            position: 'absolute'
          actualSlideAnimationTo:
            left: -1 * @getViewportWidth()
          nextSlide:
            display: 'block'
            left: @getViewportWidth()
            position: 'absolute'
            top: 0
          nextSlideAnimationTo:
            left: 0

        # Fade
        fade:
          actualSlide:
            position: 'absolute'
            display: 'block'
            left: 0
            top: 0
            opacity: 1
            'z-index': 10
          actualSlideAnimationTo:
            opacity: 0
          nextSlide:
            position: 'absolute'
            display: 'block'
            left: 0
            top: 0
            opacity: 0
            'z-index': 1
          nextSlideAnimationTo:
            opacity: 1

    createViewport: ->
      $(@element).css
        height: @options.height
        position: 'relative'
        overflow: 'hidden'
        width: @options.width

    prepareSlides: ->
      for i in [1..slidesNumber]
        $(@element).children("[data-slide='#{i}']").css
          width: @options.width
          height: @options.height
          display: 'none'

      $(@element).children('[data-slide="1"]').css _styles.first

    start: ->
      @getNextSlide()
      @getDataFromSlide actualSlide
      @options.onSlideChange $actualSlide, slidesNumber
      @play()

    waitForNextSlide: ->
      waitTime = $actualSlide.duration
      setTimeout $.proxy(@autoSlide, @), waitTime*1000 if _slideshowRunning

    autoSlide: ->
      @next() if _slideshowRunning

    slideTo: (_slide) ->
      @animate _slide
      actualSlide = _slide
      @getDataFromSlide actualSlide
      @options.onSlideChange $actualSlide, slidesNumber
      @getNextSlide()
      @getPreviousSlide()
      @waitForNextSlide() if _slideshowRunning

    animate: (_slide) ->
      _actual = $(@element).children("[data-slide='#{actualSlide}']")
      _next = $(@element).children("[data-slide='#{_slide}']")

      _next.css _styles[$actualSlide.animation].nextSlide
      _actual.css _styles[$actualSlide.animation].actualSlide

      _next.animate _styles[$actualSlide.animation].nextSlideAnimationTo
      _actual.animate _styles[$actualSlide.animation].actualSlideAnimationTo

      _actual.css _styles.reset
      _next.css _styles.reset

    next: (_manual) ->
      @slideTo nextSlide
      @pause() if _manual

    getNextSlide: ->
      next = actualSlide + 1
      nextSlide = if next > slidesNumber then 1 else next

    prev: (_manual) ->
      @slideTo previousSlide
      @pause() if _manual

    getPreviousSlide: ->
      previous = actualSlide - 1
      previousSlide = if previous < 1 then slidesNumber else previous

    pause: ->
      _slideshowRunning = false
      console.log "Pause: #{_slideshowRunning}"

    play: ->
      _slideshowRunning = true
      @waitForNextSlide()

    getDataFromSlide: (_slide) ->
      _element = $(@element).children "[data-slide='#{_slide}']"
      $actualSlide =
        slide: parseInt _element.attr 'data-slide'
        duration: _element.attr('data-duration') or @options.duration
        animation: _element.attr('data-animation') or @options.animation
        animationDuration: _element.attr('data-animationDuration') or @options.animationDuration

    getViewportWidth: ->
      @options.width

    getViewportHeight: ->
      @options.height

  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(this, "plugin_#{pluginName}")
        $.data(@, "plugin_#{pluginName}", new Plugin(@, options))

)(jQuery, window)