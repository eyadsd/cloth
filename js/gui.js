

var obj = {
  message: 'controls',
  reset:function(){
    cloth.reset()

  }  ,
  position1: function(){
    cloth.reset()
    cloth.particle[0][0].fixed = true
    cloth.particle[0][cloth.width-1].fixed = true
  },
  position2: function(){
    cloth.reset()
  
    for(let i = 0; i<cloth.width;i++)
    {
      cloth.particle[0][i].fixed = true
  
    }
  },
  position3: function(){
    for (let i = 0; i < cloth.height; i++) {
      for (let j = 0; j < cloth.width; j++)
      {
        if(cloth.particle[i][j].fixed == true)
        {
          cloth.particle[i][j].velocity = new THREE.Vector3(0,0,0)
          cloth.particle[i][j].acceleration = new THREE.Vector3(0,0,0)
        }

        cloth.particle[i][j].fixed = false
  
      }
    }
    cloth.particle[0][0].fixed = true
  },
  position4: function(){
    for (let i = 0; i < cloth.height; i++) {
      for (let j = 0; j < cloth.width; j++)
      {
        if( cloth.particle[i][j].fixed == true)
        {
          cloth.particle[i][j].velocity = new THREE.Vector3(0,0,0)
          cloth.particle[i][j].acceleration = new THREE.Vector3(0,0,0)
        }
  
        cloth.particle[i][j].fixed = false
  
      }
    }
  },
  wireframeObj: false,
  xWindStrengthObj: 0.3,
  zWindStrengthObj: 0.3,
  yWindStrengthObj: 0,
  deformationRateObj: 0.1,
  gravityStrengthObj:4,
  timestep:1/TIME_STEP,
  windObj:false,
  constraintIterationsObj:40,
  deformationConstraint:true,
  kObj:40,
  massObj:0.05,
  dragObj:0.1,
  scenario1Obj:function(){	
      clearScene()
      var geometry = new THREE.SphereGeometry(0.45, 32, 32);
      var material = new THREE.MeshLambertMaterial({	color:0x0000f0 })
      shape = new THREE.Mesh(geometry,material)
      shape.userData = { keepMe: true };
      scene.add(shape)
      timestep = 1/80
      OBJECT_SPEED = 5
      cloth.deformationConstraint = true
		},
  scenario2Obj:function(){
    clearScene()
    cloth.reset()
    cloth.particle[0][0].fixed = true
    cloth.particle[0][cloth.width-1].fixed = true
    var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
		let radius = 0.6;
		const tubeRadius = 0.2;
		const radialSegments = 8;
		const tubularSegments = 12;
		geometry = new THREE.TorusBufferGeometry(radius, tubeRadius, radialSegments, tubularSegments);
		shape = new THREE.Mesh(geometry,material)
		shape.rotation.x = Math.PI / 2;
    shape.userData = { keepMe: true };
    shapePosition.set(0,0,1.5)
    scene.add(shape)
    timestep = 1/140
    cloth.deformationConstraint = false
  },
  scenario3Obj:function(){
    clearScene()
    cloth.reset()
    cloth.particle[0][0].fixed = true
    cloth.particle[0][cloth.width-1].fixed = true
    const radius = 3.5;
    const tube = 1.5;
    const radialSegments = 6;
    const tubularSegments = 20;
    const p = 2;
    const q = 3;
    const geometry = new THREE.TorusKnotBufferGeometry(radius, tube, tubularSegments, radialSegments, p, q);
    var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
    shape = new THREE.Mesh(geometry,material)
		//shape.rotation.x = Math.PI / 2;
    shape.userData = { keepMe: true };
    shapePosition.set(0,0,1.5)
    shape.scale.set(0.1,0.1,0.1)
    scene.add(shape)
    timestep = 1/130
    cloth.deformationConstraint = false
  },
  scenario4Obj:function(){
    clearScene();
    cloth.reset()
    cloth.particle[0][0].fixed = true
    cloth.particle[0][cloth.width-1].fixed = true
    const radiusTop = 4;
    const radiusBottom = 4;
    const height = 28;
    const radialSegments = 12;
    const geometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments);
    var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
    shape = new THREE.Mesh(geometry,material)
    shape.userData = { keepMe: true };
    shape.rotation.x = Math.PI / 2;

    shapePosition.set(0.6,0,1)
    shape.scale.set(0.1,0.1,0.1)
    scene.add(shape)
    timestep = 1/130
    cloth.deformationConstraint = false

  }
};



