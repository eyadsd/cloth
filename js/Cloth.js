class Cloth{
    constructor(scene,position){
        this.height = 25;
        this.width = 25;
        this.particle = new Array(this.height);
		this.xRest = 0.1;
		this.K = 50;
		this.time = 0;
		this.deformationRate = this.xRest*2;
        for (let i = 0; i < this.height; i++) {
            this.particle[i] = new Array(this.width)
            for (let j = 0; j < this.width; j++)
            {
                this.particle[i][j] = new Particle(scene);
                this.particle[i][j].position = new THREE.Vector3(j*this.xRest-this.xRest*(this.width/2),1,i*this.xRest).add(position);
            }


        }
		this.diagonalDistance = this.particle[0][0].position.distanceTo(this.particle[1][1].position) 

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
					geometry.faces.push( new THREE.Face3( (i+1)*this.width + j+1, (i+1)*this.width  +j, (i*this.width + j)+1));


			}
		}
		geometry.computeBoundingBox();

		var max = geometry.boundingBox.max, min = geometry.boundingBox.min;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.z);
		var range = new THREE.Vector2(max.x - min.x, max.z - min.z);
		var faces = geometry.faces;
		
		geometry.faceVertexUvs[0] = [];
		
		for (var i = 0; i < faces.length ; i++) {
		
			var v1 = geometry.vertices[faces[i].a], 
				v2 = geometry.vertices[faces[i].b], 
				v3 = geometry.vertices[faces[i].c];
		
			geometry.faceVertexUvs[0].push([
				new THREE.Vector2((v1.x + offset.x)/range.x ,(v1.z + offset.y)/range.y),
				new THREE.Vector2((v2.x + offset.x)/range.x ,(v2.z + offset.y)/range.y),
				new THREE.Vector2((v3.x + offset.x)/range.x ,(v3.z + offset.y)/range.y)
			]);
		}
		geometry.uvsNeedUpdate = true;
		this.texture = new THREE.TextureLoader().load( "textures/cloth_texture_3.jpg" );
		//this.texture.anisotropy = 16
		//texture.mapping = THREE.ClampToEdgeWrapping;
		 var material = new THREE.MeshLambertMaterial({map:this.texture, 
		 side:THREE.DoubleSide });
		 
		 //only color
		 // var material = new THREE.MeshBasicMaterial({color:0x00ffff, 
		 // side:THREE.DoubleSide });
		
		//material.wireframe = true;
		this.mesh = new THREE.Mesh(geometry,material)
		
		scene.add(this.mesh)
		
					
					
			
		
    }
    update(){
			
		
			
		this.calculateForces()
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    {

                        this.particle[i][j].update();
                        this.mesh.geometry.vertices[i * this.width + j] = this.particle[i][j].position;
                        

                    }
                }
			}
			
			
			this.mesh.geometry.computeFaceNormals();
			this.mesh.geometry.computeVertexNormals();

			this.mesh.geometry.verticesNeedUpdate = true;
			this.mesh.geometry.elementsNeedUpdate = true;
			this.mesh.geometry.normalsNeedUpdate = true
			
			
			for (let i =0; i < this.height; i++)
				{
                for (let j = 0; j <this.width; j++)
                    {
						let limit = this.xRest+this.xRest/10;
						
						// if(i<this.height-1)
						// {
							 // if(i+1==this.height-1 && j==0)
							 // {continue}
						
							// let point1 = this.particle[i][j].position
							// let point2 = this.particle[i+1][j].position
							// let distance = point1.distanceTo(point2)
							// if(distance>limit){
								// this.particle[i+1][j].position = this.adjust(point1,point2,limit)
							// }
							
						// }
						// if(j<this.width-1)
						// {
							
							// let point1 = this.particle[i][j].position
							// let point2 = this.particle[i][j+1].position
							// let distance = point1.distanceTo(point2)
							// if(distance>limit){
								// this.particle[i][j+1].position = this.adjust(point1,point2,limit)
							// }
							
						// }
						// if(i>0)
						// {
							// let point1 = this.particle[i][j].position
							// let point2 = this.particle[i-1][j].position
							// let distance = point1.distanceTo(point2)
							// if(distance>limit){
								// this.particle[i-1][j].position = this.adjust(point1,point2,limit)
							// }
							
						// }
						// if(j>0)
						// {
							// let point1 = this.particle[i][j].position
							// let point2 = this.particle[i][j-1].position
							// let distance = point1.distanceTo(point2)
							// if(distance>limit){
								// this.particle[i][j-1].position = this.adjust(point1,point2,limit)
							// }
							
						// }
						
						
                    }

				}
			
    }
	
	adjust(point1,point2,limit)
	{
		let distanceVector = point2.clone().sub(point1).normalize()
		distanceVector.setLength(limit)
		let newPosition = point1.clone().add(distanceVector)
		return newPosition
	}
	
	
	calculateForces()
	{
		let xOff = 0; 
            for (let i = 0; i < this.height; i++) {
				
				let yOff = 0;
                for (let j = 0; j < this.width; j++)
                    {
						
                        // if(i == 0 && j==0) {
                            // continue;
                        // }
					  
                        // if((j == 0 && i==this.height-1)) {
                           // continue;
                        // }
					  
						 if( j==0) {
         					continue;
                        }
						
						//shear springs
						if(i>0 && j>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-1][j-1],this.diagonalDistance,this.K));

						}
						if(i<this.height-1&&j<this.width-1)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+1][j+1],this.diagonalDistance,this.K));

						}
						if(j<this.width-1&&i>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-1][j+1],this.diagonalDistance,this.K));

						}
						if(i<this.height-1&&j>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+1][j-1],this.diagonalDistance,this.K));
						}
						
						
						//structural springs
						if(i>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-1][j],this.xRest,this.K));

						}
						if(j>0)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j-1],this.xRest,this.K));

						}
						
						if(i<this.height-1)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+1][j],this.xRest,this.K));

						}
						if(j<this.width-1)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j+1],this.xRest,this.K));

						}
						
						
						
						// bending springs
						if(i>1)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i-2][j],this.xRest*2,this.K/3));

						}
						if(j>1)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j-2],this.xRest*2,this.K/3));

						}
						
						if(i<this.height-2)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i+2][j],this.xRest*2,this.K/3));

						}
						if(j<this.width-2)
						{
							this.particle[i][j].addForce(Forces.Fspring(this.particle[i][j],this.particle[i][j+2],this.xRest*2,this.K/3));

						}

                      
						// drag force	
                        this.particle[i][j].addForce(Forces.gravity(this.particle[i][j].mass))

						//drag force	
                        this.particle[i][j].addForce(this.particle[i][j].velocity.clone().normalize().multiplyScalar(-0.05));
						
						if(wind == true)
						{
							// the simplex3 function outputs a value between -1 1 
							let xWind = noise.simplex3(xOff, yOff, this.time);
							let zWind = noise.simplex3(xOff+1000,yOff+2000,this.time);
							//mapping the value of simplex3 from -1 1 to [0,windStrength]
							xWind = Utils.map(xWind,-1,1,0,xWindStrength)
							zWind = Utils.map(zWind,-1,1,0,zWindStrength)

							this.particle[i][j].addForce(new THREE.Vector3(xWind,0,zWind))
						}
						
						yOff += 0.01;	
                    }
					xOff += 0.01;

				}
			this.time += 0.01;
	}
}