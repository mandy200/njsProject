module.exports = (sequelize, DataTypes, Customer) => {
    customerModel = sequelize.define('customer', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            Firstname: {
                type: DataTypes.STRING
            },
            Lastname: {
                type: DataTypes.STRING
            },
            Address: {
                type: DataTypes.STRING
            },
            Email: {
                type: DataTypes.STRING
            },
            Phone: {
                type: DataTypes.STRING
            },
            Login: {
                type: DataTypes.STRING
            },
            Password: {
                type: DataTypes.STRING
            },
            Newsletter: {
                type: DataTypes.BOOLEAN
            }
        });
    /*customerModel.sync({force: false}).then(() =>{
            console.log("sync customer in progress");
        });*/

    customerModel.getCustomer = async function(start,number,callback)
    {
        this.findAll({offset:start,limit:number}).then(user => {
            callback(null,user);
        }).catch(err => {
            callback(true,err);
        })
    };

    customerModel.insert = async function(value,callback) {
        this.create({Firstname : value.firstName, Lastname: value.lastName, Address : value.address, Email : value.email, Phone: value.phone, Login : value.login, Password : value.password, Newsletter : value.newsletter}).then(task => {
            callback(task);
        });
    };

    customerModel.get = async function(value,callback) {
        if(value!=='undefined') {
            this.findAll({where: {id: value}}).then(customer => {
                callback(false, new Customer(customer.firstName, customer.lastName, customer.Address, customer.email, customer.phone, customer.login, customer.password, customer.newsletter));
            }).catch(err => {
                callback(true, err);
            });
        }else {
            callback(true,{error:"Customer id is undefined"});
        }
    };
    return customerModel;
}