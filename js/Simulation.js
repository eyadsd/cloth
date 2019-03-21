var scene,camera,renderer,cube1,cube2,Fdrag,Fspring,velocity,position,mass,xRest,K,Fcube1,Fcube2;


function init(){
    clock =  new THREE.Clock;
    clock.start();
    xRest = 5;
    K = 0.1;
    mass = 1;
    Fcube1 = new THREE.Vector3();
    Fcube2 = new THREE.Vector3();
    Fcube3 = new THREE.Vector3();


    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );   
    camera.position.z = 5;

    var controls = new THREE.OrbitControls( camera );
    controls.maxPolarAngle = Math.PI * 0.4;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: 0x34495E  } );
    cube1 = new THREE.Mesh( geometry, material );
    cube1.position.set(-2,0,0);
    
    scene.add( cube1);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: 0x34495E  } );
    cube2 = new THREE.Mesh( geometry, material );
    cube2.position.set(2,0,0);
    scene.add( cube2 );
    
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: 0x34495E  } );
    cube3 = new THREE.Mesh( geometry, material );
    cube3.position.set(0,0,2);
    scene.add( cube3 );


   
    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light )

    var particle = new Particle(scene);
    particle.display();

}

function update()
{
    var velocity;
    delta = clock.getDelta();
    Fcube2.add(Fspring(cube2,cube1));
    Fcube2.add(Fspring(cube2,cube3));

    velocity = Fcube2.clone().multiplyScalar((mass) * delta);
    Fcube2.add(velocity.clone().normalize().multiplyScalar(-0.03))
    cube2.position.copy(cube2.position.clone().add(velocity));


    Fcube1.add(Fspring(cube1,cube2));
    Fcube1.add(Fspring(cube1,cube3));
    velocity = Fcube1.clone().multiplyScalar((mass) * delta);
    Fcube1.add(velocity.clone().normalize().multiplyScalar(-0.03))
    cube1.position.copy(cube1.position.clone().add(velocity));

    Fcube3.add(Fspring(cube3,cube2));
    Fcube3.add(Fspring(cube3,cube1));
    velocity = Fcube3.clone().multiplyScalar((mass) * delta);
    Fcube1.add(velocity.clone().normalize().multiplyScalar(-0.03))
    cube3.position.copy(cube3.position.clone().add(velocity));
}

var animate = function () {
	requestAnimationFrame( animate );
    
	
    
    update();
	renderer.render( scene, camera );
};

init();
animate();

function Fspring(cube1 , cube2)
{ 

    let distanceVector = cube1.position.clone().sub(cube2.position);


    let xCurrent = distanceVector.length();
    let direction = distanceVector.normalize();
    let stretch = xCurrent - xRest;
    return  direction.clone().multiplyScalar( -1 *  K * stretch ) ;
}

function onDocumentMouseDown()
{
    cube2.position.x+=1;
    cube2.position.y+=1;

}


document.addEventListener('mousedown', onDocumentMouseDown, false);
