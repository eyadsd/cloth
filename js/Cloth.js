class Cloth{
    constructor(position){
        this.height = 25;
        this.width = 25;
		this.particle = new Array(this.height);
		this.springs = []
		this.xRest = 0.1;
		this.K = 40;
		this.time = 0;
		this.deformationRate = 0.1;
		this.position = position.clone()
		this.constraintIterations = 50
		this.deformationConstraint = false
		this.raycaster = new THREE.Raycaster();


	}
	init()
	{
		
	}
    update(timestep){
		
		this.calculateForces()
		
		if(this.deformationConstraint == true)
		{
			for(let k = 0; k <this.constraintIterations ; k++)
			{	
				for(let i = 0; i<this.springs.length;i++)
				{
					let limit = this.xRest + this.xRest * this.deformationRate
					let diagonalLimit = Math.sqrt(Math.pow(limit,2)*2)
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
		}

			//collision detection
			if(shape){

			if(shape.geometry.type == "SphereGeometry")
			{
				for (let i = 0; i < this.height; i++)
				{
					for (let j = 0; j <this.width; j++)
					{
						let position = this.particle[i][j].position.clone()
						let velocity = this.particle[i][j].velocity.clone()
					    let radius = sphereRadius
						let center = shapePosition.clone()
						let direction = position.clone().sub(center).normalize()
						let distance =  position.distanceTo(center)
						if( distance < radius){
							let newPosition = direction.clone().multiplyScalar(radius).add(center)
							this.particle[i][j].position = newPosition.clone()
							let vn = direction.clone().multiplyScalar(direction.clone().dot(velocity))
							let vt = velocity.clone().sub(vn)
							this.particle[i][j].velocity = vt.clone()
						 }
	
					
					
					}
	
				}
			}
			else
			{
				for (let i = 0; i < this.height; i++) {
					for (let j = 0; j < this.width; j++) {
						let raycastDirection = this.particle[i][j].velocity.clone().normalize()
						this.raycaster.set(this.particle[i][j].position,raycastDirection)
						let intersects = this.raycaster.intersectObject(shape);
						let position = this.particle[i][j].position.clone()
						let velocity = this.particle[i][j].velocity.clone()
						if (intersects.length > 0) {
						   var intersection  = intersects[0];
								if(intersection.distance<0.05)
								{
									//let direction = intersection.face.normal
									this.particle[i][j].addForce(Forces.Fspring(position,intersection.point,0.05,600))
									this.particle[i][j].addPosition(velocity.normalize().multiplyScalar((0.05-intersection.distance)*-1))
	
									// let vn = direction.clone().multiplyScalar(direction.clone().dot(this.particle[i][j].velocity))
									// let vt = this.particle[i][j].velocity.clone().sub(vn)
									// this.particle[i][j].velocity = vt.clone().sub(vn.clone().multiplyScalar(0))
	
								}
							
						}
					}
				}
			}
			
		}
		
		
		//let maxDiff = 0
		for (let i = 0; i < this.height; i++) {
			
			for (let j = 0; j < this.width; j++) {
			
				this.particle[i][j].update(timestep)
			
			//let diff = 	this.particle[i][j].velocity.length() * timestep
			// if(diff>maxDiff)
			// {
			// 	maxDiff = diff
			// }
			//console.log(this.particle[i][j].velocity)
			}
		}
		//this.diff = maxDiff
	}
	// Response(particle,normal,distance){
	// 	let direction = normal
	// 	particle.addPosition(particle.velocity.clone().multiplyScalar(-1).normalize().multiplyScalar(0.1-distance))
	// 	let vn = direction.clone().multiplyScalar(direction.clone().dot(particle.velocity))
	// 	let vt = particle.velocity.clone().sub(vn)
	// 	particle.velocity = vt.clone().sub(vn.clone().multiplyScalar(0.8))
	// }
	render()
	{	
		if(shape)
		{
			shape.position.setX(shapePosition.x)
			shape.position.setZ(shapePosition.z)
			shape.position.setY(shapePosition.y)
		}
		

		
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				
					this.mesh.geometry.vertices[i * this.width + j] = this.particle[i][j].position;
					if(this.particle[i][j].position.y < -4.9)
					{
						this.particle[i][j].position.setY(-4.9)
						let direction = new THREE.Vector3(0, 1, 0)
						let vn = direction.clone().multiplyScalar(direction.clone().dot(this.particle[i][j].velocity))
		 				let vt =this.particle[i][j].velocity.clone().sub(vn)
		 				this.particle[i][j].velocity = vt.clone()
					}
			}
		}
	
			
		
			this.mesh.geometry.computeFaceNormals();
			this.mesh.geometry.computeVertexNormals();
	
			this.mesh.geometry.verticesNeedUpdate = true;
			this.mesh.geometry.elementsNeedUpdate = true;
			this.mesh.geometry.normalsNeedUpdate = true;
	
		
			
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
				this.springs[i].point1.addForce(Forces.Fspring(this.springs[i].point1.position,this.springs[i].point2.position,this.xRest,this.K))
				this.springs[i].point2.addForce(Forces.Fspring(this.springs[i].point2.position,this.springs[i].point1.position,this.xRest,this.K))

			}
			if(this.springs[i].type == "shear")
			{
				this.springs[i].point1.addForce(Forces.Fspring(this.springs[i].point1.position,this.springs[i].point2.position,this.diagonalDistance,this.K))
				this.springs[i].point2.addForce(Forces.Fspring(this.springs[i].point2.position,this.springs[i].point1.position,this.diagonalDistance,this.K))
				
			}
			if(this.springs[i].type == "bending")
			{
				this.springs[i].point1.addForce(Forces.Fspring(this.springs[i].point1.position,this.springs[i].point2.position,this.xRest*2,this.K/3))
				this.springs[i].point2.addForce(Forces.Fspring(this.springs[i].point2.position,this.springs[i].point1.position,this.xRest*2,this.K/3))
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
                        this.particle[i][j].addForce(this.particle[i][j].velocity.clone().normalize().multiplyScalar(-DRAG));
						
						if(wind == true)
						{
							// the simplex3 function outputs a value between -1 1 
							let xWind = noise.simplex3(xOff, yOff, this.time);
							let zWind = noise.simplex3(xOff+1000,yOff+2000,this.time);
							let yWind = noise.simplex3(xOff+10000,yOff+20000,this.time);

							//mapping the value of simplex3 from -1 1 to [0,windStrength]
							xWind = Utils.map(xWind,-1,1,-xWindStrength,xWindStrength)
							zWind = Utils.map(zWind,-1,1,-yWindStrength,zWindStrength)
							yWind = Utils.map(yWind,-1,1,-zWindStrength,yWindStrength)
							this.particle[i][j].addForce(new THREE.Vector3(xWind,yWind,zWind))

						}
						
						yOff += 0.01;	
                    }
					xOff += 0.01;

				}
			this.time += 0.005;
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
	init_mesh(){
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
		
	
		

		

		
		}
	clone(){
		let newCloth = new Cloth(this.position)
		let particle = new Array(this.height)
		for (let i = 0; i < this.height; i++) {
            particle[i] = new Array(this.width)
            for (let j = 0; j < this.width; j++)
            {
				particle[i][j] = this.particle[i][j].clone()
            }
		}
		newCloth.particle = particle
		newCloth.mesh = this.mesh.clone()
		newCloth.addSprings()
		return newCloth
	}
	reset(){
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++)
			{
				this.particle[i][j].position = new THREE.Vector3(j*this.xRest-this.xRest*(this.width/2),1,i*this.xRest).add(this.position);
				cloth.particle[i][j].fixed = false
				cloth.particle[i][j].velocity = new THREE.Vector3(0,0,0)
				cloth.particle[i][j].acceleration = new THREE.Vector3(0,0,0)

			}
	
	
		}
	}
	
	set particle(newParticle){
		this._particle = newParticle
	}
	get particle(){
		return this._particle
	}
	set position(newPosition){
		this._position = newPosition
	}
	get position(){
		return this._position
	}
	get diff(){
		return this._diff
	}
	set diff(diff){
		this._diff = diff
	}
	get maxv(){
		return this._maxv
	}
	set maxv(maxv){
		this._maxv = maxv
	}
	get constraintIterations(){
		return this._constraintIterations
	}
	set constraintIterations(constraintIterations){
		this._constraintIterations = constraintIterations
	}
	get height(){
		return this._height
	}
	set height(height){
		this._height = height
	}
	get width(){
		return this._width
	}
	set width(width){
		this._width = width
	}
}