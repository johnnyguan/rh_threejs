class Link{
    constructor(linkInfo){
        var lineMat = this.genMat(linkInfo.color,linkInfo.opacity,linkInfo.lineWidth),
            arrow = this.genArrow(linkInfo.direction,linkInfo.color),
            link = this.genLine(linkInfo.source,linkInfo.end,lineMat,arrow);
        this.link = link;
        this.link['_type']='link';
        this.link['_direction'] = linkInfo.direction;
        this.link.source = linkInfo.source;
        this.link.end = linkInfo.end;
    }
    genLine(source,end,material,arrow){
        var geometry = new THREE.Geometry();
        var vertex1 = new THREE.Vector3(source.x,source.y,source.z);
        var vertex2 = new THREE.Vector3(end.x,end.y,end.z);
        geometry.vertices.push(vertex1);
        geometry.vertices.push(vertex2);

        var line = new THREE.Line(geometry,material);
        var group = new THREE.Group();
        group.add(line);
        if(arrow){
            arrow.position.x = source.x-(source.x-end.x)*2/4;
            arrow.position.y = source.y-(source.y-end.y)*2/4;
            arrow.position.z = source.z-(source.z-end.z)*2/4;
            var theta = new THREE.Vector3(-(source.x-end.x),-(source.y-end.y),0).angleTo(new THREE.Vector3(0,1,0));
            if(end.x>source.x){
                arrow.rotateZ(-theta);
            }else {
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
    genMat(color,opacity,lineWidth){
        return new THREE.LineBasicMaterial({color,opacity,lineWidth});
    }
    genArrow(direction,color){
        var arrGeo;
        switch (direction) {
            case 'positive': 
                arrGeo = new THREE.CylinderGeometry(0,0.5,2);
                break;
            case 'negative': 
                arrGeo = new THREE.CylinderGeometry(0.5,0,2);
                break;
            case 'both':
                return null
        }
        var material = new THREE.MeshBasicMaterial( {color} );
        return new THREE.Mesh( arrGeo, material );
    }
}
export default Link