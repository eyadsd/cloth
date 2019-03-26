var scene,camera,renderer,cloth;


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
    
   

   
    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light )
	
    cloth = new Cloth(scene)


 }



function update()
{
    let delta = clock.getDelta();
    cloth.update(delta)





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
   //particle[1]= particle[1].position.add(new THREE.Vector3(0,0,1))
}


document.addEventListener('mousedown', onDocumentMouseDown, false);
