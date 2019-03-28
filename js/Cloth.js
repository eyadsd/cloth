class Cloth{
    constructor(scene){
        this.height = 50;
        this.width = 50;
        this.particle = new Array(this.height);
		this.xRest = 0.1;
		this.K = 40;
		this.deformationRate = this.xRest*2;
        for (let i = 0; i < this.height; i++) {
            this.particle[i] = new Array(this.width)
            for (let j = 0; j < this.width; j++)
            {
                this.particle[i][j] = new Particle(scene);
                this.particle[i][j].position = new THREE.Vector3(j/10-1,1,i/10-5);
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
    update(){

            

            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++)
                    {

                        // if((i == 0 && j==0)) {
                            // continue;
                        // }
						if((i == 0 )) {
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
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-1][j-1],this.xRest,this.K));

						}
						if(i>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-1][j],this.xRest,this.K));

						}
						if(j>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j-1],this.xRest,this.K));

						}
						if(i<this.height-2&&j<this.width-2)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+1][j+1],this.xRest,this.K));

						}
						if(i<this.height-2)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+1][j],this.xRest,this.K));

						}
						if(j<this.width-2)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j+1],this.xRest,this.K));

						}
						if(j<this.width-2&&i>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-1][j+1],this.xRest,this.K));

						}
						if(i<this.height-2&&j>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+1][j-1],this.xRest,this.K));
						}
						
						if(i>1)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-2][j],this.xRest,this.K/3));

						}
						if(j>1)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j-2],this.xRest,this.K/3));

						}
						
						if(i<this.height-3)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+2][j],this.xRest,this.K/3));

						}
						if(j<this.width-3)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j+2],this.xRest,this.K/3));

						}

                      

                        this.particle[i][j].addGravity()


                        this.particle[i][j].addForce(this.particle[i][j].velocity.clone().normalize().multiplyScalar(-0.2));

                    }

                }
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    {

                        this.particle[i][j].update();
                        this.mesh.geometry.vertices[i * this.width + j] = this.particle[i][j].position;
						
                        this.mesh.geometry.verticesNeedUpdate = true;
						this.mesh.geometry.elementsNeedUpdate = true;
						//this.mesh.geometry.normalsNeedUpdate = true

                    }
                }
            }


    }

}