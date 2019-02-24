module.exports = (sequelize, DataTypes, Shop) => {

    const Op = sequelize.Op;

    shopModel = sequelize.define('shop', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING
        },
        Logo:{
            type:DataTypes.STRING
        }

    });
    //Search by Id
    shopModel.searchShopId = async function (value, callback) {
        return this.findAll({
            where:
                {id: value}
        }).then(shop => {
            callback(null, shop);
        }).catch(err => {
            callback(true, err);
        });
    };


    shopModel.searchAllShopWithoutShopPlace = async function (callback) {
        return this.findAll({
            where:{
                shopPlaceId : {
                    [Op.eq] : null
                }
            }
        }).then(shop => {
            callback(false, shop);
        }).catch(err => {
            callback(true, err);
        });
    };

    shopModel.searchAllShopWithShopPlace = async function (callback) {
        var objjson = {};
        var counter = 0;
        return this.findAll({
            where:{
                shopPlaceId : {
                    [Op.ne] : null
                }
            }
        }).then((result) => {
            result.forEach((data) => {
                objjson[counter] = data.toJSON();
                counter+=1;

            });
            callback(false,objjson);
            }).catch(err => {
            callback(true, err);
        });
    };


    shopModel.searchByPlaceId = async function (value, callback) {
        return this.findAll({
            attributes: ['Name','Logo'],
            where:
                {shopPlaceId: value}
        }).then(shop => {
            callback(null, shop);
        }).catch(err => {
            callback(true, err);
        });
    };

    //Search by Name
    shopModel.searchShopName = async function (value, callback) {
        return this.findAll({
            where:
                {Name: value}
        }).then(shop => {
            callback(null, shop);
        }).catch(err => {
            callback(true, err);
        });
    };


    shopModel.getShop = async function(start,number,callback)
    {
        this.findAll({offset:start,limit:number}).then(user => {
            callback(null,user);
        }).catch(err => {
            callback(true,err);
        })
    };


    shopModel.insert = async function(value) {
        this.create(
            { Name: value.name}
        );
    };

    shopModel.deleteShopPlaceId = async function(value) {
        this.findOne({
            where:
                {id: value.id}
        })
            .then(shop => {
                shop.update({
                    shopPlaceId: null
                });
            });
    };


    /*
    shopModel.get = async function(value,callback) {
        if(value!=='undefined') {
            this.findAll({where: {Name: value}}).then(shop => {
                callback(false, new Shop(Shop.Name));
            }).catch(err => {
                callback(true, err);
            });
        }else {
            callback(true,{error:"Shop Name is undefined"});
        }
    };
*/

    return shopModel;
}