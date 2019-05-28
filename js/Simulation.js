var scene,camera,renderer,cloth,time,cloth2,shape;

function init(){
	
	clock =  new THREE.Clock;
	clock.start();
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );   
	camera.position.z = 5;
	var controls = new THREE.OrbitControls( camera );
	controls.maxPolarAngle = Math.PI * 0.4;
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );



	let  thereBeLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1);
	scene.add( thereBeLight )


	scene.background = new THREE.Color( 0xcce0ff );
	scene.fog = new THREE.Fog( 0xcce0ff, 500, 2000 );

	var loader = new THREE.TextureLoader();
	var groundTexture = loader.load( 'textures/floor9.jpg' );
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set( 50, 50 );
	groundTexture.anisotropy = 16;
	var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
	//var groundMaterial = new THREE.MeshLambertMaterial( { color: 0x2F4F4F} );
	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 300, 300 ), groundMaterial );
	mesh.position.y = - 5;
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh );



	cloth = new Sheet(new THREE.Vector3(0,0,0))
	cloth.init_mesh()
	
}


let adaptiveTimestep = false
let timestep = TIME_STEP
let accumulator = 0
let epsilom =2
function update()
{
	accumulator +=	clock.getDelta()
	while(accumulator>=timestep)
	{					

			accumulator-=timestep
			cloth.update(timestep)

			// //if(adaptiveTimestep == true)
			// //{
			// cloth2 = cloth.clone()
			// cloth2.update(timestep)
			// let diff = cloth2.diff
			// console.log(diff)
			// if(diff>epsilom)
			// {
			// 	while(diff>epsilom)
			// 	{
			// 		timestep = timestep/2
			// 		cloth2 = cloth.clone()
			// 		cloth2.update(timestep)

			// 		diff = cloth2.diff
			// 	}

			// 	cloth.update(timestep)
			// }
			// else{
			// 	cloth.update(timestep)
			// 	//timestep = timestep * 2
			// }
			// //}
	}
	
}

var animate = function () {
	requestAnimationFrame( animate );
	

	update();
	cloth.render()
	renderer.render( scene, camera );
};

init();
animate();

function onDocumentMouseDown()
{
	
}
function onDocumentMouseUp()
{
	
}

document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
document.addEventListener("keydown", function (event) {
	if (event.defaultPrevented) {
	  return; // Do nothing if the event was already processed
	}
  
	switch (event.key) {
	  case "ArrowDown":
	  	shapePosition.add(new THREE.Vector3(0,0,OBJECT_SPEED*timestep))
	  break;
	  case "ArrowUp":
		shapePosition.add(new THREE.Vector3(0,0,-OBJECT_SPEED*timestep))
	  break;
	  case "ArrowLeft":
		shapePosition.add(new THREE.Vector3(-OBJECT_SPEED*timestep,0,0))
	  break;
	  case "ArrowRight":
		shapePosition.add(new THREE.Vector3(OBJECT_SPEED*timestep,0,0))
	  break;
	  case "q":
		shapePosition.add(new THREE.Vector3(0,OBJECT_SPEED*timestep,0))
	  break;
	  case "a":
		shapePosition.add(new THREE.Vector3(0,-OBJECT_SPEED*timestep,0))
 	  break;
	  default:
		return; // Quit when this doesn't handle the key event.
	}
  
	// Cancel the default action to avoid it being handled twice
	event.preventDefault();
  }, true);