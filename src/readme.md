rhytonThree初始化化配置项

threejs要素：scene camera render

相机使用PerspectiveCamera(透视相机，符合人眼)
{
    el--画布容器,
    camera:{
        fov--相机的视锥体的垂直视野角,默认45,
        ratio--相机视锥体的长宽比,
        far--相机视锥体的近平面,
        near--相机视锥体的远平面
    },
    renderer:{
        size: 渲染器大小
    },
    initStat -- 是否开启stat
}