class Forces{
    static Fspring(point , anchor,xRest,K)
    {
        let distanceVector = point.clone().sub(anchor);
        let xCurrent = distanceVector.length();
        let direction = distanceVector.normalize();
        let stretch = xCurrent - xRest;
				//console.log()
		
        return  direction.multiplyScalar( -1 *  K *stretch)
    }

    static gravity(mass)
    {

        return new THREE.Vector3(0,-GRAVITY_STRENGTH*mass,0)
    }

}
