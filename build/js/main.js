/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/js/modules/members-slider.js":
/*!*********************************************!*\
  !*** ./source/js/modules/members-slider.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./source/js/modules/slider.js");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var membersSlider = new _slider__WEBPACK_IMPORTED_MODULE_0__["default"]({
    'main': '.js-slider-members',
    'spaceBetween': 20,
    'mobileSpaceBetween': 0
  });
});

/***/ }),

/***/ "./source/js/modules/slider.js":
/*!*************************************!*\
  !*** ./source/js/modules/slider.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider; }
/* harmony export */ });
function Slider(options) {
  var _this = this;
  var privates = {};
  privates.options = options;
  privates.isOn = false;
  privates.main = document.querySelector(privates.options.main);
  privates.elements = {
    'wrap': privates.main.querySelector('.slider__wrap'),
    'slides': privates.main.querySelectorAll('.slider__slide'),
    'activeSlide': privates.main.querySelector('.slider__slide--active'),
    'prev': privates.main.querySelector('.slider__prev'),
    'next': privates.main.querySelector('.slider__next'),
    'current': privates.main.querySelector('.slider__current'),
    'total': privates.main.querySelector('.slider__total'),
    'pagination': privates.main.querySelector('.slider__pagination'),
    'pagination_items': []
  };
  privates.opt = {
    'position': 0,
    'max_position': privates.elements.slides.length,
    'currentTransform': 0,
    'isStart': true,
    'isEnd': false,
    'spaceBetween': 0,
    'mode': window.innerWidth > 1280 ? 'desktop' : 'mobile'
  };
  this.on_prev_click = function (event) {
    _this.prev_slide();
  };
  this.on_next_click = function (event) {
    _this.next_slide();
  };
  this.move_slide = function () {
    privates.elements.slides.forEach(function (slide) {
      slide.classList.remove('slider__slide--active');
    });
    privates.elements.slides[privates.opt.position].classList.add('slider__slide--active');
    if (privates.elements.pagination) {
      privates.elements.pagination_items.forEach(function (item) {
        item.classList.remove('slider__pagination-item--active');
      });
      privates.elements.pagination_items[privates.opt.position].classList.add('slider__pagination-item--active');
    }
  };
  this.check_start = function () {
    privates.opt.isStart = privates.opt.position === 0;
    privates.opt.isStart ? privates.main.classList.add('slider--start') : privates.main.classList.remove('slider--start');
  };
  this.check_end = function () {
    var trueWidth = 0;
    privates.elements.slides.forEach(function (slide) {
      trueWidth += slide.offsetWidth;
    });
    var movedWidth = privates.elements.wrap.offsetWidth + privates.opt.currentTransform;
    privates.opt.isEnd = movedWidth >= trueWidth;
    privates.opt.isEnd ? privates.main.classList.add('slider--end') : privates.main.classList.remove('slider--end');
  };
  this.make_pagination = function () {
    for (var i = 0; i < privates.opt.max_position; i++) {
      var item = document.createElement("div");
      item.classList.add('slider__pagination-item');
      privates.elements.pagination.appendChild(item);
    }
    privates.elements.pagination_items = privates.elements.pagination.querySelectorAll('.slider__pagination-item');
    privates.elements.pagination_items[0].classList.add('slider__pagination-item--active');
  };
  this.remove_pagination = function () {
    privates.elements.pagination_items = [];
    privates.elements.pagination.innerHTML = '';
  };
  this.prev_slide = function () {
    if (privates.opt.position != 0) {
      --privates.opt.position;
      privates.opt.currentTransform -= privates.elements.activeSlide.offsetWidth;
      privates.elements.wrap.style.transform = "translateX(-".concat(privates.opt.currentTransform, "px)");
      _this.getSpaceBetween();
      console.log('current spaceBetween', privates.opt.spaceBetween);
      privates.opt.currentTransform -= privates.opt.spaceBetween;
      if (privates.elements.current) {
        privates.elements.current.textContent = privates.opt.position + 1;
      }
      _this.move_slide();
      _this.check_end();
      _this.check_start();
    }
  };
  this.next_slide = function () {
    console.log('isEnd', privates.opt.isEnd);
    if (privates.opt.position < privates.opt.max_position - 1 && !privates.opt.isEnd) {
      ++privates.opt.position;
      privates.opt.currentTransform += privates.elements.activeSlide.offsetWidth;
      _this.getSpaceBetween();
      console.log('current spaceBetween', privates.opt.spaceBetween);
      privates.opt.currentTransform += privates.opt.spaceBetween;
      privates.elements.wrap.style.transform = "translateX(-".concat(privates.opt.currentTransform, "px)");
      if (privates.elements.current) {
        privates.elements.current.textContent = privates.opt.position + 1;
      }
      _this.move_slide();
      _this.check_end();
      _this.check_start();
    }
  };
  this.destroy = function () {
    privates.isOn = false;
    privates.elements.wrap.style.transform = null;
    privates.main.classList.remove('slider--active');
    if (privates.elements.prev !== null) {
      privates.elements.prev.removeEventListener('click', _this.on_prev_click);
    }
    if (privates.elements.next !== null) {
      privates.elements.next.removeEventListener('click', _this.on_next_click);
    }
    if (privates.elements.pagination) {
      _this.remove_pagination();
    }
  };
  this.init = function () {
    if (privates.options.mobile_only && window.innerWidth < 1280 || !privates.options.mobile_only) {
      console.log('initializing');
      privates.isOn = true;
      privates.opt.currentTransform = 0;
      privates.opt.position = 0;
      privates.elements.activeSlide = privates.elements.slides[0];
      privates.elements.slides[0].classList.add('slider__slide--active');
      _this.check_start();
      _this.check_end();
      privates.opt.mode = window.innerWidth >= 1280 ? 'desktop' : 'mobile';
      privates.main.classList.add('slider--active');
      if (privates.elements.total) {
        privates.elements.total.textContent = privates.opt.max_position;
      }
      if (privates.elements.current) {
        privates.elements.current.textContent = privates.opt.position + 1;
      }
      if (privates.elements.prev !== null) {
        privates.elements.prev.addEventListener('click', _this.on_prev_click);
      }
      if (privates.elements.next !== null) {
        privates.elements.next.addEventListener('click', _this.on_next_click);
      }
      if (privates.elements.pagination && privates.elements.pagination_items.length === 0) {
        _this.make_pagination();
      }
    }
  };
  this.getSpaceBetween = function () {
    if (window.innerWidth < 1280 && privates.options.mobileSpaceBetween) {
      privates.opt.spaceBetween = privates.options.mobileSpaceBetween;
    } else if (window.innerWidth >= 1280 && privates.options.spaceBetween) {
      privates.opt.spaceBetween = privates.options.spaceBetween;
    } else {
      privates.opt.spaceBetween = 0;
    }
  };
  if (privates.options.mobile_only) {
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1280 && privates.isOn) {
        _this.destroy();
      }
      if (window.innerWidth < 1280 && !privates.isOn) {
        _this.init();
      }
    });
  }
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1280 && privates.opt.mode !== 'desktop' || window.innerWidth < 1280 && privates.opt.mode !== 'mobile') {
      _this.destroy();
      _this.init();
    }
  });
  this.init();
}

/***/ }),

/***/ "./source/js/modules/stages-slider.js":
/*!********************************************!*\
  !*** ./source/js/modules/stages-slider.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./source/js/modules/slider.js");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var stagesSlider = new _slider__WEBPACK_IMPORTED_MODULE_0__["default"]({
    'main': '.js-slider',
    'mobile_only': true
  });
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!****************************!*\
  !*** ./source/js/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_stages_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/stages-slider */ "./source/js/modules/stages-slider.js");
/* harmony import */ var _modules_members_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/members-slider */ "./source/js/modules/members-slider.js");


(0,_modules_stages_slider__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_modules_members_slider__WEBPACK_IMPORTED_MODULE_1__["default"])();
}();
/******/ })()
;
//# sourceMappingURL=main.js.map