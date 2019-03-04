const Sequelize = require('sequelize');
const Liste = require ("./DataList");
const {Product,ShippingType,Shop,Customer, Order, Profile,ShopPlaces,Tags, Path} = require('../model/models');
const sequelize = new Sequelize('nodejs', 'nodejs', 'nodejs', {
    //host: 'localhost',
    //host: '10.10.41.3',
    host: process.env.DATABASE,
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
db.churnRate = require('../DAO/ChurnRateDAO')(sequelize, Sequelize);
db.categoryProduct = require('../DAO/categoryProductDAO')(sequelize, Sequelize);
db.product = require('../DAO/productDAO')(sequelize, Sequelize,Product);
db.shippingType = require('../DAO/shippingDAO')(sequelize, Sequelize,ShippingType);
db.order = require('../DAO/orderDAO')(sequelize,Sequelize, Order);
db.customer = require('../DAO/customerDAO')(sequelize, Sequelize, Customer,db.order);
db.places = require('../DAO/placeDAO')(sequelize,Sequelize);
db.shop = require('../DAO/shopDAO')(sequelize, Sequelize, Shop);
db.shopPlaces = require('../DAO/shopPlacesDAO')(sequelize, Sequelize,db.places,ShopPlaces);
db.profile = require('../DAO/profileDAO')(sequelize, Sequelize, Profile);
db.tags = require('../DAO/tagDAO')(sequelize,Sequelize);
db.notification = require('../DAO/notificationDAO')(sequelize,Sequelize);
db.textNotification = require('../DAO/TextNotificationDAO')(sequelize,Sequelize);
db.order = require('../DAO/orderDAO')(sequelize,Sequelize, Order);
db.path = require('../DAO/pathDAO')(sequelize, Sequelize, Path);
db.basket = require('../DAO/basketDAO')(sequelize, Sequelize, Path);
console.log("database ="+process.env.DATABASE);
//Relations
db.product.belongsTo(db.categoryProduct);
db.shop.belongsTo(db.shopPlaces);
db.places.belongsTo(db.shopPlaces);
db.notification.belongsTo(db.textNotification);
db.notification.belongsTo(db.customer);
//db.notification.belongsTo(db.path);




//sync
var force = true;
db.categoryProduct.sync({force: force}).then(() => {
    if(force) {
        db.categoryProduct.create({name: "Cat1"});
        db.categoryProduct.create({name: "Cat2"});
        db.categoryProduct.create({name: "Cat3"});
        db.categoryProduct.create({name: "Cat4"});
        db.categoryProduct.create({name: "Cat5"});
        console.log("sync cat product in progress");
        db.product.sync({force: force}).then(() => {
            if(force) {
                createProduct();
                createCustomers();
                console.log("sync product in progress");
            }
        });
    }
});

db.shippingType.sync({force: force}).then(() => {
    if(force) {
        db.shippingType.create({Name: "relais", Price: 10, Distance: 100});
        db.shippingType.create({Name: "Express_domicile", Price: 10, Distance: 100});
        db.shippingType.create({Name: "Standard Domicile", Price: 10, Distance: 100});
        db.shippingType.create({Name: "Borne", Price: 10, Distance: 100});
        console.log("sync shippingtype in progress");
    }
});
createCustomers = function() {
    db.customer.sync({force: force}).then(() => {
        if (force) {
            for(var i = 0 ; i<500; i++) {
                db.customer.create({
                    Firstname: chooseRandFromList(Liste.listeCustomers).Firstname,
                    Lastname: chooseRandFromList(Liste.listeCustomers).Lastname,
                    Birthday: chooseRandFromList(Liste.listeCustomers).Birthday,
                    Gender: chooseRandFromList(Liste.listeCustomers).Gender,
                    Address: chooseRandFromList(Liste.listeCustomers).Address,
                    Email: chooseRandFromList(Liste.listeCustomers).Email,
                    Phone: chooseRandFromList(Liste.listeCustomers).Phone,
                    Login: chooseRandFromList(Liste.listeCustomers).Login,
                    Newsletter: chooseRandFromList(Liste.listeCustomers).Newsletter,
                    Position: true,
                    Profile: 1
                });
            }
            console.log("sync customer in progress");
        }
    });
}
db.profile.sync({force: force}).then(() => {
    if(force) {
        db.profile.create({ProfileName: "sport"});
        db.profile.create({ProfileName: "cooking"});
        db.profile.create({ProfileName: "high tech"});
        db.profile.create({ProfileName: "culture"});
        db.profile.create({ProfileName: "DIY"});
        console.log("sync profile in progress");
    }
});
db.textNotification.sync({force:force}).then(() => {
    db.notification.sync({force:force});
});

db.shopPlaces.sync({force: force}).then(() => {
    if(force) {
        db.shopPlaces.create({Surface: 100, Rent: 1000});
        db.shopPlaces.create({Surface: 120, Rent: 1200});
        db.shopPlaces.create({Surface: 150, Rent: 1500});
        db.shopPlaces.create({Surface: 180, Rent: 1800});
        db.shopPlaces.create({Surface: 180, Rent: 1800});
        db.shopPlaces.create({Surface: 180, Rent: 1800});
        db.places.sync({force: force}).then(() => {
            if(force) {
                db.places.create({x: 10, y: 10, number:1,shopPlaceId: 1});
                db.places.create({x: 100, y: 10, number:2,shopPlaceId: 1});
                db.places.create({x: 100, y: 100, number:3,shopPlaceId: 1});
                db.places.create({x: 10, y: 100, number:4,shopPlaceId: 1});
                db.places.create({x: 10, y: 100, number:1,shopPlaceId: 2});
                db.places.create({x: 10, y: 200, number:2,shopPlaceId: 2});
                db.places.create({x: 100, y: 200, number:3,shopPlaceId: 2});
                db.places.create({x: 100, y: 100, number:4,shopPlaceId: 2});
                db.places.create({x: 150, y: 10, number:1,shopPlaceId: 3});
                db.places.create({x: 150, y: 60, number:2,shopPlaceId: 3});
                db.places.create({x: 170, y: 90, number:3,shopPlaceId: 3});
                db.places.create({x: 260, y: 90, number:4,shopPlaceId: 3});
                db.places.create({x: 280, y: 60, number:5,shopPlaceId: 3});
                db.places.create({x: 280, y: 10, number:6,shopPlaceId: 3});
                db.places.create({x: 150, y: 200, number:1,shopPlaceId: 4});
                db.places.create({x: 280, y: 200, number:2,shopPlaceId: 4});
                db.places.create({x: 280, y: 140, number:3,shopPlaceId: 4});
                db.places.create({x: 260, y: 120, number:4,shopPlaceId: 4});
                db.places.create({x: 170, y: 120, number:5,shopPlaceId: 4});
                db.places.create({x: 150, y: 140, number:6,shopPlaceId: 4});
                db.places.create({x: 150, y: 200, number:1,shopPlaceId: 5});
                db.places.create({x: 150, y: 310, number:2,shopPlaceId: 5});
                db.places.create({x: 170, y: 340, number:3,shopPlaceId: 5});
                db.places.create({x: 260, y: 340, number:4,shopPlaceId: 5});
                db.places.create({x: 280, y: 310, number:5,shopPlaceId: 5});
                db.places.create({x: 280, y: 200, number:6,shopPlaceId: 5});
            }
        });
        db.shop.belongsTo(db.shopPlaces);
        db.places.belongsTo(db.shopPlaces);

        db.shop.sync({force: force}).then(() => {
            if(force) {
                db.shop.create({Name: "Quick",shopPlaceId : 5,Logo : "Logo_2015_Quick.png"});
                db.shop.create({Name: "GoSport",shopPlaceId : 2,Logo : "logo-go-sport.png"});
                db.shop.create({Name: "Zara",shopPlaceId : 3,Logo : "zara.png"});
                db.shop.create({Name: "Fnac",shopPlaceId : 4,Logo : "Fnac_Logo.png"});
                db.shop.create({Name: "Bonjour",shopPlaceId : 5,Logo : ""});
                db.shop.create({Name: "JouetClub",Logo : "jouetclub.jpg"});
                console.log("sync shop in progress");
            }
        });
        console.log("sync shopPlaces in progress");

    }
});

db.tags.sync({force:force}).then(() => {
    Liste.listeTags.forEach((object) => {
        db.tags.create(object);
    })


});
chooseRandFromList = function(list) {
    return list[Math.floor((Math.random()*list.length))];
}
get1or2idFromObject = function(list) {
    var number = Math.round((Math.random())+1);
    var retour = "";
    for(var i = 0 ; i<number ;i++){
        var obj = chooseRandFromList(list);
        if(i==number-1){
            retour+=""+obj.id+"";
        }else{
            retour+=""+obj.id+",";
        }
    }
    return retour;
}
createOrder = function() {
    db.order.sync({force: force}).then(() => {
        if (force) {
            for (var i = 1; i <= 500; i++) {
                db.order.create({
                    BillingAddress: "Addresse fictive",
                    ShippingAddress: "Addresse Fictive",
                    Status: "Livre",
                    DateStatus: "Date Fictive",
                    IdClient: (i) % 40,
                    productId: (i+1)%500
                });
            }
        }
    });
}
createProduct = function() {
    for(var i=0;i<500;i++) {
        db.product.create({
            Name: "Article"+i,
            Description: "This is one of our first products",
            img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
            price: "1"+i*5,
            barcode: "0018765412398",
            brand: "StillTestBrand",
            colour: "Gray",
            weight: "0.4",
            height: "1.0",
            width: "5.6",
            depth: "3.5",
            tags:get1or2idFromObject(Liste.listeTags),
            categoryProductId: "4",
            shop: "GameStore"+i
        }).then((res)=>{
            if(res.dataValues.id == 500)
            {
                createOrder();
            }
        });
    }
}


module.exports = db;