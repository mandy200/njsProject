module.exports = (sequelize, DataTypes, Profile) => {
    const Op = sequelize.Op;
    profileModel = sequelize.define('profile', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ProfileName: {
            type: DataTypes.STRING
        }
    });

    /*profileModele.sync({force: false}).then(() =>{
       console.log("sync profile in progress");
   });*/



    profileModel.get = async function(value,callback) {
        if(value!=='undefined') {
            this.findAll({where: {id: value}}).then(profile => {
                callback(false, new Profile(profile.profileName));
            }).catch(err => {
                callback(true, err);
            });
        }else {
            callback(true,{error:"Profile id is undefined"});
        }
    };
    return profileModel;
}