var scene,camera,renderer,cube1,cube2,Fdrag,Fspring,velocity,position,mass,xRest,K,particle1,particle2;


function init(){
    clock =  new THREE.Clock;
    clock.start();
    xRest = 6;
    K = 1;
  


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

    particle1 = new Particle(scene);
    particle1.display();
    particle1.position = new THREE.Vector3(2,0,0);

    particle2 = new Particle(scene);
    particle2.display();
    particle2.position = new THREE.Vector3(-2,0,0);

    particle3 = new Particle(scene);
    particle3.display();
    particle3.position = new THREE.Vector3(0,2,0);
}

function update()
{
    delta = clock.getDelta();
    particle1.addForce(Fspring(particle1,particle2));
    particle1.addForce(Fspring(particle1,particle3));
    particle1.addForce(particle1.velocity.clone().normalize().multiplyScalar(-0.5));


    particle2.addForce(Fspring(particle2,particle1));
    particle2.addForce(Fspring(particle2,particle3));
    particle2.addForce(particle2.velocity.clone().normalize().multiplyScalar(-0.5));


    particle3.addForce(Fspring(particle3,particle1));
    particle3.addForce(Fspring(particle3,particle2));
    particle3.addForce(particle3.velocity.clone().normalize().multiplyScalar(-0.5));



    particle1.update(delta);
    particle2.update(delta);
    particle3.update(delta);

    
}

var animate = function () {
	requestAnimationFrame( animate );
    
	
    
    update();
	renderer.render( scene, camera );
};

init();
animate();

function Fspring(particle1 , particle2)
{ 

    let distanceVector = particle1.position.clone().sub(particle2.position);
    let xCurrent = distanceVector.length();
    let direction = distanceVector.normalize();
    let stretch = xCurrent - xRest;
    return  direction.clone().multiplyScalar( -1 *  K * stretch ) ;
}

function onDocumentMouseDown()
{
   // particle1.position = particle1.position.add(new THREE.Vector3(0,0,1))
}


document.addEventListener('mousedown', onDocumentMouseDown, false);
