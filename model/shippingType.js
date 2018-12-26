class ShippingType {
    constructor(idShippingtype, shippingTypeName, price, distance){
        this.idShippingtype = idShippingtype;
        this.shippingTypeName = shippingTypeName;
        this.distance = distance;
        this.price = price;
    }
//this method checks if the input is correct
    check() {
    }
}
module.exports = ShippingType;