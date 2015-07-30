KEYCODE_ESC = 27;
KEYCODE_ENTER = 13;

$.fn.refresh = function() {
	return $(this.selector);
};

window.helpers = (function(helpers, $) {
	"use strict";

	var helpers = {};

	helpers.jsPath = '/assets/js/';

	/*--- Check what view we are in - small, medium, large ---*/
	// Use a common element which changes between window sizes
	// e.g. main nav - hidden on small screens. try and avoid using device widths if possible
	helpers.getScreenView = function() {
		var indicator;
		if ($('.size-indicator').length == 0) {
			indicator = $('<div class="size-indicator"></div>').appendTo('body')
		} else {
			indicator = $('.size-indicator');
		}
		var screen,
			indicatorWidth = $('.size-indicator').width();

		switch (indicatorWidth) {
			case 3:
				screen = "480-up";
				break;
			case 4:
				screen = "690-up";
				break;
			case 5:
				screen = "768-up";
				break;
			case 6:
				screen = "1000-up";
				break;
			case 7:
				screen = "1224-up";
				break;
			case 8:
				screen = "1366-up";
				break;
			case 9:
				screen = "1440-up";
				break;
			case 10:
				screen = "1600-up";
				break;
			default:
				screen = "mobile"
		}

		return screen;

	};

	/*--- Check the orientation of device ---*/
	helpers.getOrientatioscreen = function() {
		var deviceOrientatioscreen = window.orientation;
		if (typeof deviceOrientatioscreen === "undefined")
			deviceOrientatioscreen = 'orientation not supported';

		return deviceOrientation;
	}

	/*--- Check if device supports touch event ---*/
	helpers.isTouchDevice = (function() {
		return !!('ontouchstart' in window) || !!window.navigator.msMaxTouchPoints;
	})();

	// Gets a hash string parameter.
	// e.g. mysite.com/some-page/#foo=bar
	helpers.getParameter = function(url, paramName) {
		var searchString = url.split("?");

		if (searchString.length < 2) {
			return null;
		}

		var i, val, params = searchString[1].split("&");

		for (i = 0; i < params.length; i++) {
			val = params[i].split("=");
			if (val[0] == paramName) {
				return unescape(val[1]);
			}
		}
		return null;
	};

	helpers.supportsSVG = (function() {
		return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
	})();

	helpers.supportsTransform = (function() {
		if ($('.lt-ie9').length != 0) {
			return false;
		}

		var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
			el = document.createElement('div'),
			support = 0;

		while (support !== true) {
			support = document.createElement('div').style[prefixes[support++]] != undefined || support;
		}

		return support;
	})();

	// device detect object
	helpers.deviceDetect = {
		userAgent: window.navigator.userAgent.toLowerCase(),
		isIOS: function() {
			return /iphone|ipod|ipad/.test(this.userAgent);
		},
		isIETouch: function() {
			return /msie/.test(this.userAgent) && /touch/.test(this.userAgent);
		},
		isHandHeld: function() {
			return /iphone|ipod|ipad|android|blackberry|iemobile/.test(this.userAgent);
		},
		isDesktop: function() {
			return !this.isHandHeld();
		},
		isIE7: function() {
			return $('html').hasClass('ie7');
		},
		isIE10mobile: function() {
			return /iemobile\/10\.0/.test(this.userAgent);
		},
		isTouchDevice: function() {
			return !!('ontouchstart' in window) || !!window.navigator.msMaxTouchPoints;
		},
		addClassesToHtml: function() {
			if (this.isIOS()) {
				document.getElementsByTagName("html")[0].className += " is-ios-device";
			}
			if (this.isIETouch()) {
				document.getElementsByTagName("html")[0].className += " is-ietouch-device";
			}
			if (this.isHandHeld()) {
				document.getElementsByTagName("html")[0].className += " is-handheld-device";
			}
			if (this.isDesktop()) {
				document.getElementsByTagName("html")[0].className += " is-desktop-device";
			}
			if (this.isIE10mobile()) {
				document.getElementsByTagName("html")[0].className += " is-ie10-mobile";
			}
			if (this.isTouchDevice()) {
				document.getElementsByTagName("html")[0].className += " supports-touch";
			} else {
				document.getElementsByTagName("html")[0].className += " not-supports-touch";
			}
		}
	};

	$(document).ready(function() {
		if (helpers.isTouchDevice) {
			document.getElementsByTagName("html")[0].className += " supports-touch";
		}
		if (helpers.supportsSVG) {
			document.getElementsByTagName("html")[0].className += " supports-svg";
		}
		if (helpers.supportsTransform) {
			document.getElementsByTagName("html")[0].className += " supports-transform";
		}
	});

	return helpers;

})(window.helpers || {}, window.jQuery);
