class Particle{
    constructor(scene)
    {
        var velocity = new THREE.Vector3();
        var acceleration = new THREE.Vector3();
        var mass = 1;
        var force = new THREE.Vector3();
        this.scene = scene;
    }
    update()
    {
        
    }
    display()
    {
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0x34495E  } );
        cube1 = new THREE.Mesh( geometry, material );
        cube1.position.set(0,2,0);
        scene.add(cube1);
    }
}