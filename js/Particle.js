class Particle{
    constructor(scene)
    {
        //this.model = new THREE.Mesh();
        //this.velocity = new THREE.Vector3();
        this.acceleration = new THREE.Vector3();
        this.mass = 1;
        this.force = new THREE.Vector3();
        this.scene = scene;
        this.velocity = new THREE.Vector3();
    }
    update(delta)
    {
        this.velocity.add(this.acceleration.clone().multiplyScalar(delta))
        this.model.position.copy(this.model.position.clone().add(this.velocity.clone().multiplyScalar(delta)));
        this.acceleration.multiplyScalar(0);
        
    }
    display()
    {
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0x34495E  } );
        this.model = new THREE.Mesh( geometry, material );
        this.model.position.set(0,2,0);
        scene.add(this.model);
    }

    addForce(newForce)
    {
        this.acceleration.add(newForce.multiplyScalar(1/this.mass));
        
    }
    get position(){
        return this.model.position;
    }
    set position(newPosition){
        this.model.position.copy(newPosition);
    }
    get velocity(){
        return this._velocity;
    }
    set velocity(newVelocity){
        this._velocity = newVelocity;
    }
  
}