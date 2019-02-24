var util = require("util");
    class Order {

    constructor(billingAddress, shippingAddress, status, dateStatus) {
        this.billingAddress = billingAddress;
        this.shippingAddress = shippingAddress;
        this.status = status;
        this.dateStatus = dateStatus;
    }

}
module.exports = Order;