import is from '../utils/is.js'
import Node from './node.js'
import Link from './link.js'
class RhytonThree {
    constructor(cfg) {
        if (is.object(cfg)) {
            if (!cfg.el) {
                console.log('未设置画布容器');
                return
            }
            this.el = cfg.el;
            if (is.object(cfg.camera)) {
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
    initScene() {
        this.scene = new THREE.Scene();
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.set(0,0,100);
        this.scene.add( directionalLight );
        var ambiColor = "#0c0c0c";
        var ambientLight = new THREE.AmbientLight(ambiColor);//设置颜色
        this.scene.add(ambientLight);
        // this.scene.background = new THREE.Color( 0xf0fff0 );
    }
    //初始化相机
    initCamera() {
        if (!is.object(this.cameraCfg)) {
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
    initRenderer() {
        var webGLRenderer = new THREE.WebGLRenderer({ antialias: true });
        // webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        webGLRenderer.setSize(document.querySelector(this.el).clientWidth, document.querySelector(this.el).clientHeight);
        webGLRenderer.shadowMapEnabled = true;
        webGLRenderer.sortObjects = false;
        this.renderer = webGLRenderer;
        document.querySelector(this.el).appendChild(webGLRenderer.domElement);
    }
    //初始化raycaster
    initRaycaster() {
        this.raycaster = new THREE.Raycaster();
    }
    initFloorPanel() {
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.01, transparent: true, wireframe: true }));
        plane.visible = true;
        this.plane = plane;
        this.scene.add(plane);
    }
    addNode(nodeInfo) {
        var node = new Node(nodeInfo).group;
        this.scene.add(node);
        this.nodes.push(node);
    }
    removeNode(node) {
        this.scene.remove(node);
        var index = this.nodes.indexOf(node);
        this.nodes.splice(index, 1);
    }
    removeAllNodes() {
        var childeren = this.scene.children.filter((v, i) => {
            return v.type === 'Group';
        });
        children.forEach((v, i) => {
            this.scene.remove(v)
        })
    }
    addLink(linkInfo) {
        var link = new Link(linkInfo).link;
        this.scene.add(link);
        this.links.push(link);
    }
    removeLink(link) {
        this.scene.remove(link);
        var index = this.links.indexOf(link);
        this.links.splice(index, 1);
    }
    removeAllLinks() {
        var childeren = this.scene.children.filter((v, i) => {
            return v.type === 'link';
        });
        children.forEach((v, i) => {
            this.scene.remove(v)
        })
    }
    initEvent() {
        this.mouse = new THREE.Vector2();
        this.width = document.querySelector(this.el).clientWidth;
        this.height = document.querySelector(this.el).clientHeight;
        this.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        this.renderer.domElement.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
        this.renderer.domElement.addEventListener('mouseup', this.onDocumentMouseUp.bind(this), false);
    }
    onDocumentMouseMove(e) {
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
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

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
    onDocumentMouseDown(e) {
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
    onDocumentMouseUp(e) {
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
    _convertTo3DCoordinate(clientX, clientY) {
        var mv = new THREE.Vector3(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1,
            0.5);
        mv.unproject(this.camera);
        return mv;
    }
    _worldToPage(x, y, z) {
        var b = new THREE.Vector3(x, y, z).project(this.camera)
        var halfWidth = window.innerWidth / 2;
        var halfHeight = window.innerHeight / 2;

        var result = {

            x: Math.round(b.x * halfWidth + halfWidth),
            y: Math.round(-b.y * halfHeight + halfHeight)

        };
        return result;
    }
    updateLinks() {
        var links = this.links,
            selected = this.selected,
            pos = this.selected.position,
            nid = this.selected.nid,
            relLinks,
            arrGeo;
        relLinks = links.filter((v, i) => {
            return (v.sourceId == nid || v.endId == nid)
        })
        relLinks.forEach((v, i) => {
            if (v.sourceId == nid) {
                v.children[0].geometry.vertices[0] = new THREE.Vector3(selected.position.x, selected.position.y, selected.position.z);
                v.source = {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z
                }
            } else {
                v.children[0].geometry.vertices[1] = new THREE.Vector3(selected.position.x, selected.position.y, selected.position.z);
                v.end = {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z
                }
            }
            v.children[0].geometry.verticesNeedUpdate = true;
            var source = v.source,
                end = v.end;
            switch (v['_direction']) {
                case 'positive':
                    arrGeo = new THREE.CylinderGeometry(0, 0.5, 2);
                    var color = new THREE.Color(v.children[0].material.color.r, v.children[0].material.color.g, v.children[0].material.color.b);
                    var material = new THREE.MeshBasicMaterial({ color });
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
                    var material = new THREE.MeshBasicMaterial({ color });
                    v.children[1] = new THREE.Mesh(arrGeo, material);
                    break;
            }

        })
    }
}

export default RhytonThree