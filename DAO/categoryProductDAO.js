module.exports = (sequelize, DataTypes) => {
    categoryProductDAO = sequelize.define('categoryProduct', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        }
    });
    categoryProductDAO.getALL = async function(callback) {
        this.findAll().then(user => {
            callback(null, user);
        }).catch(err => {
            callback(true, err);
        })
    };
    /*categoryProductDAO.sync({force: true}).then(() => {
        console.log("sync category product in progress");
    });*/
    return categoryProductDAO;
};