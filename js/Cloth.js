class Cloth{
    constructor(scene,position){
        this.height = 25;
        this.width = 25;
		this.particle = new Array(this.height);
		this.springs = []
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
		console.log(this.diagonalDistance)

		this.addSprings()
		this.particle[0][0].fixed = true
		this.particle[0][this.width-1].fixed = true

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
		 var material = new THREE.MeshLambertMaterial({map:this.texture, 
		 side:THREE.DoubleSide });
		 
		 //only color
		 // var material = new THREE.MeshBasicMaterial({color:0x00ffff, 
		 // side:THREE.DoubleSide });
		
		//material.wireframe = true;
		this.mesh = new THREE.Mesh(geometry,material)
		
		scene.add(this.mesh)
		
		var geometry = new THREE.SphereGeometry(0.45, 32, 32);
		var material = new THREE.MeshLambertMaterial( {color: 0x0000ff} );

		this.sphere = new THREE.Mesh( geometry, material );
		scene.add( this.sphere );
					
			
		
    }
    update(){
		this.sphere.position.setX(sphereCenter.x)
		this.sphere.position.setZ(sphereCenter.z)
		this.calculateForces()
           
			
			for(let k = 0; k < 50 ; k++)
			{	
				for(let i = 0; i<this.springs.length;i++)
				{
					let limit = this.xRest + this.xRest/10
					let diagonalLimit = Math.sqrt(Math.pow(limit,2)*2)
					let bendingLimit = this.xRest*2 + this.xRest*2/10
					if(this.springs[i].type == "structural")
					{
						let distance = this.springs[i].point1.position.clone().sub(this.springs[i].point2.position).length()
						if(distance>limit){
								this.adjust(this.springs[i].point1,this.springs[i].point2,distance,limit)
						}
						
					}
					if(this.springs[i].type == "shear"){
						let distance = this.springs[i].point1.position.clone().sub(this.springs[i].point2.position).length()
						if(distance>diagonalLimit){
							this.adjust(this.springs[i].point1,this.springs[i].point2,distance,diagonalLimit)
						}
					}
				
					
				}

			}
			
				
			for (let i = 0; i < this.height; i++)
				{
                for (let j = 0; j <this.width; j++)
                    {

						let radius = 0.5
						let position = new THREE.Vector3(-1,-1,1)
						position = sphereCenter
						let distanceVector = this.particle[i][j].position.clone().sub(position)
						let direction = distanceVector.clone().normalize()
						let distance =  this.particle[i][j].position.distanceTo(position)
						let velocity = this.particle[i][j].velocity
						if( distance < radius){
							let newposition = direction.clone().multiplyScalar(radius).add(position)
							this.particle[i][j].position = newposition
							let vn = velocity.clone().multiplyScalar(direction.clone().dot(velocity))
							this.particle[i][j].velocity = vn.multiplyScalar(0.1)
							
						 }
						
						
                    }

				}
				
				this.mesh.geometry.computeFaceNormals();
				this.mesh.geometry.computeVertexNormals();
	
				this.mesh.geometry.verticesNeedUpdate = true;
				this.mesh.geometry.elementsNeedUpdate = true;
				this.mesh.geometry.normalsNeedUpdate = true;
			
				for (let i = 0; i < this.height; i++) {
					for (let j = 0; j < this.width; j++) {
						{
							this.particle[i][j].update();
							this.mesh.geometry.vertices[i * this.width + j] = this.particle[i][j].position;
							
						}
					}
				}
    }
	
	adjust(point1,point2,distance,limit)
	{
		let point1topoint2 = point2.position.clone().sub(point1.position).normalize()
		let point2topoint1 = point1.position.clone().sub(point2.position).normalize()
		let diff = distance - limit
		point1topoint2.multiplyScalar(diff/2)
		point2topoint1.multiplyScalar(diff/2)

		point1.addPosition(point1topoint2)
		point2.addPosition(point2topoint1)


	}

	
	calculateForces()
	{
		for (let i = 0; i < this.springs.length; i++)
		{
			if(this.springs[i].type == "structural")
			{
				this.springs[i].point1.addForce(Forces.Fspring(this.springs[i].point1,this.springs[i].point2,this.xRest,this.K))
				this.springs[i].point2.addForce(Forces.Fspring(this.springs[i].point2,this.springs[i].point1,this.xRest,this.K))

			}
			if(this.springs[i].type == "shear")
			{
				this.springs[i].point1.addForce(Forces.Fspring(this.springs[i].point1,this.springs[i].point2,this.diagonalDistance,this.K))
				this.springs[i].point2.addForce(Forces.Fspring(this.springs[i].point2,this.springs[i].point1,this.diagonalDistance,this.K))
				
			}
			if(this.springs[i].type == "bending")
			{
				this.springs[i].point1.addForce(Forces.Fspring(this.springs[i].point1,this.springs[i].point2,this.xRest*2,this.K/3))
				this.springs[i].point2.addForce(Forces.Fspring(this.springs[i].point2,this.springs[i].point1,this.xRest*2,this.K/3))
			}
		}
		let xOff = 0; 
            for (let i = 0; i < this.height; i++) {
				
				let yOff = 0;
                for (let j = 0; j < this.width; j++)
                    {
						// gravity force	
                        this.particle[i][j].addForce(Forces.gravity(this.particle[i][j].mass))

						//drag force	
                        this.particle[i][j].addForce(this.particle[i][j].velocity.clone().normalize().multiplyScalar(-0.1));
						
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
	addSprings(){
		for (let i = 0; i < this.height; i++) {
				
			for (let j = 0; j < this.width; j++)
				{
					
					if(i<this.height-1&&j<this.width-1)
					{
						this.springs.push(new Spring(this.particle[i][j],this.particle[i+1][j+1],"shear"));

					}
					if(j<this.width-1&&i>0)
					{
						this.springs.push(new Spring(this.particle[i][j],this.particle[i-1][j+1],"shear"));

					}
					
					
					if(i<this.height-1)
					{
						this.springs.push(new Spring(this.particle[i][j],this.particle[i+1][j],"structural"));

					}
					if(j<this.width-1)
					{
						this.springs.push(new Spring(this.particle[i][j],this.particle[i][j+1],"structural"));

					}
					
					
					
					// bending springs
					// if(i>1)
					// {
					// 	this.springs.push(new Spring(this.particle[i][j],this.particle[i-2][j],"bending"));

					// }
					// if(j>1)
					// {
					// 	this.springs.push(new Spring(this.particle[i][j],this.particle[i][j-2],"bending"));

					// }
					
					if(i<this.height-2)
					{
						this.springs.push(new Spring(this.particle[i][j],this.particle[i+2][j],"bending"));

					}
					if(j<this.width-2)
					{
						this.springs.push(new Spring(this.particle[i][j],this.particle[i][j+2],"bending"));

					}
				}
			}
	}

}