class Node{
    constructor(nodeInfo){
        var texturePart = this.genTexturePart(nodeInfo.img),
            spherePart = this.genSpherePart(nodeInfo.color),
            group = this.genGroup(texturePart,spherePart);
        this.group = group;
        this.group['_type']='node';
        this.bindProperty(nodeInfo.prop);
        this.locateNode(nodeInfo.pos);
    }
    genGroup(texturePart,spherePart){
        var group = new THREE.Group();
        group.add( texturePart );
        group.add( spherePart );
        return group;
    }
    genTexturePart(img){
        var texture = THREE.ImageUtils.loadTexture(img),
            mat = new THREE.MeshBasicMaterial( {
                map: texture,
                transparent: true,
                depthTest: false
            } ),
            geometry = new THREE.SphereGeometry( 5, 32, 32,0,Math.PI*0.6,0.2*Math.PI, 0.5*Math.PI),
            texturePart = new THREE.Mesh( geometry, mat );
        return texturePart;
    }
    genSpherePart(color){
        var ball = new THREE.SphereGeometry( 5, 32, 32),
            material = new THREE.MeshBasicMaterial( {color} ),
            spherePart = new THREE.Mesh(ball, material);
        return spherePart;
    }
    bindProperty(prop){
        this.group['_prop']=prop;
    }
    locateNode(pos){
        this.group.position.x = pos.x;
        this.group.position.y = pos.y;
        this.group.position.z = pos.z;
    }
}
export default Node