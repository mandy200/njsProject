module.exports = (sequelize, DataTypes, ShippingType) => {
    const Op = sequelize.Op;
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
        },
        Distance: {
            type: DataTypes.INTEGER
        }
    });

    //create
    shippingTypeModel.insert = async function(value, callback) {
        this.create({Name: value.shippingTypeName, Price: value.price}).then(task => {
            //callback(task);
        });
    };
    shippingTypeModel.findByName = async function(value,callback) {
        this.findAll({
            where: {
                Name: { [Op.iLike]: '%' + value + '%' }
            }
        }).then((record) => callback(false, record))
            .catch((err) => callback(true, err));
    }
    return shippingTypeModel;
}
