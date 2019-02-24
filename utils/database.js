const Sequelize = require('sequelize');
const {Product,ShippingType,Shop,Customer, Order, Profile,ShopPlaces} = require('../model/models');
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
db.categoryProduct = require('../DAO/categoryProductDAO')(sequelize, Sequelize);
db.product = require('../DAO/productDAO')(sequelize, Sequelize,Product);
db.shippingType = require('../DAO/shippingDAO')(sequelize, Sequelize,ShippingType);
db.customer = require('../DAO/customerDAO')(sequelize, Sequelize, Customer);
db.places = require('../DAO/placeDAO')(sequelize,Sequelize);
db.shop = require('../DAO/shopDAO')(sequelize, Sequelize, Shop);
db.shopPlaces = require('../DAO/shopPlacesDAO')(sequelize, Sequelize,db.places,ShopPlaces);
db.profile = require('../DAO/profileDAO')(sequelize, Sequelize, Profile);
db.order = require('../DAO/orderDAO')(sequelize,Sequelize, Order);
console.log("database ="+process.env.DATABASE);
//Relations
db.product.belongsTo(db.categoryProduct);
db.shop.belongsTo(db.shopPlaces);
db.places.belongsTo(db.shopPlaces);




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
                db.product.create({
                    Name: "P1",
                    Description: "This is our very first product",
                    img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
                    price: "10.0",
                    barcode: "1234567891234",
                    brand: "Test_Brand",
                    colour: "White",
                    weight: "5.0",
                    height: "1.0",
                    width: "1.0",
                    depth: "1.0",
                    categoryProductId: "1"
                });
                db.product.create({
                    Name: "P2",
                    Description: "This is our second product",
                    img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
                    price: "15.5",
                    barcode: "8765567891234",
                    brand: "Test_Brand",
                    colour: "Brown",
                    weight: "1.2",
                    height: "1.0",
                    width: "2.0",
                    depth: "1.0",
                    categoryProductId: "2"
                });
                db.product.create({
                    Name: "P3",
                    Description: "This is one of our first products",
                    img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
                    price: "12.5",
                    barcode: "8765567823098",
                    brand: "SomeBrand",
                    colour: "Black",
                    weight: "2.0",
                    height: "1.0",
                    width: "1.4",
                    depth: "1.0",
                    categoryProductId: "3"
                });
                db.product.create({
                    Name: "Product",
                    Description: "This is one of our first products",
                    img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
                    price: "5.5",
                    barcode: "8765555523098",
                    brand: "aBrand",
                    colour: "Blue",
                    weight: "0.5",
                    height: "1.0",
                    width: "1.0",
                    depth: "0.5",
                    categoryProductId: "1"
                });
                db.product.create({
                    Name: "Article",
                    Description: "This is one of our first products",
                    img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
                    price: "199.5",
                    barcode: "3335555523098",
                    brand: "aBrand",
                    colour: "Green",
                    weight: "0.5",
                    height: "1.0",
                    width: "1.0",
                    depth: "0.5",
                    categoryProductId: "4"
                });
                db.product.create({
                    Name: "Article_Red",
                    Description: "This is one of our first products",
                    img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
                    price: "19.5",
                    barcode: "3335855523098",
                    brand: "ThisBrand",
                    colour: "Red",
                    weight: "0.5",
                    height: "1.0",
                    width: "1.9",
                    depth: "0.5",
                    categoryProductId: "5"
                });
                db.product.create({
                    Name: "Article_Purple",
                    Description: "This is one of our first products",
                    img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
                    price: "99.5",
                    barcode: "3335599523098",
                    brand: "ThisBrand",
                    colour: "Purple",
                    weight: "0.2",
                    height: "1.0",
                    width: "1.0",
                    depth: "1.5",
                    categoryProductId: "2"
                });
                db.product.create({
                    Name: "ArticleOrch",
                    Description: "This is one of our first products",
                    img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
                    price: "19.95",
                    barcode: "3336675423098",
                    brand: "SomeBrand",
                    colour: "Orchid",
                    weight: "0.3",
                    height: "1.0",
                    width: "1.7",
                    depth: "0.5",
                    categoryProductId: "2"
                });
                db.product.create({
                    Name: "ArticleGold",
                    Description: "This is one of our first products",
                    img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
                    price: "199.5",
                    barcode: "3213315523098",
                    brand: "Test_Brand",
                    colour: "Gold",
                    weight: "0.5",
                    height: "1.0",
                    width: "3.0",
                    depth: "0.5",
                    categoryProductId: "5"
                });
                db.product.create({
                    Name: "ArticleOrange",
                    Description: "This is one of our first products",
                    img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
                    price: "200.5",
                    barcode: "3335555512398",
                    brand: "StillTestBrand",
                    colour: "Orange",
                    weight: "0.4",
                    height: "1.0",
                    width: "5.6",
                    depth: "3.5",
                    categoryProductId: "3"
                });
                db.product.create({
                    Name: "ArticleGray",
                    Description: "This is one of our first products",
                    img: "https://www.nintendo.com/switch/assets/images/switch/home/pane1.jpg",
                    price: "10.51",
                    barcode: "0018765412398",
                    brand: "StillTestBrand",
                    colour: "Gray",
                    weight: "0.4",
                    height: "1.0",
                    width: "5.6",
                    depth: "3.5",
                    categoryProductId: "4"
                });
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
db.customer.sync({force: force}).then(() => {
    if(force) {
        db.customer.create({
            Firstname: "Alain",
            Lastname: "Terieur",
            Birthday: "1965-07-12",
            Gender: "male",
            Address: "Esipe Creteil",
            Email: "alainterieur@gmail.com",
            Phone: "0102030405",
            Login: "login",
            Newsletter: true,
            Position: true,
            Profile: 1
        });
        db.customer.create({
            Firstname: "Otto",
            Lastname: "Graf",
            Birthday: "1996-07-12",
            Gender: "male",
            Address: "Esipe Creteil",
            Email: "ottograf@gmail.com",
            Phone: "0102030405",
            Login: "login",
            Newsletter: false,
            Position: true,
            Profile: 1
        });
        db.customer.create({
            Firstname: "Dino",
            Lastname: "Zaure",
            Birthday: "1990-07-12",
            Gender: "male",
            Address: "Esipe Creteil",
            Email: "dinozaure@gmail.com",
            Phone: "0102030405",
            Login: "login",
            Newsletter: true,
            Position: true,
            Profile: 2
        });
        db.customer.create({
            Firstname: "Guy",
            Lastname: "Tar",
            Birthday: "1950-07-12",
            Gender: "male",
            Address: "Esipe Creteil",
            Email: "guytar@gmail.com",
            Phone: "0102030405",
            Login: "login",
            Newsletter: true,
            Position: true,
            Profile: 2
        });
        db.customer.create({
            Firstname: "Eva",
            Lastname: "Poree",
            Birthday: "2000-07-12",
            Gender: "female",
            Address: "Esipe Creteil",
            Email: "evaporee@gmail.com",
            Phone: "0102030405",
            Login: "login",
            Newsletter: false,
            Position: false,
            Profile: 3
        });
        db.customer.create({
            Firstname: "Emma",
            Lastname: "Carena",
            Birthday: "1977-07-12",
            Gender: "female",
            Address: "Esipe Creteil",
            Email: "laratatouille@gmail.com",
            Phone: "0102030405",
            Login: "login",
            Newsletter: true,
            Position: false,
            Profile: 3
        });
        db.customer.create({
            Firstname: "Marie",
            Lastname: "Viere",
            Birthday: "1984-07-12",
            Gender: "female",
            Address: "Esipe Creteil",
            Email: "marieviere@gmail.com",
            Phone: "0102030405",
            Login: "login",
            Newsletter: true,
            Position: false,
            Profile: 4
        });
        db.customer.create({
            Firstname: "Daisy",
            Lastname: "Rable",
            Birthday: "1984-07-12",
            Gender: "female",
            Address: "Esipe Creteil",
            Email: "daisyrable@gmail.com",
            Phone: "0102030405",
            Login: "login",
            Newsletter: false,
            Position: false,
            Profile: 4
        });
        db.customer.create({
            Firstname: "Annie",
            Lastname: "Versaire",
            Birthday: "1997-07-12",
            Gender: "female",
            Address: "Esipe Creteil",
            Email: "annieversaire@gmail.com",
            Phone: "0102030405",
            Login: "login",
            Newsletter: true,
            Position: false,
            Profile: 4
        });
        console.log("sync customer in progress");
    }
});

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

