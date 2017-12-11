class Link{
    constructor(linkInfo){
        var lineMat = this.genMat(linkInfo.color,linkInfo.opacity,linkInfo.lineWidth),
            arrow = this.genArrow(linkInfo.direction,linkInfo.color,
                new THREE.Vector3(-linkInfo.source.x+linkInfo.end.x,-linkInfo.source.y+linkInfo.end.y,-linkInfo.source.z+linkInfo.end.z),
                new THREE.Vector3(linkInfo.source.x-(linkInfo.source.x-linkInfo.end.x)*2/4,linkInfo.source.y-(linkInfo.source.y-linkInfo.end.y)*2/4,linkInfo.source.z-(linkInfo.source.z-linkInfo.end.z)*2/4),
            ),
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
            console.log(arrow);
            group.add(arrow);
        }
        
        group.sourceId = source.nid;
        group.endId = end.nid;
        return group;
    }
    genMat(color,opacity,lineWidth){
        return new THREE.LineBasicMaterial({color,opacity,lineWidth});
    }
    genArrow(direction,color,vector,origin){
        switch (direction) {
            case 'positive': 
                /* arrGeo = new THREE.CylinderGeometry(0,0.5,2);
                break; */
            case 'negative': 
                // arrGeo = new THREE.CylinderGeometry(0.5,0,2);
                
                //normalize the direction vector (convert to vector of length 1)
                vector.normalize();
                
                
                
                var arrowHelper = new THREE.ArrowHelper( vector, origin, 3, color,3,2 );
                break;
            case 'both':
                return null
        }
        return arrowHelper;
    }
}
export default Link