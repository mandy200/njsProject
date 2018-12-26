module.exports = (sequelize, DataTypes, Shop) => {
    shopModel = sequelize.define('shop', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING
        }
    });

    shopModel.getShop = async function(start,number,callback)
    {
        this.findAll({offset:start,limit:number}).then(user => {
            callback(null,user);
        }).catch(err => {
            callback(true,err);
        })
    };

    shopModel.insert = async function(value,callback) {
        this.create({ Name: value.name}).then(task => {
            callback(task);
        });
    };

    shopModel.get = async function(value,callback) {
        if(value!=='undefined') {
            this.findAll({where: {id: value}}).then(shop => {
                callback(false, new Shop(shop.Name));
            }).catch(err => {
                callback(true, err);
            });
        }else {
            callback(true,{error:"Shop id is undefined"});
        }
    };
    return shopModel;
}