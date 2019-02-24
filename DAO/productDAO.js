module.exports = (sequelize, DataTypes, Product) => {
    const Op = sequelize.Op
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
        this.findAll({ offset: start, limit: number }).then(user => {
            callback(null, user);
        }).catch(err => {
            callback(true, err);
        })
    };
    productModel.insert = async function (value, callback) {
        this.create({
            Name: value.name.toUpperCase(),
            Description: value.desc,
            img: value.img,
            price: value.price,
            barcode: value.barcode,
            brand: value.brand.toUpperCase(),
            colour: value.colour.toUpperCase(),
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
            this.findAll({ where: { id: value } }).then(product => {
                if (product.length > 0) {
                    var s = new Size(product.weight, product.height, product.width, product.depth);
                    //console.log(s);
                    var p = new Product(product.Name, product.Description, product.img, product.price, product.barcode, product.brand, product.colour, s);
                    callback(false, p);
                } else {
                    callback(true, "no matching");
                }
            }).catch(err => {
                callback(true, err);
            });
        } else {
            callback(true, { error: "id is undefined" });
        }
    };


    /* Product Search */
    productModel.searchBrand = async function (value, callback) {
        if (value !== 'undefined') {
            this.findAll({
                where: {
                    brand: { [Op.iLike]:  value }
                }
            })
                .then((record) => callback(false, record))
                .catch((err) => callback(true, err));
        }
    };

    productModel.searchName = async function (value, callback) {
        console.log("value ", value)
        if (value !== 'undefined') {
            this.findAll({
                where: {
                    Name: { [Op.iLike]: '%' + value + '%' }


                }
            }).then((record) => callback(false, record))
                .catch((err) => callback(true, err));
        }
    };
    productModel.searchCat = async function (value, callback) {
        if (value !== 'undefined') {
            this.findAll({
                where: {
                    categoryProductId: value

                }
            })
                .then((record) => callback(false, record))
                .catch((err) => callback(true, err));
        }
    };

    productModel.searchType = async function (value, callback) {
        if (value !== 'undefined') {
            this.findAll({
                where: {
                    [Op.iLike]: [{ type: value }]
                }
            });
        }
    };

    productModel.searchMinPrice = async function (minValue, callback) {
        this.findAll({
            where: {
                price: { [Op.lt]: minValue }
            }
        }).then((record) => callback(false, record))
            .catch((err) => callback(true, err));
    };
    productModel.searchMoreMinPrice = async function (minValue, callback) {
        this.findAll({
            where: {
                price: { [Op.gt]: minValue }
            }
        }).then((record) => callback(false, record))
            .catch((err) => callback(true, err));
    };

    productModel.searchMaxPrice = async function (maxValue, callback) {
        this.findAll({
            where: {

                price: { [Op.lt] : maxValue }
            }
        }).then((record) => callback(false, record))
            .catch((err) => callback(true, err));
    };

    productModel.searchByMoreMaxPrice = async function (maxValue, callback) {
        this.findAll({
            where: {

                price: { [Op.gt]: maxValue }
            }
        }).then((record) => callback(false, record))
            .catch((err) => callback(true, err));
    };
    productModel.searchColour = async function (value, callback) {
        this.findAll({
            where: {
                colour: value
            }
        }).then((record) => callback(false, record))
            .catch((err) => callback(true, err));
    };
    productModel.searchComplex = async function (brand, maxPr, callback) {
        this.findAll({
            where: {
                brand: brand,
                price: maxPr
            }
        }).then((record) => callback(false, record))
            .catch((err) => callback(true, err));
    };
    productModel.searchAllBrands = async function (callback) {
        this.findAll({ attributes: ['brand'] })
            .then((record) => callback(false, record))
            .catch((err) => callback(true, err));
    };

    productModel.searchTyping = async function (value, callback) {
        if (value !== 'undefined') {
            this.findAll({
                where: {
                    [Op.iLike]: [{ brand: value }]
                }
            });
        }
    }
    return productModel;
};