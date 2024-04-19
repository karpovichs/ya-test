/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/js/modules/slider.js":
/*!*************************************!*\
  !*** ./source/js/modules/slider.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
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
      'total': privates.main.querySelector('.slider__total')
    };
    privates.opt = {
      'position': 0,
      'max_position': privates.elements.slides.length,
      'currentTransform': 0,
      'isEnd': false
    };
    console.log(privates.elements);
    if (privates.elements.total) {
      privates.elements.total.textContent = privates.opt.max_position;
    }
    if (privates.elements.current) {
      privates.elements.current.textContent = privates.opt.position + 1;
    }
    if (privates.elements.prev !== null) {
      privates.elements.prev.addEventListener('click', function () {
        _this.prev_slide();
      });
    }
    if (privates.elements.next !== null) {
      privates.elements.next.addEventListener('click', function () {
        _this.next_slide();
      });
    }
    this.move_slide = function () {
      privates.elements.slides.forEach(function (slide) {
        slide.classList.remove('slider__slide--active');
      });
      privates.elements.slides[privates.opt.position].classList.add('slider__slide--active');
    };
    this.check_end = function () {
      var trueWidth = 0;
      privates.elements.slides.forEach(function (slide) {
        trueWidth += slide.offsetWidth;
        console.log(slide.offsetWidth);
      });
      var movedWidth = privates.elements.wrap.offsetWidth + privates.opt.currentTransform;

      // privates.opt.isEnd = movedWidth > trueWidth - privates.elements.slides[privates.opt.max_position - 1].offsetWidth
      privates.opt.isEnd = movedWidth > trueWidth;
    };
    this.prev_slide = function () {
      if (privates.opt.position != 0) {
        --privates.opt.position;
        privates.opt.currentTransform -= privates.elements.activeSlide.offsetWidth;
        privates.elements.wrap.style.transform = "translateX(-".concat(privates.opt.currentTransform, "px)");
        if (window.innerWidth >= 1024 && privates.options.spaceBetween) {
          privates.opt.currentTransform -= privates.options.spaceBetween;
        }
        if (privates.elements.current) {
          privates.elements.current.textContent = privates.opt.position + 1;
        }
        _this.move_slide();
        _this.check_end();
      }
    };
    this.next_slide = function () {
      console.log('isEnd', privates.opt.isEnd);
      if (privates.opt.position < privates.opt.max_position - 1 && !privates.opt.isEnd) {
        ++privates.opt.position;
        privates.opt.currentTransform += privates.elements.activeSlide.offsetWidth;
        if (window.innerWidth >= 1024 && privates.options.spaceBetween) {
          console.log(privates.options.spaceBetween);
          privates.opt.currentTransform += privates.options.spaceBetween;
        }
        privates.elements.wrap.style.transform = "translateX(-".concat(privates.opt.currentTransform, "px)");
        if (privates.elements.current) {
          privates.elements.current.textContent = privates.opt.position + 1;
        }
        _this.move_slide();
        _this.check_end();
        console.log('isEnd after move', privates.opt.isEnd);
      }
    };
    this.destroy = function () {
      privates.isOn = false;
      privates.elements.wrap.style.transform = null;
    };
    this.init = function () {
      privates.isOn = true;
      privates.elements.activeSlide = privates.elements.slides[0];
      privates.elements.slides[0].classList.add('slider__slide--active');
    };
    if (privates.options.mobile_only) {
      window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024 && privates.isOn) {
          _this.destroy();
        }
        if (window.innerWidth < 1024 && !privates.isOn) {
          _this.init();
        }
      });
    }
    this.init();
  }

  // const stagesSlider = new Slider({
  //     'main': '.js-slider',
  //     'mobile_only': true,
  // })

  var membersSlider = new Slider({
    'main': '.js-slider-members',
    'spaceBetween': 20
  });
});

/***/ }),

/***/ "./source/js/modules/test.js":
/*!***********************************!*\
  !*** ./source/js/modules/test.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
  console.log("hello");
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
/* harmony import */ var _modules_test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/test */ "./source/js/modules/test.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider */ "./source/js/modules/slider.js");


(0,_modules_test__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])();
}();
/******/ })()
;
//# sourceMappingURL=main.js.map