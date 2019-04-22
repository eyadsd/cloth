var scene,camera,renderer,cloth,time;


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
	//var light = new THREE.DirectionalLight( 0xffffff, 1 );
	// var light = new THREE.DirectionalLight( 0xdfebff, 1 );
	// light.position.set( 50, 200, 100 );
	// light.position.multiplyScalar( 1.3 );
    scene.add( thereBeLight )
	//scene.add( new THREE.AmbientLight( 0x666666 ) );
	textures = new Array(4);
	let loader = new THREE.TextureLoader();
	// textures.push(loader.load( "textures/red_cloth.jpg" ));
	// textures.push(loader.load( "textures/blue_cloth.jpg" ));
	// textures.push(loader.load( "textures/cloth_texture1.jpg" ));
	// textures.push(loader.load( "textures/cloth_texture2.png" ));
	
	// cloth = new Array(4)
	// for(let i = 0;i<2;i++)
	// {
	// 	for(let j = 0;j<2;j++)
	// {
	// 	cloth[i*2+j] = new Cloth(scene,new THREE.Vector3(i*5,0,j*5))

	// }
	// }

	cloth = new Cloth(scene,new THREE.Vector3(0,0,0))

	
 }



function update()
{
	cloth.update()


}

var animate = function () {
	requestAnimationFrame( animate );



    update();
	renderer.render( scene, camera );
};

init();
animate();


function onDocumentMouseDown()
{
	//wind = true;
		//console.log("down")
		noForces = true;
}
function onDocumentMouseUp()
{
	//wind = false;
	//console.log("up")
	noForces = false;
}

document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);

