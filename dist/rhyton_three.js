/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rhytonThree = __webpack_require__(1);

var _rhytonThree2 = _interopRequireDefault(_rhytonThree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.RhytonThree = _rhytonThree2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is = __webpack_require__(2);

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RhytonThree = function () {
    function RhytonThree(cfg) {
        _classCallCheck(this, RhytonThree);

        if (_is2.default.object(cfg)) {
            if (!cfg.el) {
                console.log('未设置画布容器');
                return;
            }
            this.el = cfg.el;
            if (_is2.default.object(cfg.camera)) {
                this.cameraCfg = cfg.camera;
            }
            if (!_is2.default.object(cfg.renderer)) {
                console.log('未设置渲染器大小');
                return;
            } else {
                this.rendererCfg = cfg.renderer;
            }

            this.initScene();
            this.initCamera();
            this.initRender();
            this.render();
        } else {
            console.log('没有配置项');
        }
    }
    //初始化场景


    _createClass(RhytonThree, [{
        key: 'initScene',
        value: function initScene() {
            this.scene = new THREE.Scene();
        }
        //初始化相机

    }, {
        key: 'initCamera',
        value: function initCamera() {
            if (!_is2.default.object(this.cameraCfg)) {
                this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            } else {
                var fov = this.cameraCfg.fov ? this.cameraCfg.fov : 45,
                    ratio = this.cameraCfg.ratio ? this.cameraCfg.ratio : window.innerWidth / window.innerHeight,
                    near = this.cameraCfg.near ? this.cameraCfg.near : 0.1,
                    far = this.cameraCfg.far ? this.cameraCfg.far : 1000;
                this.camera = new THREE.PerspectiveCamera(fov, ratio, near, far);
            }
            this.camera.position.x = -30;
            this.camera.position.y = 40;
            this.camera.position.z = 50;
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        }
        //初始化渲染器

    }, {
        key: 'initRender',
        value: function initRender() {
            var webGLRenderer = new THREE.WebGLRenderer();
            webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
            webGLRenderer.setSize(this.rendererCfg.width, this.rendererCfg.height);
            webGLRenderer.shadowMapEnabled = true;
            this.renderer = webGLRenderer;
            document.querySelector(this.el).appendChild(webGLRenderer.domElement);
        }
        //渲染

    }, {
        key: 'render',
        value: function render() {
            requestAnimationFrame(this.render);
            this.renderer.render(this.scene, this.camera);
        }
    }]);

    return RhytonThree;
}();

exports.default = RhytonThree;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*global HTMLElement DocumentTouch */

var _window = __webpack_require__(3);

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navigator = _window2.default ? _window2.default.navigator : null;
var document = _window2.default ? _window2.default.document : null;

var typeofstr = _typeof('');
var typeofobj = _typeof({});
var typeoffn = _typeof(function () {});
var typeofhtmlele = typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement);

var instanceStr = function instanceStr(obj) {
  return obj && obj.instanceString && is.fn(obj.instanceString) ? obj.instanceString() : null;
};

var is = {
  defined: function defined(obj) {
    return obj != null; // not undefined or null
  },

  string: function string(obj) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == typeofstr;
  },

  fn: function fn(obj) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === typeoffn;
  },

  array: function array(obj) {
    return Array.isArray ? Array.isArray(obj) : obj != null && obj instanceof Array;
  },

  plainObject: function plainObject(obj) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === typeofobj && !is.array(obj) && obj.constructor === Object;
  },

  object: function object(obj) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === typeofobj;
  },

  number: function number(obj) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === _typeof(1) && !isNaN(obj);
  },

  integer: function integer(obj) {
    return is.number(obj) && Math.floor(obj) === obj;
  },

  bool: function bool(obj) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === _typeof(true);
  },

  htmlElement: function htmlElement(obj) {
    if ('undefined' === typeofhtmlele) {
      return undefined;
    } else {
      return null != obj && obj instanceof HTMLElement;
    }
  },

  elementOrCollection: function elementOrCollection(obj) {
    return is.element(obj) || is.collection(obj);
  },

  element: function element(obj) {
    return instanceStr(obj) === 'collection' && obj._private.single;
  },

  collection: function collection(obj) {
    return instanceStr(obj) === 'collection' && !obj._private.single;
  },

  core: function core(obj) {
    return instanceStr(obj) === 'core';
  },

  style: function style(obj) {
    return instanceStr(obj) === 'style';
  },

  stylesheet: function stylesheet(obj) {
    return instanceStr(obj) === 'stylesheet';
  },

  event: function event(obj) {
    return instanceStr(obj) === 'event';
  },

  thread: function thread(obj) {
    return instanceStr(obj) === 'thread';
  },

  fabric: function fabric(obj) {
    return instanceStr(obj) === 'fabric';
  },

  emptyString: function emptyString(obj) {
    if (obj === undefined || obj === null) {
      // null is empty
      return true;
    } else if (obj === '' || obj.match(/^\s+$/)) {
      return true; // empty string is empty
    }

    return false; // otherwise, we don't know what we've got
  },

  nonemptyString: function nonemptyString(obj) {
    if (obj && is.string(obj) && obj !== '' && !obj.match(/^\s+$/)) {
      return true;
    }

    return false;
  },

  domElement: function domElement(obj) {
    if (typeof HTMLElement === 'undefined') {
      return false; // we're not in a browser so it doesn't matter
    } else {
      return obj instanceof HTMLElement;
    }
  },

  boundingBox: function boundingBox(obj) {
    return is.plainObject(obj) && is.number(obj.x1) && is.number(obj.x2) && is.number(obj.y1) && is.number(obj.y2);
  },

  promise: function promise(obj) {
    return is.object(obj) && is.fn(obj.then);
  },

  touch: function touch() {
    return _window2.default && ('ontouchstart' in _window2.default || _window2.default.DocumentTouch && document instanceof DocumentTouch);
  },

  gecko: function gecko() {
    return _window2.default && (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style);
  },

  webkit: function webkit() {
    return _window2.default && (typeof webkitURL !== 'undefined' || 'WebkitAppearance' in document.documentElement.style);
  },

  chromium: function chromium() {
    return _window2.default && typeof chrome !== 'undefined';
  },

  khtml: function khtml() {
    return navigator && navigator.vendor.match(/kde/i); // probably a better way to detect this...
  },

  khtmlEtc: function khtmlEtc() {
    return is.khtml() || is.webkit() || is.chromium();
  },

  ms: function ms() {
    return navigator && navigator.userAgent.match(/msie|trident|edge/i); // probably a better way to detect this...
  },

  windows: function windows() {
    return navigator && navigator.appVersion.match(/Win/i);
  },

  mac: function mac() {
    return navigator && navigator.appVersion.match(/Mac/i);
  },

  linux: function linux() {
    return navigator && navigator.appVersion.match(/Linux/i);
  },

  unix: function unix() {
    return navigator && navigator.appVersion.match(/X11/i);
  }
};

exports.default = is;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeof window === 'undefined' ? null : window; // eslint-disable-line no-undef

/***/ })
/******/ ]);
//# sourceMappingURL=rhyton_three.js.map