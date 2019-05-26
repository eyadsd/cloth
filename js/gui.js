

var obj = {
  message: 'controls',
       
  position1: false,
  position2: false,
  position3: false,
  position4: false,
  adaptiveTimestepObj: false,
  xWindStrengthObj: 0.3,
  zWindStrengthObj: 0.3,
  yWindStrengthObj: 0,
  deformationRateObj: 0.1,
  gravityStrengthObj:4,
  timestep:80,
  windObj:false,
  constraintIterationsObj:40,
  deformationConstraint:false,
  kObj:40,
  massObj:0.05,
  // reset: function(){
  //   cloth.reset()
  // },
};



var gui = new dat.gui.GUI();

gui.remember(obj);
//gui.add(obj,'reset');
gui.add(obj, 'position1').name('2 fixed').listen().onChange(function(){
  setChecked('position1')
  cloth.reset()
  cloth.particle[0][0].fixed = true
  cloth.particle[0][cloth.width-1].fixed = true
});

gui.add(obj, 'position2').name('row fixed').listen().onChange(function(){
  setChecked('position2')
  cloth.reset()

  for(let i = 0; i<cloth.width;i++)
  {
    cloth.particle[0][i].fixed = true

  }
});

gui.add(obj, 'position3').name('1 fixed').listen().onChange(function(){
  setChecked("position3");
  for (let i = 0; i < cloth.height; i++) {
    for (let j = 0; j < cloth.width; j++)
    {
      cloth.particle[i][j].velocity = new THREE.Vector3(0,0,0)
      cloth.particle[i][j].acceleration = new THREE.Vector3(0,0,0)
      cloth.particle[i][j].fixed = false

    }
  }
  cloth.particle[0][0].fixed = true
});

gui.add(obj, 'position4').name('0 fixed').listen().onChange(function(){
  setChecked("position4");
  for (let i = 0; i < cloth.height; i++) {
    for (let j = 0; j < cloth.width; j++)
    {
      cloth.particle[i][j].velocity = new THREE.Vector3(0,0,0)
      cloth.particle[i][j].acceleration = new THREE.Vector3(0,0,0)
      cloth.particle[i][j].fixed = false

    }
  }
});

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
gui.add(obj, 'massObj').min(0.01).max(5).step(0.001).name("mass").onChange(function(){
  for(let i = 0;i<cloth.height;i++)
  {
    for(let j = 0;j<cloth.width;j++)
    {
      cloth.particle[i][j].mass = obj.massObj
    }
  }
});
gui.add(obj, 'timestep').min(30).max(300).step(1).name("1/timestep").onChange(function(){
  timestep = 1/obj.timestep;
});
gui.add(obj, 'adaptiveTimestepObj').name("adaptive timestep").onChange(function(){
  adaptiveTimestep = obj.adaptiveTimestepObj
});

gui.add(obj, 'windObj').name("wind").onChange(function(){
  wind = obj.windObj
});



function setChecked( prop ){
	for (let param in obj){
    obj[param] = false;
  }
  obj[prop] = true;
}