db.order.sync({force: force}).then(() => {
    if(force) {
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 1
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 1
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 1
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 1
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 1
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 1
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 1
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 2
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 2
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 2
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 2
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 2
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 2
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 3
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 3
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 4
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 5
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 5
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 6
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 6
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 7
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 7
        });
        db.order.create({
            BillingAddress: "Addresse fictive",
            ShippingAddress: "Addresse Fictive",
            Status: "Livre",
            DateStatus: "Date Fictive",
            IdClient: 7
        });
        console.log("sync order in progress");
    }
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
                db.places.create({x: 170, y: 100, number:3,shopPlaceId: 3});
                db.places.create({x: 260, y: 100, number:4,shopPlaceId: 3});
                db.places.create({x: 280, y: 60, number:5,shopPlaceId: 3});
                db.places.create({x: 280, y: 10, number:6,shopPlaceId: 3});
                db.places.create({x: 150, y: 200, number:1,shopPlaceId: 4});
                db.places.create({x: 280, y: 200, number:2,shopPlaceId: 4});
                db.places.create({x: 280, y: 140, number:3,shopPlaceId: 4});
                db.places.create({x: 260, y: 120, number:4,shopPlaceId: 4});
                db.places.create({x: 170, y: 120, number:5,shopPlaceId: 4});
                db.places.create({x: 150, y: 140, number:6,shopPlaceId: 4});
                db.places.create({x: 150, y: 250, number:1,shopPlaceId: 5});
                db.places.create({x: 150, y: 310, number:2,shopPlaceId: 5});
                db.places.create({x: 170, y: 350, number:3,shopPlaceId: 5});
                db.places.create({x: 260, y: 350, number:4,shopPlaceId: 5});
                db.places.create({x: 280, y: 310, number:5,shopPlaceId: 5});
                db.places.create({x: 280, y: 250, number:6,shopPlaceId: 5});
            }
        });
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




module.exports = db;