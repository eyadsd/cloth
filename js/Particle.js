class Particle{
    constructor(scene)
    {
        this.mass = 1;
        this.scene = scene;
        this.acceleration = new THREE.Vector3();
        this.force = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.position = new THREE.Vector3();
    }
    update(delta)
    {
        this.velocity.add(this.acceleration.clone().multiplyScalar(delta));
        this.position = this.position.clone().add(this.velocity.clone().multiplyScalar(delta));
        this.acceleration.multiplyScalar(0);
        
    }
    display()
    {
        
        
    }

    addForce(newForce)
    {
        this.acceleration.add(newForce.multiplyScalar(1/this.mass));
        
    }
    get position(){
        return this._position;
    }
    set position(newPosition){
        this._position = newPosition;
    }
    get velocity(){
        return this._velocity;
    }
    set velocity(newVelocity){
        this._velocity = newVelocity;
    }
  
}