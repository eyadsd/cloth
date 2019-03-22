var scene,camera,renderer,mass,particle1,particle2, particle;


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

  

    particle = new Array(10);
    for (let index = 0; index < 10; index++) {
        particle[index] = new Particle(scene);
        particle[index].display();
        particle[index].position = new THREE.Vector3(0,0,(index )-7);
        
    }
    



}

function update()
{
    let delta = clock.getDelta();

    for (let index = 0; index < 9; index++) {
        particle[index].addForce(Fspring(particle[index],particle[index + 1],4,1));
        particle[index].addForce(particle[index].velocity.clone().normalize().multiplyScalar(-0.1));
        particle[index].addForce(gravity())
        console.log(particle[index])

        
    }


    for (let index = 0; index < 10; index++) {

        particle[index].update(delta);
        
    }




 

    
}

var animate = function () {
	requestAnimationFrame( animate );
    
	
    
    update();
	renderer.render( scene, camera );
};

init();
animate();

function Fspring(point , anchor,xRest,K)
{ 

    let distanceVector = point.position.clone().sub(anchor.position);
    let xCurrent = distanceVector.length();
    let direction = distanceVector.normalize();
    let stretch = xCurrent - xRest;
    return  direction.clone().multiplyScalar( -1 *  K * stretch ) ;
}

function gravity()
{

    return new THREE.Vector3(0,-9.8,0)
}
function onDocumentMouseDown()
{
   //particle[1]= particle[1].position.add(new THREE.Vector3(0,0,1))
}


document.addEventListener('mousedown', onDocumentMouseDown, false);
