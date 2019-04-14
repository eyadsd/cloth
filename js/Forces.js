class Forces{
    static Fspring(point , anchor,xRest,K)
    {

        let distanceVector = point.position.clone().sub(anchor.position);
        let xCurrent = distanceVector.length();
        let direction = distanceVector.normalize();
        let stretch = xCurrent - xRest;
				//console.log()
		
        return  direction.clone().multiplyScalar( -1 *  K *stretch  ) ;
    }

    static gravity(mass)
    {

        return new THREE.Vector3(0,-4*mass,0)
    }

}
