var util = require("util");

class Shop {
    constructor(name)
    {
        this.name = name;
    }
    getShopView()
    {
        return util.format(this.name);
    };

    check() {

        var regexNumber = new RegExp("^[a-z0-9]{3,20}$");
        //if size is OK we can resume
        if(this.name!==undefined){
            if(regexNumber.test(this.name))
                return true;
            else
                return false;
        }
    }


}
module.exports = Shop;
