class Sheet extends Cloth{

constructor(position){
    super(position)
    this.init()
}

init(){

    for (let i = 0; i < this.height; i++) {
        this.particle[i] = new Array(this.width)
        for (let j = 0; j < this.width; j++)
        {
            this.particle[i][j] = new Particle(scene);
            this.particle[i][j].position = new THREE.Vector3(j*this.xRest-this.xRest*(this.width/2),1,i*this.xRest).add(this.position);
            
        }


    }
    this.diagonalDistance = this.particle[0][0].position.distanceTo(this.particle[1][1].position) 

    this.addSprings()
    this.particle[0][0].fixed = true
    this.particle[0][this.width-1].fixed = true
    this.diff = 0
    this.maxv = 0
}
}