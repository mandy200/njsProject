module.exports = (sequelize, DataTypes, ShippingType) => {
        shippingTypeModel = sequelize.define('shippingType', {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                Name: {
                    type: DataTypes.STRING
                },
                Price: {
                    type: DataTypes.FLOAT
                }
            });
        /*shippingTypeModel.sync({force: false}).then(() =>{
                console.log("sync in progress");
            });*/

        shippingTypeModel.insert = async function(value, callback) {
            this.create({Name: value.shippingTypeName, Price: value.price}).then(task => {
                //callback(task);
            });
        };
        return shippingTypeModel;
}
