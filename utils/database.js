const Sequelize = require('sequelize');
const {Product,ShippingType,Shop} = require('../model/models');
const sequelize = new Sequelize('nodejs', 'nodejs', 'nodejs', {
    host: 'localhost',
    //host: '10.10.41.3',
    //host: process.env.DATABASE,
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.categoryProduct = require('../DAO/categoryProductDAO')(sequelize, Sequelize);
db.product = require('../DAO/productDAO')(sequelize, Sequelize,Product);
db.shippingType = require('../DAO/shippingTypeDAO')(sequelize, Sequelize,ShippingType);
db.customer = require('../DAO/customerDAO')(sequelize, Sequelize);
db.shop = require('../DAO/shopDAO')(sequelize, Sequelize, Shop);
console.log("database ="+process.env.DATABASE);
//Relations
db.product.belongsTo(db.categoryProduct);


//sync
db.categoryProduct.sync({force: true}).then(() => {
    db.categoryProduct.create({name : "Cat1"});
    db.categoryProduct.create({name : "Cat2"});
    db.categoryProduct.create({name : "Cat3"});
    db.categoryProduct.create({name : "Cat4"});
    db.categoryProduct.create({name : "Cat5"});
    console.log("sync cat product in progress");
});
db.product.sync({force: true}).then(() => {
    console.log("sync product in progress");
});
db.shippingType.sync({force: true}).then(() => {
    console.log("sync shippingtype in progress");
});
db.customer.sync({force: true}).then(() => {
    console.log("sync customer in progress");
});
db.shop.sync({force: true}).then(() => {
    console.log("sync shop in progress");
});


module.exports = db;