module.exports = (sequelize, DataTypes, Order) => {
    const Op = sequelize.Op;
    orderModel = sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        BillingAddress: {
            type: DataTypes.STRING
        },
        ShippingAddress:{
            type: DataTypes.STRING
        },
        Status: {
            type: DataTypes.STRING
        },
        DateStatus:{
            type: DataTypes.STRING
        },
        IdClient:{
            type: DataTypes.INTEGER
        }
    });

    /*orderModel.sync({force: false}).then(() =>{
       console.log("sync profile in progress");
   });*/



    orderModel.get = async function(value,callback) {
        if(value!=='undefined') {
            this.findAll({where: {id: value}}).then(order => {
                callback(false, new Order(order.billingAddress, order.shippingAddress, order.status, order.dateStatus));
            }).catch(err => {
                callback(true, err);
            });
        }else {
            callback(true,{error:"Order id is undefined"});
        }
    };
    return orderModel;
}