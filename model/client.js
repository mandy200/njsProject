var util = require("util");

class Client {
    constructor(name,pseudo,email) {
        this.name = name;
        this.pseudo = pseudo;
        this.email= email;
    };
    static getClient(email)
    {
        return new Client("test","ackin","test@gmail.com");
    };
    async insert(values)
    {
        database.execQuery("INSERT INTO client values()",values,function(err,res) {
            if(!err)
            {
                console.log(res);
            }else {
                console.log(err);
            }
        })
    }
};
module.exports = Client;