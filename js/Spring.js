class Spring{
    constructor(point1, point2, type){
        this.point1 = point1
        this.point2 = point2
        this.type = type
    }
    get type(){
       return this._type     
    }
    set type(type){
        this._type = type
    }
    get point1(){
        return this._point1
    }
    set point1(point1){
        this._point1 = point1
    }
    get point2(){
        return this._point2
    }
    set point2(point2){
        this._point2 = point2
    }
}