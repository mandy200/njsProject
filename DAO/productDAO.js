module.exports = (sequelize, DataTypes, Product) => {
    productModel = sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING
        },
        Description: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT
        },
        barcode: {
            type: DataTypes.STRING
        },
        brand: {
            type: DataTypes.STRING
        },
        colour: {
            type: DataTypes.STRING
        },
        weight: {
            type: DataTypes.FLOAT
        },
        height: {
            type: DataTypes.FLOAT
        },
        width: {
            type: DataTypes.FLOAT
        },
        depth: {
            type: DataTypes.FLOAT
        },
    });
    /*productModel.sync({force: true}).then(() => {
        console.log("sync product in progress");
    });*/
    productModel.getProduct = async function (start, number, callback) {
        this.findAll({offset: start, limit: number}).then(user => {
            callback(null, user);
        }).catch(err => {
            callback(true, err);
        })
    };
    productModel.insert = async function (value, callback) {
        this.create({
            Name: value.name,
            Description: value.desc,
            img: value.img,
            price: value.price,
            barcode: value.barcode,
            brand: value.brand,
            colour: value.colour,
            weight: value.weight(),
            height: value.height(),
            width: value.width(),
            depth: value.depth(),
        }).then(task => {
            task.setCategoryProduct(value.category);
            callback(task);
        });
    };
    productModel.get = async function (value, callback) {
        if (value !== 'undefined') {
            this.findAll({where: {id: value}}).then(product => {
                if(product.length > 0) {
                    var s = new Size(product.weight, product.height, product.width, product.depth);
                    console.log(s);
                    var p = new Product(product.Name, product.Description, product.img, product.price, product.barcode, product.brand, product.colour, s);
                    callback(false, p);
                }else{
                    callback(true, "no matching");
                }
            }).catch(err => {
                callback(true, err);
            });
        } else {
            callback(true, {error: "id is undefined"});
        }
    };

    productModel.searchBrand = async  function (value, callback) {
        if (value !== 'undefined'){
            this.findAll({
                where: {
                    [Op.iLike]: [{brand:value}]
                }});
        }
    };

    productModel.searchName = async  function (value, callback) {
        if (value !== 'undefined'){
            this.findAll({where: {
                    [Op.iLike]: [{name:value}]
                }});
        }
    };

    productModel.searchType = async  function (value, callback) {
        if (value !== 'undefined'){
            this.findAll({where: {
                    [Op.iLike]: [{type:value}]
                }});
        }
    };


    productModel.searchPrice = async function (minValue, maxValue, callback) {
        this.findAll({where: {
                [Op.between]: [{price:minValue}, {price:maxValue}],
            }});
    };

    productModel.searchColour = async  function (value, callback) {
        this.findAll({where: {
                [Op.iLike]: [{colour:value}]
            }});
    };

    productModel.searchTyping = async function (value, callback) {
        if (value !== 'undefined'){
            this.findAll({
                where: {
                    [Op.iLike]: [{brand:value}]
                }});
        }
    }
    return productModel;
};