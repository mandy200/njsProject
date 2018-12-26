class Size {
    constructor(weight,height,width,depth) {
        this.weight = weight;
        this.height = height;
        this.width = width;
        this.depth = depth;
    }
    volume () {
        return this.depth*this.height*this.width;
    }
    check () {
        if(this.depth<0 || this.height<0 || this.weight<0 || this.width<0);
    }
}
module.exports = Size;