var scene,camera,renderer,mass,particle1,particle2, particle,mesh;


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

  

    particle = new Array(100);
    for (let index = 0; index < 10; index++) {
        for (let j = 0; j < 10; j++)
        {
            particle[index + 10 * j] = new Particle(scene);
            particle[index + 10 * j].display();
            particle[index  + 10* j].position = new THREE.Vector3(j/4,0,(index /4 )-7);
        }


    }
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

    for (let i = 0; i<100; i++)
    {
        geometry.vertices.push(particle[i].position)
    }



    mesh = new THREE.Line(geometry,material)

    scene.add(mesh)
 }



function update()
{
    let delta = clock.getDelta();

    for (let index = 0; index < 99; index++) {
        if(index % 10 == 0)
        {
            continue;
        }
        particle[index].addForce(Fspring(particle[index],particle[index + 1],0.25,10));
        particle[index].addForce(particle[index].velocity.clone().normalize().multiplyScalar(-0.5));
        particle[index].addForce(gravity())
        console.log(particle[index])


    }
    for (let index = 1; index < 99; index++) {
        if(index % 10 == 0 )
        {
            continue;
        }
        particle[index].addForce(Fspring(particle[index],particle[index - 1],0.25,10));
        particle[index].addForce(particle[index].velocity.clone().normalize().multiplyScalar(-0.5));
        particle[index].addForce(gravity())
        console.log(particle[index])


    }

    for (let index = 0; index < 99; index++) {

        particle[index].update(delta);
        mesh.geometry.vertices[index] = particle[index].position;
        mesh.geometry.verticesNeedUpdate = true;

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

    return new THREE.Vector3(0,-2,0)
}
function onDocumentMouseDown()
{
   //particle[1]= particle[1].position.add(new THREE.Vector3(0,0,1))
}


document.addEventListener('mousedown', onDocumentMouseDown, false);
