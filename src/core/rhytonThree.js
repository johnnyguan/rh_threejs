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
            this.nodes = [];
            this.links = [];
        } else {
            console.log('没有配置项');
        }
    }
    //初始化场景
    initScene() {
        this.scene = new THREE.Scene();
    }
    //初始化相机
    initCamera() {
        if (!is.object(this.cameraCfg)) {
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
    initRenderer() {
        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        webGLRenderer.setSize(document.querySelector(this.el).clientWidth, document.querySelector(this.el).clientHeight);
        webGLRenderer.shadowMapEnabled = true;
        this.renderer = webGLRenderer;
        document.querySelector(this.el).appendChild(webGLRenderer.domElement);
    }
    //初始化raycaster
    initRaycaster(){
        this.raycaster = new THREE.Raycaster();
    }
    addNode(nodeInfo){
        var node = new Node(nodeInfo).group;
        this.scene.add(node);
        this.nodes.push(node);
    }
    removeNode(node){
        this.scene.remove(node);
        var index = this.nodes.indexOf(node);
        this.nodes.splice(index,1);
    }
    removeAllNodes(){
        var childeren = this.scene.children.filter((v,i)=>{
            return v.type === 'Group';
        });
        children.forEach((v,i)=>{
            this.scene.remove(v)
        })
    }
    addLink(linkInfo){
        var link = new Link(linkInfo).link;
        this.scene.add(link);
        this.links.push(link);
    }
    removeLink(link){
        this.scene.remove(link);
        var index = this.links.indexOf(link);
        this.links.splice(index,1);
    }
    removeAllLinks(){
        var childeren = this.scene.children.filter((v,i)=>{
            return v.type === 'link';
        });
        children.forEach((v,i)=>{
            this.scene.remove(v)
        })
    }
    initEvent(){
        this.mouse = new THREE.Vector2();
        this.width = document.querySelector(this.el).clientWidth;
        this.height = document.querySelector(this.el).clientHeight;
        this.renderer.domElement.addEventListener('mousemove',this.onDocumentMouseMove.bind(this),false);
        this.renderer.domElement.addEventListener('mousedown',this.onDocumentMouseDown.bind(this),false);
        // this.renderer.domElement.addEventListener('mouseup',this.onDocumentMouseUp.bind(this),false);
    }
    onDocumentMouseMove(e){
        e.preventDefault();
        var raycaster = this.raycaster,
            mouse = this.mouse,
            width = this.width,
            height = this.height,
            selected = this.selected;
        mouse.x = (e.clientX/width)*2-1;
        mouse.y = -(e.clientY/height)*2+1;
    
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
    onDocumentMouseDown(e){
        var raycaster = this.raycaster,
            nodes = this.nodes;
        e.preventDefault();
        raycaster.setFromCamera(this.mouse,this.camera);
        var intersects = raycaster.intersectObjects(nodes);
        if(intersects.length>0){
            this.selected = intersects[0].object;
            /* if(raycaster.ray.intersectPlane(plane,intersection)){
                offset.copy(intersection).sub(SELECTED.position);
            } */
            container.style.cursor = 'move';
        }
    }
}

export default RhytonThree