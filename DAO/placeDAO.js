module.exports = (sequelize, DataTypes) => {
    placeModel = sequelize.define('place', {
        x: {
            type: DataTypes.INTEGER
        },
        y: {
            type: DataTypes.INTEGER
        },
        number: {
            type: DataTypes.INTEGER
        }
    });


    //Search by Id of the location
    placeModel.searchPlacesId = async function(value, callback) {
        this.findAll({where:
                {shopPlaceId:value},
            order : ['number']
        }).then((res) => {
            callback(res);
        }).catch((err) => {
            console.log(err);
        });
    }
    return placeModel;
}