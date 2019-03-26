class Cloth{
    constructor(scene){
        this.height = 30;
        this.width = 30;
        this.particle = new Array(this.height);
		this.K = 150;
        for (let i = 0; i < this.height; i++) {
            this.particle[i] = new Array(this.width)
            for (let j = 0; j < this.width; j++)
            {
                this.particle[i][j] = new Particle(scene);
                this.particle[i][j].position = new THREE.Vector3(j/10,3,i/10-2);
            }


        }
		
        var geometry = new THREE.Geometry();

		
        for (let i = 0; i<this.height; i++)
        {
            for (let j = 0; j < this.width; j++)
            {
                geometry.vertices.push(this.particle[i][j].position)

            }
        }
		for (let i = 0;i<this.height-1;i++)
		{
			for (let j = 0;j<this.width-1;j++)
			{
					geometry.faces.push( new THREE.Face3( i*this.width + j, (i*this.width + j)+1, (i+1)*this.width  +j));
					geometry.faces.push( new THREE.Face3( i*this.width + j, (i+1)*this.width  +j, (i*this.width + j)+1));

					geometry.faces.push( new THREE.Face3( (i+1)*this.width + j+1, (i*this.width + j)+1, (i+1)*this.width  +j));
					geometry.faces.push( new THREE.Face3( (i+1)*this.width + j+1, (i+1)*this.width  +j, (i*this.width + j)+1));


			}
		}		

		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		material.wireframe = true;

        this.mesh = new THREE.Mesh(geometry,material)
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
						// if((i == 8 && j==this.width-2)) {
                            // continue;
                        // }
						
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
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-2][j],0.1,this.K/3));

						}
						if(j>1)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j-2],0.1,this.K/3));

						}
						
						if(i<this.height-3)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+2][j],0.1,this.K/3));

						}
						if(j<this.width-3)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j+2],0.1,this.K/3));

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
						this.mesh.geometry.elementsNeedUpdate = true;
						//this.mesh.geometry.normalsNeedUpdate = true

                    }
                }
            }


    }

}