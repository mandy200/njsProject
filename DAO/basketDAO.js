module.exports = (sequelize, DataTypes, Product) => {
    const Op = sequelize.Op
    productModel = sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Quantity: {
            type: DataTypes.INTEGER
        },
        Product: {
            type: DataTypes.STRING
        }

    });
}