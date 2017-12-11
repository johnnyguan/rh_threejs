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
            this.initFloorPanel();
            this.nodes = [];
            this.links = [];
            this.offset = new THREE.Vector3();
            this.controls = new THREE.TrackballControls(this.camera);
            //旋转速度
            this.controls.rotateSpeed = 1.0;
            //变焦速度
            this.controls.zoomSpeed = 1.2;
            //平移速度
            this.controls.panSpeed = 0.8;
            //是否不变焦
            this.controls.noZoom = false;
            //是否不平移
            this.controls.noPan = false;
            //可能是惯性 true没有惯性
            this.controls.staticMoving = false;
            //动态阻尼系数 就是灵敏度
            this.controls.dynamicDampingFactor = 0.3;
            var axes = new THREE.AxisHelper(100);
            this.scene.add(axes);
        } else {
            console.log('没有配置项');
        }
    }
    //初始化场景


    _createClass(RhytonThree, [{
        key: 'initScene',
        value: function initScene() {
            this.scene = new THREE.Scene();
            var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(0, 0, 100);
            this.scene.add(directionalLight);
            var ambiColor = "#0c0c0c";
            var ambientLight = new THREE.AmbientLight(ambiColor); //设置颜色
            this.scene.add(ambientLight);
            // this.scene.background = new THREE.Color( 0xf0fff0 );
        }
        //初始化相机

    }, {
        key: 'initCamera',
        value: function initCamera() {
            if (!_is2.default.object(this.cameraCfg)) {
                this.camera = new THREE.PerspectiveCamera(70, document.querySelector(this.el).clientWidth / document.querySelector(this.el).clientHeight, 1, 10000);
            } else {
                var fov = this.cameraCfg.fov ? this.cameraCfg.fov : 70,
                    ratio = this.cameraCfg.ratio ? this.cameraCfg.ratio : document.querySelector(this.el).clientWidth / document.querySelector(this.el).clientHeight,
                    near = this.cameraCfg.near ? this.cameraCfg.near : 1,
                    far = this.cameraCfg.far ? this.cameraCfg.far : 10000;
                this.camera = new THREE.PerspectiveCamera(fov, ratio, near, far);
            }
            this.camera.position.z = 100;
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        }
        //初始化渲染器

    }, {
        key: 'initRenderer',
        value: function initRenderer() {
            var webGLRenderer = new THREE.WebGLRenderer({ antialias: true });
            // webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
            webGLRenderer.setSize(document.querySelector(this.el).clientWidth, document.querySelector(this.el).clientHeight);
            webGLRenderer.shadowMapEnabled = true;
            webGLRenderer.sortObjects = false;
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
        key: 'initFloorPanel',
        value: function initFloorPanel() {
            var plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 8, 8), new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.01, transparent: true, wireframe: true }));
            plane.visible = true;
            this.plane = plane;
            this.scene.add(plane);
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
            this.renderer.domElement.addEventListener('mouseup', this.onDocumentMouseUp.bind(this), false);
        }
    }, {
        key: 'onDocumentMouseMove',
        value: function onDocumentMouseMove(e) {
            //阻止本来的默认事件，比如浏览器的默认右键事件是弹出浏览器的选项
            e.preventDefault();

            //mouse.x是指 鼠标的x到屏幕y轴的距离与屏幕宽的一半的比值 绝对值不超过1
            //mouse.y是指 鼠标的y到屏幕x轴的距离与屏幕宽的一半的比值 绝对值不超过1
            //
            //下面的矩形是显示器屏幕，三维空间坐标系的布局以及屏幕的二维坐标系
            //
            // 鼠标是从  二维坐标系
            // 这个点 .-------------------------------------------|-->鼠标x正半轴
            //  开始算|                   个 y     /              |
            //   x,y  |                    |     /                |
            //        |                    |   /                  |
            //        |          三维坐标系| /                    |
            //        | -------------------/-------------------->x|
            //        |                  / |                      |
            //        |                /   |                      |
            //        |              /     |                      |
            //        |__________Z_匕______|______________________|
            //        |
            // 鼠标y  \/
            // 正半轴
            var mouse = this.mouse,
                camera = this.camera,
                plane = this.plane,
                offset = this.offset;
            mouse.x = e.clientX / window.innerWidth * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            //新建一个三维变换半单位向量 假设z方向就是0.5,这样我左右移的时候，还会有前后移的效果
            var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);

            //屏幕和场景转换工具根据照相机，把这个向量从屏幕转化为场景中的向量
            // projector.unprojectVector( vector, camera );
            vector.unproject(camera);
            //vector.sub( camera.position ).normalize()变换过后的向量vector减去相机的位置向量后标准化
            //新建一条从相机的位置到vector向量的一道光线
            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            //是否有东西被选中
            if (this.selected) {
                //有的话取到这条光线射到的物体所在水平面上所有相交元素的集合,所以这样就可以限制每次拖动距离不能超出水平面panel
                var intersects = raycaster.intersectObject(plane);
                //这个鼠标点中的点的位置减去偏移向量，新位置赋值给选中物体
                if (intersects.length > 0) {
                    this.selected.position.copy(intersects[0].point.sub(offset));
                }
                this.updateLinks();
                return;
            }

            //否则的话，光线和所有物体相交，返回相交的物体
            var intersects = raycaster.intersectObjects(this.nodes, true);
            //如果有物体相交了
            if (intersects.length > 0 && intersects[0].object.parent['_type'] === 'node') {
                //并且相交物体不是上一个相交物体
                if (this.intersected != intersects[0].object.parent) {
                    //将这个对象放到INTERSECTED中
                    this.intersected = intersects[0].object.parent;
                    //改变水平面的位置
                    plane.position.copy(this.intersected.position);
                    //并把水平面指向到相机的方向
                    plane.lookAt(camera.position);
                }
                //改变鼠标的样式
                document.querySelector(this.el).style.cursor = 'pointer';
            } else {
                //改变鼠标的样式
                document.querySelector(this.el).style.cursor = 'auto';
            }
        }
    }, {
        key: 'onDocumentMouseDown',
        value: function onDocumentMouseDown(e) {
            //阻止本来的默认事件，比如浏览器的默认右键事件是弹出浏览器的选项
            e.preventDefault();
            var mouse = this.mouse,
                camera = this.camera,
                plane = this.plane,
                offset = this.offset;
            var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
            // projector.unprojectVector( vector, camera );
            vector.unproject(camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            var intersects = raycaster.intersectObjects(this.nodes, true);

            if (intersects.length > 0 && intersects[0].object.parent['_type'] === 'node') {
                //不能改变视角了
                this.controls.enabled = false;
                //把选中的对象放到全局变量SELECTED中
                this.selected = intersects[0].object.parent;
                //再和水平面相交
                var intersects = raycaster.intersectObject(plane);

                //选中位置和水平面位置（物体中心）的偏移量
                offset.copy(intersects[0].point).sub(plane.position);
                //改变鼠标的样式
                document.querySelector(this.el).style.cursor = 'move';
            }
        }
    }, {
        key: 'onDocumentMouseUp',
        value: function onDocumentMouseUp(e) {
            e.preventDefault();
            //又能改变视角了
            this.controls.enabled = true;
            //如果有相交物体
            if (this.intersected) {
                //把位置给水平面
                this.plane.position.copy(this.intersected.position);
                //选中物体置空
                this.selected = null;
            }
            //改变鼠标的样式
            document.querySelector(this.el).style.cursor = 'auto';
        }
    }, {
        key: '_convertTo3DCoordinate',
        value: function _convertTo3DCoordinate(clientX, clientY) {
            var mv = new THREE.Vector3(clientX / window.innerWidth * 2 - 1, -(clientY / window.innerHeight) * 2 + 1, 0.5);
            mv.unproject(this.camera);
            return mv;
        }
    }, {
        key: '_worldToPage',
        value: function _worldToPage(x, y, z) {
            var b = new THREE.Vector3(x, y, z).project(this.camera);
            var halfWidth = window.innerWidth / 2;
            var halfHeight = window.innerHeight / 2;

            var result = {

                x: Math.round(b.x * halfWidth + halfWidth),
                y: Math.round(-b.y * halfHeight + halfHeight)

            };
            return result;
        }
    }, {
        key: 'updateLinks',
        value: function updateLinks() {
            var links = this.links,
                selected = this.selected,
                pos = this.selected.position,
                nid = this.selected.nid,
                relLinks,
                arrGeo;
            relLinks = links.filter(function (v, i) {
                return v.sourceId == nid || v.endId == nid;
            });
            relLinks.forEach(function (v, i) {
                if (v.sourceId == nid) {
                    v.children[0].geometry.vertices[0] = new THREE.Vector3(selected.position.x, selected.position.y, selected.position.z);
                    v.source = {
                        x: pos.x,
                        y: pos.y,
                        z: pos.z
                    };
                } else {
                    v.children[0].geometry.vertices[1] = new THREE.Vector3(selected.position.x, selected.position.y, selected.position.z);
                    v.end = {
                        x: pos.x,
                        y: pos.y,
                        z: pos.z
                    };
                }
                v.children[0].geometry.verticesNeedUpdate = true;
                var source = v.source,
                    end = v.end;
                switch (v['_direction']) {
                    case 'positive':
                        arrGeo = new THREE.CylinderGeometry(0, 0.5, 2);
                        var color = new THREE.Color(v.children[0].material.color.r, v.children[0].material.color.g, v.children[0].material.color.b);
                        var material = new THREE.MeshBasicMaterial({ color: color });
                        v.remove(v.children[1]);
                        var arrow = new THREE.Mesh(arrGeo, material);
                        arrow.position.x = source.x - (source.x - end.x) * 2 / 4;
                        arrow.position.y = source.y - (source.y - end.y) * 2 / 4;
                        arrow.position.z = source.z - (source.z - end.z) * 2 / 4;

                        var theta = new THREE.Vector3(-(source.x - end.x), -(source.y - end.y), 0).angleTo(new THREE.Vector3(0, 1, 0));
                        if (end.x > source.x) {
                            arrow.rotateZ(-theta);
                        } else {
                            arrow.rotateZ(theta);
                        }

                        /* var beta = new THREE.Vector3(0,-(source.y-end.y),-(source.z-end.z)).angleTo(new THREE.Vector3(0,1,0));
                        if(end.y>source.y){
                            arrow.rotateX(-beta);
                        }else {
                            arrow.rotateX(beta);
                        } */

                        v.add(arrow);

                        break;
                    case 'negative':
                        arrGeo = new THREE.CylinderGeometry(0.5, 0, 2);
                        var color = new THREE.Color(v.children[0].material.color.r, v.children[0].material.color.g, v.children[0].material.color.b);
                        var material = new THREE.MeshBasicMaterial({ color: color });
                        v.children[1] = new THREE.Mesh(arrGeo, material);
                        break;
                }
            });
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
        this.group.nid = nodeInfo.nid;
        this.bindProperty(nodeInfo.prop);
        this.locateNode(nodeInfo.pos);
    }

    _createClass(Node, [{
        key: 'genGroup',
        value: function genGroup(texturePart, spherePart) {
            var group = new THREE.Object3D();
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
                geometry = new THREE.SphereGeometry(5, 32, 32, Math.PI * 0.15, Math.PI * 0.55, 0.2 * Math.PI, 0.5 * Math.PI),
                texturePart = new THREE.Mesh(geometry, mat);
            return texturePart;
        }
    }, {
        key: 'genSpherePart',
        value: function genSpherePart(color) {
            var ball = new THREE.SphereGeometry(5, 32, 32),
                material = new THREE.MeshPhongMaterial({ color: color, emissive: color, specular: color }),
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
        this.link['_direction'] = linkInfo.direction;
        this.link.source = linkInfo.source;
        this.link.end = linkInfo.end;
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
                var theta = new THREE.Vector3(-(source.x - end.x), -(source.y - end.y), 0).angleTo(new THREE.Vector3(0, 1, 0));
                if (end.x > source.x) {
                    arrow.rotateZ(-theta);
                } else {
                    arrow.rotateZ(theta);
                }

                // var beta = new THREE.Vector3(0,-(source.y-end.y),-(source.z-end.z)).angleTo(new THREE.Vector3(0,1,0));
                // arrow.rotateX(-beta);
                // arrow.lookAt(new THREE.Vector3(-source.x+end.x,-(source.y-end.y),-(source.z-end.z)))
                group.add(arrow);
            }
            group.sourceId = source.nid;
            group.endId = end.nid;
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