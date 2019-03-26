class Cloth{
    constructor(scene){
        this.height = 30;
        this.width = 30;
        this.particle = new Array(this.height);
		this.K = 120;
        for (let i = 0; i < this.height; i++) {
            this.particle[i] = new Array(this.width)
            for (let j = 0; j < this.width; j++)
            {
                this.particle[i][j] = new Particle(scene);
                this.particle[i][j].position = new THREE.Vector3(j/10,3,i/10-2);
            }


        }
        var geometry = new THREE.Geometry();
        var material = new THREE.PointsMaterial( { color: 0xffff00 , size : 0.1} );

        for (let i = 0; i<this.height; i++)
        {
            for (let j = 0; j < this.width; j++)
            {
                geometry.vertices.push(this.particle[i][j].position)

            }
        }



        this.mesh = new THREE.Points(geometry,material)

        scene.add(this.mesh)
    }
    update(delta){

            /*for (let index = 0; index < 99; index++) {
                if(index % 10 == 0)
                {
                    continue;
                }
                particle[index].addForce(Forces.Fspring(particle[index],particle[index + 1],0.25,10));
                particle[index].addForce(particle[index].velocity.clone().normalize().multiplyScalar(-0.5));
                particle[index].addForce(Forces.gravity())
                console.log(particle[index])


            }
            for (let index = 1; index < 99; index++) {
                if(index % 10 == 0 )
                {
                    continue;
                }
                particle[index].addForce(Forces.Fspring(particle[index],particle[index - 1],0.25,10));
                particle[index].addForce(particle[index].velocity.clone().normalize().multiplyScalar(-0.5));
                particle[index].addForce(Forces.gravity())
                console.log(particle[index])


            }*/

            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++)
                    {

                        if((i == 0 && j==0)) {
                            continue;
                        }
                        if((i == 0 && j==this.width-2)) {
                            continue;
                        }
						if(i>0 && j>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-1][j-1],0.1,this.K));

						}
						if(i>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-1][j],0.1,this.K));

						}
						if(j>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j-1],0.1,this.K));

						}
						if(i<this.height-2&&j<this.width-2)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+1][j+1],0.1,this.K));

						}
						if(i<this.height-2)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+1][j],0.1,this.K));

						}
						if(j<this.width-2)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j+1],0.1,this.K));

						}
						if(j<this.width-2&&i>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-1][j+1],0.1,this.K));

						}
						if(i<this.height-2&&j>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+1][j-1],0.1,this.K));
						}
						
						if(i>1)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-2][j],0.1,this.K/2));

						}
						if(j>1)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j-2],0.1,this.K/2));

						}
						
						if(i<this.height-3)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+2][j],0.1,this.K/2));

						}
						if(j<this.width-3)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j+2],0.1,this.K/2));

						}

                      

                        this.particle[i][j].addForce(Forces.gravity(this.mass))


                        this.particle[i][j].addForce(this.particle[i][j].velocity.clone().normalize().multiplyScalar(-0.7));

                    }

                }
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    {

                        this.particle[i][j].update(delta);
                        this.mesh.geometry.vertices[i * this.width + j] = this.particle[i][j].position;
                        this.mesh.geometry.verticesNeedUpdate = true;
                    }
                }
            }


    }

}