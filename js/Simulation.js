var scene,camera,renderer,cloth,time,cloth2;
// var loader = new THREE.OBJLoader();
// let human = new THREE.Mesh()
// // load a resource
// loader.load(
// 	// resource URL
// 	'FinalBaseMesh.obj',
// 	// called when resource is loaded
// 	function ( object ) {
// 		object.scale.set(0.2,0.2,0.2)
// 		object.position.set(0,-5,1)
// 		scene.add(object)
// 		human = object.children[0]
// 		console.log(human)
// 	},)
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
	//   hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
	//   hemiLight.color.setHSL( 0.6, 1, 0.6 );
	//   hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
	//   hemiLight.position.set( 0, 50, 0 );
	//   scene.add( hemiLight );


	scene.background = new THREE.Color( 0xcce0ff );
	scene.fog = new THREE.Fog( 0xcce0ff, 500, 2000 );

	var loader = new THREE.TextureLoader();
	var groundTexture = loader.load( 'textures/floor6.jpg' );
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set( 250, 250 );
	groundTexture.anisotropy = 16;
	var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), groundMaterial );
	mesh.position.y = - 5;
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh );


//   var vertexShader = document.getElementById( 'vertexShader' ).textContent;
//   var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
//   var uniforms = {
// 	  "topColor": { value: new THREE.Color( 0x0077ff ) },
// 	  "bottomColor": { value: new THREE.Color( 0xffffff ) },
// 	  "offset": { value: 33 },
// 	  "exponent": { value: 0.6 }
//   };
//   uniforms[ "topColor" ].value.copy( hemiLight.color );
//   scene.fog.color.copy( uniforms[ "bottomColor" ].value );
//   var skyGeo = new THREE.SphereBufferGeometry( 4000, 32, 15 );
//   var skyMat = new THREE.ShaderMaterial( {
// 	  uniforms: uniforms,
// 	  vertexShader: vertexShader,
// 	  fragmentShader: fragmentShader,
// 	  side: THREE.BackSide
//   } );
//   var sky = new THREE.Mesh( skyGeo, skyMat );
//   scene.add( sky );

	cloth = new Sheet(new THREE.Vector3(0,0,0))
	cloth.init_mesh()
	
}


let adaptiveTimestep = false
let timestep = TIME_STEP
let accumulator = 0
let epsilom = 2
function update()
{
	accumulator +=	clock.getDelta()
	while(accumulator>=timestep)
	{
			accumulator-=timestep
			if(adaptiveTimestep == true)
			{
				cloth2 = cloth.clone()
				cloth2.update(timestep)
				let diff = cloth2.diff
				let newStep = epsilom/cloth2.maxv
				if(diff>epsilom)
				{
					count = Math.floor(timestep/newStep)
					while(count>0)
					{
						cloth.update(newStep)
						count-=1
					}
				}
				else{
					cloth.update(timestep)
				}
			}
		    else{
				cloth.update(timestep)
			}
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
	  	sphereCenter.add(new THREE.Vector3(0,0,5*timestep))
	  break;
	  case "ArrowUp":
	 	 sphereCenter.add(new THREE.Vector3(0,0,-5*timestep))
	  break;
	  case "ArrowLeft":
	 	 sphereCenter.add(new THREE.Vector3(-5*timestep,0,0))
	  break;
	  case "ArrowRight":
	  	sphereCenter.add(new THREE.Vector3(5*timestep,0,0))
	  break;
	  case "q":
	  	sphereCenter.add(new THREE.Vector3(0,5*timestep,0))
	  break;
	  case "a":
		sphereCenter.add(new THREE.Vector3(0,-5*timestep,0))
 	  break;
	  default:
		return; // Quit when this doesn't handle the key event.
	}
  
	// Cancel the default action to avoid it being handled twice
	event.preventDefault();
  }, true);