class Forces{

    static Fspring(point , anchor,xRest,K)
    {

        let distanceVector = point.position.clone().sub(anchor.position);
        let xCurrent = distanceVector.length();
        let direction = distanceVector.normalize();
        let stretch = xCurrent - xRest;
        return  direction.clone().multiplyScalar( -1 *  K * stretch ) ;
    }

    static gravity()
    {

        return new THREE.Vector3(0,-1,0)
    }

}