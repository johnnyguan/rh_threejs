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

var _node = __webpack_require__(4);

var _node2 = _interopRequireDefault(_node);

var _link = __webpack_require__(5);

var _link2 = _interopRequireDefault(_link);

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

            this.initScene();
            this.initCamera();
            this.initRenderer();
            this.initRaycaster();
            this.initEvent();
            this.nodes = [];
            this.links = [];
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
                this.camera = new THREE.PerspectiveCamera(45, document.querySelector(this.el).clientWidth / document.querySelector(this.el).clientHeight, 0.1, 1000);
            } else {
                var fov = this.cameraCfg.fov ? this.cameraCfg.fov : 45,
                    ratio = this.cameraCfg.ratio ? this.cameraCfg.ratio : document.querySelector(this.el).clientWidth / document.querySelector(this.el).clientHeight,
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
        key: 'initRenderer',
        value: function initRenderer() {
            var webGLRenderer = new THREE.WebGLRenderer();
            webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
            webGLRenderer.setSize(document.querySelector(this.el).clientWidth, document.querySelector(this.el).clientHeight);
            webGLRenderer.shadowMapEnabled = true;
            this.renderer = webGLRenderer;
            document.querySelector(this.el).appendChild(webGLRenderer.domElement);
        }
        //初始化raycaster

    }, {
        key: 'initRaycaster',
        value: function initRaycaster() {
            this.raycaster = new THREE.Raycaster();
        }
    }, {
        key: 'addNode',
        value: function addNode(nodeInfo) {
            var node = new _node2.default(nodeInfo).group;
            this.scene.add(node);
            this.nodes.push(node);
        }
    }, {
        key: 'removeNode',
        value: function removeNode(node) {
            this.scene.remove(node);
            var index = this.nodes.indexOf(node);
            this.nodes.splice(index, 1);
        }
    }, {
        key: 'removeAllNodes',
        value: function removeAllNodes() {
            var _this = this;

            var childeren = this.scene.children.filter(function (v, i) {
                return v.type === 'Group';
            });
            children.forEach(function (v, i) {
                _this.scene.remove(v);
            });
        }
    }, {
        key: 'addLink',
        value: function addLink(linkInfo) {
            var link = new _link2.default(linkInfo).link;
            this.scene.add(link);
            this.links.push(link);
        }
    }, {
        key: 'removeLink',
        value: function removeLink(link) {
            this.scene.remove(link);
            var index = this.links.indexOf(link);
            this.links.splice(index, 1);
        }
    }, {
        key: 'removeAllLinks',
        value: function removeAllLinks() {
            var _this2 = this;

            var childeren = this.scene.children.filter(function (v, i) {
                return v.type === 'link';
            });
            children.forEach(function (v, i) {
                _this2.scene.remove(v);
            });
        }
    }, {
        key: 'initEvent',
        value: function initEvent() {
            this.mouse = new THREE.Vector2();
            this.width = document.querySelector(this.el).clientWidth;
            this.height = document.querySelector(this.el).clientHeight;
            this.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
            this.renderer.domElement.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
            // this.renderer.domElement.addEventListener('mouseup',this.onDocumentMouseUp.bind(this),false);
        }
    }, {
        key: 'onDocumentMouseMove',
        value: function onDocumentMouseMove(e) {
            e.preventDefault();
            var raycaster = this.raycaster,
                mouse = this.mouse,
                width = this.width,
                height = this.height,
                selected = this.selected;
            mouse.x = e.clientX / width * 2 - 1;
            mouse.y = -(e.clientY / height) * 2 + 1;

            /* raycaster.setFromCamera(mouse,this.camera);
            if(selected){
                if(raycaster.ray.intersectPlane(plane,intersection)){
                    SELECTED.position.copy(intersection.sub(offset));
                }
                updateRelateLine();
                return
            }
                  var intersects = raycaster.intersectObjects(sphereObjects);
            if(intersects.length>0){
                if(INTERSECTED != intersects[0].object){
                    if(INTERSECTED){
                        INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                    }
                    INTERSECTED = intersects[0].object;
                    INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                    INTERSECTED.material.color.setHex('0x0000ff');
                    plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal),INTERSECTED.position);
                }
                container.style.cursor = 'pointer';
                $('#nodetip').css({left:event.clientX+10,top:event.clientY+10}).text("类型："+INTERSECTED.nodeType+"值："+INTERSECTED.value).show();
            }else {
                if(INTERSECTED){
                    INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                }
                INTERSECTED = null;
                container.style.cursor = 'auto';
                $('#nodetip').hide();
            } */
        }
    }, {
        key: 'onDocumentMouseDown',
        value: function onDocumentMouseDown(e) {
            var raycaster = this.raycaster,
                nodes = this.nodes;
            e.preventDefault();
            raycaster.setFromCamera(this.mouse, this.camera);
            var intersects = raycaster.intersectObjects(nodes);
            if (intersects.length > 0) {
                this.selected = intersects[0].object;
                /* if(raycaster.ray.intersectPlane(plane,intersection)){
                    offset.copy(intersection).sub(SELECTED.position);
                } */
                container.style.cursor = 'move';
            }
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
    function Node(nodeInfo) {
        _classCallCheck(this, Node);

        var texturePart = this.genTexturePart(nodeInfo.img),
            spherePart = this.genSpherePart(nodeInfo.color),
            group = this.genGroup(texturePart, spherePart);
        this.group = group;
        this.group['_type'] = 'node';
        this.bindProperty(nodeInfo.prop);
        this.locateNode(nodeInfo.pos);
    }

    _createClass(Node, [{
        key: 'genGroup',
        value: function genGroup(texturePart, spherePart) {
            var group = new THREE.Group();
            group.add(texturePart);
            group.add(spherePart);
            return group;
        }
    }, {
        key: 'genTexturePart',
        value: function genTexturePart(img) {
            var texture = THREE.ImageUtils.loadTexture(img),
                mat = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                depthTest: false
            }),
                geometry = new THREE.SphereGeometry(5, 32, 32, 0, Math.PI * 0.6, 0.2 * Math.PI, 0.5 * Math.PI),
                texturePart = new THREE.Mesh(geometry, mat);
            return texturePart;
        }
    }, {
        key: 'genSpherePart',
        value: function genSpherePart(color) {
            var ball = new THREE.SphereGeometry(5, 32, 32),
                material = new THREE.MeshBasicMaterial({ color: color }),
                spherePart = new THREE.Mesh(ball, material);
            return spherePart;
        }
    }, {
        key: 'bindProperty',
        value: function bindProperty(prop) {
            this.group['_prop'] = prop;
        }
    }, {
        key: 'locateNode',
        value: function locateNode(pos) {
            this.group.position.x = pos.x;
            this.group.position.y = pos.y;
            this.group.position.z = pos.z;
        }
    }]);

    return Node;
}();