var gui = new dat.gui.GUI();

gui.remember(obj);

gui.add(obj,'reset')

var fixedPointsFolder = gui.addFolder('fixed points');

fixedPointsFolder.add(obj, 'position1').name('2 fixed');

fixedPointsFolder.add(obj, 'position2').name('row fixed');

fixedPointsFolder.add(obj, 'position3').name('1 fixed');

fixedPointsFolder.add(obj, 'position4').name('0 fixed');

gui.add(obj, 'xWindStrengthObj').min(-1).max(1).step(0.1).name("X wind").onChange(function(){
  xWindStrength = obj.xWindStrengthObj;
});

gui.add(obj, 'zWindStrengthObj').min(-1).max(1).step(0.1).name("Z wind").onChange(function(){
  zWindStrength = obj.zWindStrengthObj;
});

gui.add(obj, 'yWindStrengthObj').min(-1).max(1).step(0.1).name("Y wind").onChange(function(){
  yWindStrength = obj.yWindStrengthObj;
});

gui.add(obj, 'deformationConstraint').name("deformation constraint").onChange(function(){
  cloth.deformationConstraint = obj.deformationConstraint;
});

gui.add(obj, 'deformationRateObj').min(0.05).max(1).step(0.05).name("deformation rate").onChange(function(){
  cloth.deformationRate = obj.deformationRateObj;
});
gui.add(obj, 'constraintIterationsObj').min(10).max(100).step(1).name("constraint iterations").onChange(function(){
  cloth.constraintIterations = obj.constraintIterationsObj;
});
gui.add(obj, 'kObj').min(10).max(400).step(1).name("K").onChange(function(){
  cloth.K = obj.kObj;
});
gui.add(obj, 'gravityStrengthObj').min(0).max(10).step(0.01).name("gravity").onChange(function(){
  GRAVITY_STRENGTH = obj.gravityStrengthObj;
});
gui.add(obj, 'massObj').min(0.01).max(1).step(0.001).name("mass").onChange(function(){
  for(let i = 0;i<cloth.height;i++)
  {
    for(let j = 0;j<cloth.width;j++)
    {
      cloth.particle[i][j].mass = obj.massObj
    }
  }
});
gui.add(obj, 'dragObj').min(0).max(1).step(0.01).name("drag").onChange(function(){
  DRAG = obj.dragObj;
});
gui.add(obj, 'timestep').min(60).max(300).step(1).name("1/timestep").onChange(function(){
  timestep = 1/obj.timestep;
});
gui.add(obj, 'wireframeObj').name("wireframe").onChange(function(){
  cloth.mesh.material.wireframe  = obj.wireframeObj
});

gui.add(obj, 'windObj').name("wind").onChange(function(){
  wind = obj.windObj
});
var f1 = gui.addFolder('scenarios');
f1.add(obj, 'scenario1Obj');
f1.add(obj, 'scenario2Obj');
f1.add(obj, 'scenario3Obj');
f1.add(obj, 'scenario4Obj');

function setChecked( prop ){
	for (let param in obj){
    obj[param] = false;
  }
  obj[prop] = true;
}

function clearScene() {
  var to_remove = [];

  scene.traverse ( function( child ) {
      if ( child instanceof THREE.Mesh && !child.userData.keepMe === false ) {
          to_remove.push( child );
       }
  } );

  for ( var i = 0; i < to_remove.length; i++ ) {
      scene.remove( to_remove[i] );
  }
}