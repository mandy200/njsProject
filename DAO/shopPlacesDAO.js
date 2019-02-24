module.exports = (sequelize, DataTypes,place,ShopPlaces) => {

    var Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    shopPlacesModel = sequelize.define('shopPlaces', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Surface: {
            type: DataTypes.INTEGER
        },
        Rent: {
            type: DataTypes.DOUBLE
        }

    });

    shopPlacesModel.searchAllShopPlacesWithoutShop = async function(tabobj, callback) {
        var tabobjres = {};
        var counter = 0;
        var selectionList = []
        for (var objjson in tabobj) {
            selectionList.push(tabobj[objjson]['shopPlaceId']);
        }
        this.findAll({
            where:
                { id : { [Op.notIn] :selectionList} }
        }).then((result) => {
            result.forEach((data) => {
                tabobjres[counter] = data.toJSON();
                counter+=1;
            });
            callback(false,tabobjres);
        }).catch(err => {
            callback(true, err);
        });
    };

    //Search by Id of the location
    shopPlacesModel.searchShopPlacesId = async function(value, callback) {
        console.log("search places")
        this.findAll({where:
                {id:value}
            }).then((result) => {
                //creation de l'objet
                //console.log("search places points");
                //console.log(result);
                var shopPlaces = null;
                result.forEach((data) => {
                    shopPlaces = new ShopPlaces(data.id,data.Surface,data.Rent,[]);
                });
               //recuperation de l'emplacement
                if(shopPlaces!=null) {
                    place.searchPlacesId(value, function (res) {
                        res.forEach((rown) => {
                            //console.log(rown);
                            let point = {x: rown.x, y: rown.y};
                            shopPlaces.points.push(point);
                        });
                        callback(false, shopPlaces);
                    });
                }else {
                    console.log("erreur");
                }

        }).catch((err) => {
            callback(true,err);
        });
    };

    //return an json object with value of shopPlacesModel in it
    //take in argument a tab of json objects which contain a 'shopPlaceId' to made a restriction
    shopPlacesModel.searchShopInformationById = async function(tabobj,callback) {
        var tabobjres = {};
        var counter = 0;
        var selectionList = []
        for (var objjson in tabobj) {
            selectionList.push(tabobj[objjson]['shopPlaceId']);
        }
        this.findAll({
            where:
                { id : selectionList}
        }).then((result) => {
            result.forEach((data) => {
                tabobjres[counter] = data.toJSON();
                counter+=1;
            });
            callback(false,tabobjres);
        }).catch(err => {
            callback(true, err);
        });
    };

    shopPlacesModel.getNumber = async function(callback) {
        this.findAndCountAll().then(result => {
            callback(false,result.count);
        }).catch(result => {
            callback(true,result);
        })
    }


    //Search by surface (m2)
    shopPlacesModel.searchShopPlacesSurface = async function(value, callback) {
        this.findAll({where:
                {Surface:value}
            });
    }


    //Search by rent
    shopPlacesModel.searchShopPlacesRent = async function(value, callback) {
        this.findAll({where:
                {Rent:value}
            });
    }

    shopPlacesModel.insert = async function(value) {
        this.create(
            {
                Rent: value.rent,
                Surface: value.surface
            }
        );
    };

    return shopPlacesModel;

}
