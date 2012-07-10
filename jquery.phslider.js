;
(function ($, window, document, undefined) {
    // Create the defaults once
    var pluginName = 'phslider',
        defaults = {
            width:0,
            height:0,
            // Seconds
            duration:1,
            animation:'fade',
            // Miliseconds
            animationDuration:2000,
            // Handlers
            onInit:function () {
            },
            onSlideChange:function (slide, totalSlides) {
            }
        },
        actualSlide = 1,
        nextSlide = 1,
        previousSlide = null,
        $actualSlide = null,
        slidesNumber = 0,
        _styles = null;

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        // Getting slides info
        slidesNumber = $(this.element).children('.slide').length
        $(this.element).children('.slide').each(function () {
            $(this).attr('data-slide', $(this).index() + 1)
        })

        // Getting viewport width/height
        if (!this.options.width && !this.options.height) {
            this.options.width = $(this.element).parent().width();
            this.options.height = $(this.element).parent().height();
        } else {
            $(this.element).width(this.options.width);
            $(this.element).height(this.options.height);
        }

        this.createViewport();
        this.prepareStyles();
        this.prepareSlides();
        this.options.onInit(slidesNumber);
        this.start();
    };

    Plugin.prototype.prepareStyles = function () {
        _styles = {
            first:{
                display:'block'
            },
            reset:{
                opacity:1
                //'z-index': 0
            },
            slidetop:{
                actualSlide:{
                    position:'absolute'
                },
                actualSlideAnimationTo:{
                    top:-1 * this.getViewportHeight()
                },
                nextSlide:{
                    display:'block',
                    left:0,
                    position:'absolute',
                    top:this.getViewportHeight()
                },
                nextSlideAnimationTo:{
                    top:0
                }
            },
            slideright:{
                actualSlide:{
                    position:'absolute'
                },
                actualSlideAnimationTo:{
                    left:this.getViewportWidth()
                },
                nextSlide:{
                    display:'block',
                    left:-1 * this.getViewportWidth(),
                    position:'absolute',
                    top:0
                },
                nextSlideAnimationTo:{
                    left:0
                }
            },
            slidebottom:{
                actualSlide:{
                    position:'absolute'
                },
                actualSlideAnimationTo:{
                    top:this.getViewportHeight()
                },
                nextSlide:{
                    display:'block',
                    left:0,
                    position:'absolute',
                    top:-1 * this.getViewportHeight()
                },
                nextSlideAnimationTo:{
                    top:0
                }
            },
            slideleft:{
                actualSlide:{
                    position:'absolute'
                },
                actualSlideAnimationTo:{
                    left:-1 * this.getViewportWidth()
                },
                nextSlide:{
                    display:'block',
                    left:this.getViewportWidth(),
                    position:'absolute',
                    top:0
                },
                nextSlideAnimationTo:{
                    left:0
                }
            },
            fade:{
                actualSlide:{
                    position:'absolute',
                    display:'block',
                    left:0,
                    top:0,
                    opacity:1,
                    'z-index':10
                },
                actualSlideAnimationTo:{
                    opacity:0
                },
                nextSlide:{
                    position:'absolute',
                    display:'block',
                    left:0,
                    top:0,
                    opacity:0,
                    'z-index':1
                },
                nextSlideAnimationTo:{
                    opacity:1
                }
            }
        };
    }

    Plugin.prototype.createViewport = function () {
        $(this.element).css({
            height:this.options.height,
            position:'relative',
            overflow:'hidden',
            width:this.options.width
        })
    }

    Plugin.prototype.prepareSlides = function () {
        for (var i = 1; i <= slidesNumber; i++) {
            $(this.element).children('[data-slide="' + i + '"]').css({
                width:this.options.width,
                height:this.options.height,
                display:'none'
            });
        }
        $(this.element).children('[data-slide="1"]').css(_styles.first);
    }

    Plugin.prototype.start = function () {
        this.getNextSlide();
        this.getDataFromSlide(actualSlide);
        this.options.onSlideChange($actualSlide, slidesNumber);
        this.waitForNextSlide()
    }

    Plugin.prototype.waitForNextSlide = function () {
        var waitTime = $actualSlide.duration;
        setTimeout($.proxy(this.next, this), waitTime * 1000);
    }

    Plugin.prototype.slideTo = function (_slide) {
        this.animate();
        actualSlide = _slide;
        this.getDataFromSlide(actualSlide);
        this.options.onSlideChange($actualSlide, slidesNumber);
        this.getNextSlide();
        this.getPreviousSlide();
        this.waitForNextSlide();
    }

    Plugin.prototype.animate = function () {
        var _actual = $(this.element).children('[data-slide="' + actualSlide + '"]');
        var _next = $(this.element).children('[data-slide="' + nextSlide + '"]');

        _next.css(_styles[$actualSlide.animation].nextSlide);
        _actual.css(_styles[$actualSlide.animation].actualSlide);

        _next.animate(_styles[$actualSlide.animation].nextSlideAnimationTo);
        _actual.animate(_styles[$actualSlide.animation].actualSlideAnimationTo);

        _actual.css(_styles.reset);
        _next.css(_styles.reset);
    }

    Plugin.prototype.next = function () {
        this.slideTo(nextSlide)
    }

    Plugin.prototype.getNextSlide = function () {
        var next = (actualSlide + 1);
        if (next > slidesNumber) {
            next = 1;
        }
        nextSlide = next;
    }

    Plugin.prototype.prev = function () {
        this.slideTo(previousSlide);
    }

    Plugin.prototype.getPreviousSlide = function () {
        var previous = (actualSlide - 1);
        if (previous < 1) {
            previous = slidesNumber;
        }
        previousSlide = previous;
    }

    Plugin.prototype.getDataFromSlide = function (slide) {
        var _element = $(this.element).children('[data-slide="' + slide + '"]');
        $actualSlide = {
            'slide':parseInt(_element.attr('data-slide')),
            'duration':(_element.attr('data-duration')) ? _element.attr('data-duration') : this.options.duration,
            'animation':(_element.attr('data-animation')) ? _element.attr('data-animation') : this.options.animation,
            'animationDuration':(_element.attr('data-animation-duration')) ? _element.attr('data-animation-duration') : this.options.animationDuration
        };
    }

    Plugin.prototype.getViewportWidth = function () {
        return this.options.width;
    }

    Plugin.prototype.getViewportHeight = function () {
        return this.options.height;
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);