exports.default = Node;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Link = function () {
    function Link(linkInfo) {
        _classCallCheck(this, Link);

        var lineMat = this.genMat(linkInfo.color, linkInfo.opacity, linkInfo.lineWidth),
            arrow = this.genArrow(linkInfo.direction, linkInfo.color),
            link = this.genLine(linkInfo.source, linkInfo.end, lineMat, arrow);
        this.link = link;
        this.link['_type'] = 'link';
    }

    _createClass(Link, [{
        key: 'genLine',
        value: function genLine(source, end, material, arrow) {
            var geometry = new THREE.Geometry();
            var vertex1 = new THREE.Vector3(source.x, source.y, source.z);
            var vertex2 = new THREE.Vector3(end.x, end.y, end.z);
            geometry.vertices.push(vertex1);
            geometry.vertices.push(vertex2);

            var line = new THREE.Line(geometry, material);
            var group = new THREE.Group();
            group.add(line);
            if (arrow) {
                arrow.position.x = source.x - (source.x - end.x) * 2 / 4;
                arrow.position.y = source.y - (source.y - end.y) * 2 / 4;
                arrow.position.z = source.z - (source.z - end.z) * 2 / 4;
                group.add(arrow);
            }
            return group;
        }
    }, {
        key: 'genMat',
        value: function genMat(color, opacity, lineWidth) {
            return new THREE.LineBasicMaterial({ color: color, opacity: opacity, lineWidth: lineWidth });
        }
    }, {
        key: 'genArrow',
        value: function genArrow(direction, color) {
            var arrGeo;
            switch (direction) {
                case 'positive':
                    arrGeo = new THREE.CylinderGeometry(0, 0.5, 2);
                    break;
                case 'negative':
                    arrGeo = new THREE.CylinderGeometry(0.5, 0, 2);
                    break;
                case 'both':
                    return null;
            }
            var material = new THREE.MeshBasicMaterial({ color: color });
            return new THREE.Mesh(arrGeo, material);
        }
    }]);

    return Link;
}();

exports.default = Link;

/***/ })
/******/ ]);
//# sourceMappingURL=rhyton_three.js.map