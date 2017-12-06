import is from '../utils/is.js'
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
            if (!is.object(cfg.renderer)) {
                console.log('未设置渲染器大小');
                return
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
    initScene() {
        this.scene = new THREE.Scene();
    }
    //初始化相机
    initCamera() {
        if (!is.object(this.cameraCfg)) {
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
    initRender() {
        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        webGLRenderer.setSize(this.rendererCfg.width, this.rendererCfg.height);
        webGLRenderer.shadowMapEnabled = true;
        this.renderer = webGLRenderer;
        document.querySelector(this.el).appendChild(webGLRenderer.domElement);
    }
    //渲染
    render(){
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
}

export default RhytonThree