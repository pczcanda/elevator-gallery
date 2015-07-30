window.SOCIALLEAGUE = (function(module, $) {
	"use strict";

	if (!window.console) {
		window.console = {
			log: function() {},
			info: function() {},
			debug: function() {}
		}
	}

	if (typeof module.config === 'undefined') {
		module.config = {};
	}

	module.functional = (function(module, $) {
		var submodule = {};

		//this represents at what point (in %) of the screen the scroller is
		submodule.screenTopPercentage = function(element) {
			return Math.round($(window).scrollTop() * 100 / ($(window).height() - $(element).height()));
		};

		submodule.smoothScroll = function(whereTo, speed, scrolling) {
			speed = speed ? speed : 1200;
			scrolling = scrolling ? scrolling : 'html,body';

			$(scrolling).stop().animate({
				scrollTop: whereTo
			}, speed, function() {
				$(scrolling).clearQueue();
			});
		};

		submodule.GenericMatchHeights = function(tileType, mainContainer) {
			var allTiles = $(tileType, mainContainer).removeAttr('style'),
				tilesArray = [];

			allTiles.each(function() {
				tilesArray.push($(this).innerHeight());
			});

			allTiles.height(Math.max.apply(Math, tilesArray));

		};

		$(document).ready(function() {});

		return submodule;
	}(module, $));

	module.main = (function(module, $) {
		var submodule = {};

		submodule.generic = function() {
			$('.scroller').on('click', function(e) {
				e.preventDefault();
				var scrollPosition = $(this).offset().top + 100;
				module.functional.smoothScroll(scrollPosition);

			});
		};

		submodule.slider = function() {
			$('.slider-container').slider({
				slide_speed: 300,
				showNav: true,
				showDots: false,
				easing: 'swing',
				autoLoop: false,
				autoLoopTime: 6000
			});

			// var equaliseContent = function() {
			// 	if (window.helpers.getScreenView().match(/mobile|480|690/g)) {
			// 		module.functional.GenericMatchHeights('.item-content', '.slider-container');
			// 	$('.slider-container').equalHeights({target: element, onResize: windowResize});
			// 	} else {
			// 		$('.slider-container .item-content').removeAttr('style');
			// 	}
			// };
			//
			// equaliseContent();
			// $(window).smartresize(function() {
			// 	equaliseContent();
			// });

		};

		submodule.elevator = function() {
			var adjustElevator = function(){
				var header = $('header').innerHeight();

				var elevatorEl = $('.elevator-gallery');
				var elevatorHeight = elevatorEl.innerHeight();
				var elevatorVPosition = elevatorEl.position().top - header;

				var elevatorContent = elevatorEl.find('.elevator-gallery__content');
				var elevatorContentHeight = elevatorContent.innerHeight();

				var scrollVPosition = $(window).scrollTop();

				var endOfElevator = elevatorVPosition + elevatorHeight;

				if(helpers.getScreenView().match(/mobile|480|690|768/g)){

						elevatorContent.removeAttr('style');
						elevatorContent.removeClass('elevator-gallery__content--showcasing');
				}
				else{
					if(scrollVPosition >= elevatorVPosition && scrollVPosition < (endOfElevator - elevatorContentHeight)){
						elevatorContent.css({
							'top' : header
						})
						elevatorContent.addClass('elevator-gallery__content--showcasing');
					}
					else if (scrollVPosition < elevatorVPosition ){
						elevatorContent.removeAttr('style');
						elevatorContent.removeClass('elevator-gallery__content--showcasing');
					}
					else if(scrollVPosition >= (endOfElevator - elevatorContentHeight)){
						elevatorContent.css({
							'top' : elevatorHeight - elevatorContentHeight
						})
						elevatorContent.removeClass('elevator-gallery__content--showcasing');
					}
				}




			};

			$(window).on('scroll', function(){

				adjustElevator();

			})
			.smartresize(function(){
				adjustElevator();
			});

		};

		submodule.init = function() {
			submodule.generic();
			submodule.slider();
			submodule.elevator();
		};

		$(document).ready(function() {
			submodule.init();
		});

		return submodule;
	}(module, $));

	return module;

}(window.SOCIALLEAGUE || {}, window.jQuery));
