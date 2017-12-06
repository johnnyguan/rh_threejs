var container,camera,scene,renderer,controls,sphereObjects=[],lines=[];
var plane = new HTMLHRElement.Plane(),raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),offset = new THREE.Vector3(),intersection = new THREE.Vector3(),INTERSECTED,SELECTED;
var maxX = 0,minX=0,maxY=0,minY=0,maxZ=0,minZ=0;

init3dScene();
function init3dScene(){
    container = document.getElementById('oas-content');
    initRender();
    init3dScene();
    initCamera();
    initWheelCotroller();
    initFloorPanel();
    drawData();

    window.addEventListener('resize',onWindowResize,false);

    renderer.domElement.addEventListener('mousemove',onDocumentMouseMove,false);
    renderer.domElement.addEventListener('mousedown',onDocumentMouseDown,false);
    renderer.domElement.addEventListener('mouseup',onDocumentMouseUp,false);

    animate();
}

function onDocumentMouseMove(event){
    event.preventDefault();
    mouse.x = (event.clientX/window.innerWidth)*2-1;
    mouse.y = -(event.clientY/window.innerHeight)*2+1;

    raycaster.setFromCamera(mouse,camera);
    if(SELECTED){
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
    }
}
function onDocumentMouseDown(event){
    event.preventDefault();
    raycaster.setFromCamera(mouse,camera);
    var intersects = raycaster.intersectObjects(sphereObjects);
    if(intersects.length>0){
        controls.enabled = false;
        SELECTED = intersects[0].object;
        if(raycaster.ray.intersectPlane(plane,intersection)){
            offset.copy(intersection).sub(SELECTED.position);
        }
        container.style.cursor = 'move';
    }
    $('#nodetip').hide();
}
function onDocumentMouseUp(event){
    event.preventDefault();
    controls.enabled = true;
    if(INTERSECTED){
        SELECTED = null;
    }
    container.style.cursor = 'auto';
}

function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}
function createGeometry(snode,enode){
    var geometry = new THREE.Geometry();
    var vertex1 = new THREE.Vector3();
    vertex1.copy(snode.position);

    var vertex2 = new THREE.Vector3();
    vertex2.copy(enode.position); 
    
    geometry.vertices.push(vertex1);
    geometry.vertices.push(vertex2);
    
    return geometry;
}

function initWheelCotroller(){
    contorls = new THREE.TrackballControls(camera);
    controls.minDistance = 1;
    controls.maxDistance = 200000;
    controls.ratateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    contorls.dynamicDampingFactor = 0.3;
}

function drawData(){
    var nodes = data..nodes;
    var links = data.links;

    var sphereRadius = 30;
    if(nodes.length>1000){
        sphereRadius = 5;
    }else if(nodes.length>500){
        sphereRadius = 10
    }else if(nodes.length > 200){
        sphereRadius = 20;
    }

    var _geometry = new THREE.SphereGeometry(sphereRadius,10,10);
    for(var i = 0;i<nodes.length;i++){
        var color = nodes[i].color;
        color = parseInt(color,16);

        var _material = new THREE.MeshBasicMaterial({color:color,overdraw:0.5});
        var particle = new THREE.Mesh(_geometry,_material);
        particle.position.set(nodes[i].x,nodes[i].y,nodes[i].z);
        particle.value = nodes[i].uniquId;
        particle.nodeType = nodes[i].type;
        particle.color = color;

        scene.add(particle);
    }
    for(var i = 0;i<links.length;i++){
        var sourceNode = sphereObjects.filter(function(_node){
            return _node.unipuId ==links[i].sourceId;
        })[0];
        var targetNode = sphereObjects.filter(function(_node){
            return _node.unipuId ==links[i].targetId;
        })[0];

        var material = new THREE.LineBasicMaterial({color:sourceNode.color,opacity:0.5,linewidth:1});
        var geometry = createGeometry(sourceNode,targetNode);
        var line = new THREE.Line(geometry,material);

        line.sourceId = links[i].sourceId;
        line.targetId = links[i].targetId;
        line.weight = links[i].weight;
        scene.add(line);
        lines.push(line);
    }
}

function updateRelateLine(){
    var realteLines = lines.filter(function(line){
        return SELECTED.uniquId == line.souceId || SELECTED.uniquId == line.targetId;
    })

    for(var i in realteLines){
        var line = realiteLines[i];
        if(SELECTED.unipuId == LINE.souceId){
            var sourceObj = sphereObjects.filter(function(_node){
                return _node.unipuId == line.souceId;
            })[0]

            line.geometry.vertices[0] = sourceObj.position;
            line.geometry.verticesNeedUpdate = true;

        }else if(SELECTED.unipuId == line.targetId){
            var targetObj = sphereObjects.filter(function(_node){
                return _node.unipuId == line.targetId;
            })[0]

            line.geometry.vertices[0] = targetObj.position;
            line.geometry.verticesNeedUpdate = true;
        }
    }
}