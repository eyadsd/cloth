class Particle{
    constructor(scene)
    {
        this.mass = 0.05;
        this.scene = scene;
        this.acceleration = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.position = new THREE.Vector3();
        this.previousPosition = this.position.clone();
        this.fixed = false
    }
    update(timestep)
    {
        if(!this.fixed)
        {
            this.previousPosition = this.position.clone()
            this.velocity.add(this.acceleration.clone().multiplyScalar(timestep));
            this.position.add(this.velocity.clone().multiplyScalar(timestep));
            this.acceleration.multiplyScalar(0);
          
       }
		
        
    }

    clone(){
        let newObject = new Particle(this.scene)
        newObject.velocity = this.velocity.clone()
        newObject.position = this.position.clone()
        newObject.fixed = this.fixed 
        return newObject
    }

    addForce(newForce)
    {
        this.acceleration.add(newForce.clone().multiplyScalar(1/this.mass));
        
    }
	addGravity()
	{
		this.acceleration.add(Forces.gravity())
	}
    get position(){
        return this._position;
    }
    set position(position){
        this._position = position;
    }
    get previousPosition(){
        return this._previousPosition;
    }
    set previousPosition(previousPosition){
        this._previousPosition = previousPosition;
    }
    addPosition(vector)
    {
        if(!this.fixed)
        {
            this.position.add(vector)
        }
    }
    get velocity(){
        return this._velocity;
    }
    set velocity(velocity){
        this._velocity = velocity;
    }
    get acceleration(){
        return this._acceleration;
    }
    set acceleration(acceleration){
        this._acceleration = acceleration;
    }
	get mass()
	{
	return this._mass
	}
	set mass(mass){
		this._mass = mass
    }
    set fixed(fixed){
        this._fixed = fixed
    }
    get fixed(){
        return this._fixed
    }
}