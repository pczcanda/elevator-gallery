/*!
 * jquery.slider.js
 * Copyright 2015 Equator and other contributors; Licensed MIT
 */
;
(function($) {

	'use strict';

	var Slider = function(el, opts) {

		var locked = false;
		var options = opts;
		var $element = $(el);
		var $container = $('.slider__panes', $element);
		var $dots;
		var loopId = null;

		var sliderWidth = function() {
			var width = 0;
			for (var i = 0; i < $('.slider__pane', $element).length; i++) {
				width += $('.slider__pane', $element).eq(i).outerWidth(true);
			}

			return width;
		};

		var startAutoLoop = function() {
			var nextLoop = function() {
				next(true);
				loopId = setTimeout(nextLoop, options.autoLoopTime);
			};
			loopId = setTimeout(nextLoop, options.autoLoopTime);
		};

		var slideEnabled = function() {
			if (locked) {
				return false;
			}
			if ($element.outerWidth(true) >= sliderWidth()) {
				return false;
			}
			return true;
		};

		var setActiveDot = function(idx) {
			$dots.filter('.active').removeClass("active");
			$dots.eq(idx).addClass("active");
		};

		var next = function(animate) {
			if (!slideEnabled()) {
				return false;
			}

			if (options.showDots) {

				setActiveDot(($dots.filter('.active').index() + 1) % $('.slider__pane', $element).length);
			}
			locked = true;

			if (options.onChange) {
				options.onChange(1);
			}

			var speed = 0;
			if (animate) {
				speed = options.slide_speed;
			}
			var slide = $('.slider__pane', $element).eq(0);
			slide.animate({
				marginLeft: -slide.outerWidth()
			}, {
				duration: speed,
				complete: function() {
					slide.css("margin-left", 0);
					$container.append(slide);
					locked = false;
				},
				easing: options.easing
			});

			$element.trigger("next");

			return false;
		};

		var prev = function(animate) {
			if (!slideEnabled()) {
				return false;
			}

			if (options.showDots) {
				setActiveDot(($dots.filter('.active').index() - 1) % $('.slider__pane', $element).length);
			}
			locked = true;

			var slide = $('.slider__pane', $element).last();
			slide.css("margin-left", -slide.width());
			$container.prepend(slide);

			if (options.onChange) {
				options.onChange(-1);
			}

			var speed = 0;
			if (animate) {
				speed = options.slide_speed;
			}

			slide.animate({
				marginLeft: 0
			}, {
				duration: speed,
				complete: function() {
					locked = false;
				}
			});

			$element.trigger("previous");

			return false;
		};

		var bindEvents = function() {
			if (options.showNav) {

				$(".slider__nav--next", $element).on('click', function() {
					next(true);
					return false;
				});
				$(".slider__nav--prev", $element).on('click', function() {
					prev(true);
					return false;
				});
			}
			if (options.showDots) {
				$dots.click(function(e) {
					e.preventDefault();
					clearTimeout(loopId);
					var currentIndex = $dots.filter('.active').index();
					var nextIndex = $(this).index();
					var i;
					var diff = nextIndex - currentIndex;
					if (diff > 0) {
						for (i = 0; i < diff; i++) {
							next(false);
						}
					} else if (diff < 0) {
						diff *= -1;
						for (i = 0; i < diff; i++) {
							prev(false);
						}
					}

					setActiveDot($(this).index());
					return false;
				});
			}
		};

		var createNav = function() {
			if (options.showNav) {
				$element.find('.slider-navigation').append($("<div class='slider__nav slider__nav--next'><span></span></div>"));
				$element.find('.slider-navigation').append($("<div class='slider__nav slider__nav--prev'><span></span></div>"));
			}

			if (options.showDots) {
				$element.append($("<div class='slider__dotsnav'></div>"));

				for (var i = 0; i < $('.slider__pane', $element).length; i++) {
					$('.slider__dotsnav', $element).append($("<a href='#' class='slider__dotsnav__item'></a>"));
				}
				$dots = $('.slider__dotsnav__item', $element);
				$dots.first().addClass("active");
			}
		};

		var init = function() {

			if ($('.slider__pane', $element).length > 1) {
				createNav();
			}

			$('img', $element).attr("draggable", false);

			if ($('.slider__pane', $element).length > 1) {
				$('.slider__pane', $element).last().addClass("last");
			}

			bindEvents();

			if (options.autoLoop) {
				startAutoLoop();
			}
		};

		init();
	};

	$.fn.slider = function(options) {
		if ($(this).length === 0) {
			return false;
		}

		var opts = $.extend({}, $.fn.slider.defaults, options);

		return this.each(function() {
			return new Slider($(this), opts);
		});
	};

	$.fn.slider.defaults = {
		slide_speed: 300,
		showNav: true,
		showDots: true,
		easing: 'swing',
		autoLoop: false,
		autoLoopTime: 6000
	};

})($);
