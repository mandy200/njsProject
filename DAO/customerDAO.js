module.exports = (sequelize, DataTypes, Customer) => {
    const Op = sequelize.Op;
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
            Birthday: {
                type: DataTypes.DATEONLY
            },
            Gender: {
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
            },
            Position: {
                type: DataTypes.BOOLEAN
            },
            Profile: {
                type: DataTypes.INTEGER
            },
            TotalOrder: {
                type: DataTypes.INTEGER
            }
        });

         /*customerModel.sync({force: false}).then(() =>{
            console.log("sync customer in progress");
        });*/

    customerModel.searchCustomer = async  function (value,callback) {
        console.log('debut requete');
        if (value !== 'undefined'){
            /*this.findAll({
                where: {
                    [Op.or] : {
                        Lastname: {
                            [Op.iLike]: value + "%"
                        },
                        Firstname: {
                            [Op.iLike]: value + "%"
                        },
                        Phone: {
                            [Op.iLike]: value + "%"
                        },
                        Address: {
                            [Op.iLike]: value + "%"
                        },
                        Email: {
                            [Op.iLike]: "%" +value + "%"
                        },
                        Gender: {
                            [Op.iLike]: value + "%"
                        },
                        Login: {
                            [Op.iLike]: value + "%"
                        },
                    }

                }})*/
                sequelize.query("SELECT customers.\"Firstname\", customers.\"Lastname\", customers.\"Birthday\", customers.\"Gender\", customers.\"Address\", customers.\"Email\", customers.\"Phone\", customers.\"Login\", customers.\"Newsletter\", customers.\"Position\", p.\"ProfileName\" AS Profile,\n" +
                "count(orders.\"IdClient\") AS TotalOrder FROM customers LEFT JOIN orders  ON (customers.\"id\" = orders.\"IdClient\"), profiles p where customers.\"Profile\" = p.\"id\" AND ( customers.\"Firstname\" ILIKE '" + value + "%' OR customers.\"Lastname\" ILIKE '" + value + "%' OR customers.\"Phone\" ILIKE '" + value + "%'\n" +
                    " OR customers.\"Address\" ILIKE '" + value + "%' OR customers.\"Email\" ILIKE '%" + value + "%' OR customers.\"Gender\" ILIKE '" + value + "%' OR customers.\"Login\" ILIKE  '" + value + "%' OR p.\"ProfileName\" ILIKE '" + value + "%') group by customers.\"id\", p.\"ProfileName\";", { type: sequelize.QueryTypes.SELECT})

                .then(customer => {
                if(customer.length == 0){
                    callback(true, {error: "No results have been found"});
                }else {
                    //console.log(customer);
                    retour = [];
                    for(i=0;i<customer.length;i++) {
                        var c = new Customer(customer[i].Firstname, customer[i].Lastname, customer[i].Birthday, null, customer[i].Gender, customer[i].Address, customer[i].Email, customer[i].Phone, customer[i].Login, "*****", customer[i].Newsletter, customer[i].Position, customer[i].profile);
                        retour.push(c);
                    }
                    callback(false, retour);
                    }
            });
        }
    };

    customerModel.filterCustomer = async  function (queryReceived,count,callback){
        console.log('debut requete');
        if (queryReceived !== 'undefined' && count !== 'undefined'){
            sequelize.query("SELECT customers.\"Firstname\", customers.\"Lastname\", customers.\"Birthday\", customers.\"Gender\", customers.\"Address\", customers.\"Email\", customers.\"Phone\", customers.\"Login\", customers.\"Newsletter\", customers.\"Position\", p.\"ProfileName\" AS Profile,\n" +
                "count(orders.\"IdClient\") AS TotalOrder FROM customers LEFT JOIN orders  ON (customers.\"id\" = orders.\"IdClient\"), profiles p where customers.\"Profile\" = p.\"id\" " + queryReceived + "group by customers.\"id\", p.\"ProfileName\"" + count + ";", { type: sequelize.QueryTypes.SELECT})
                .then(customer => {
                if(customer.length == 0){
                    callback(true, {error: "No results have been found"});
                }else {
                    //console.log(customer);
                    retour = [];
                    for(i=0;i<customer.length;i++) {
                        var c = new Customer(customer[i].Firstname, customer[i].Lastname, customer[i].Birthday, null, customer[i].Gender, customer[i].Address, customer[i].Email, customer[i].Phone, customer[i].Login, "*****", customer[i].Newsletter, customer[i].Position, customer[i].profile);
                        retour.push(c);
                    }
                    callback(false, retour);
                }
            });
        }
    };











    customerModel.insert = async function(value,callback) {
        this.create({Firstname : value.firstName, Lastname: value.lastName, Birthday: value.birthday, Gender: value.gender,  Address : value.address, Email : value.email, Phone: value.phone, Login : value.login, Password : value.password, Newsletter : value.newsletter, Position : value.position}).then(task => {
            callback(task);
        });
    };

    customerModel.get = async function(value,callback) {
        if(value!=='undefined') {
            this.findAll({where: {id: value}}).then(customer => {
                callback(false, new Customer(customer.firstName, customer.lastName, customer.birthday, customer.gender, customer.Address, customer.email, customer.phone, customer.login, customer.password, customer.newsletter, customer.position));
            }).catch(err => {
                callback(true, err);
            });
        }else {
            callback(true,{error:"Customer id is undefined"});
        }
    };
    return customerModel;
}