var util = require("util");

class Shop {
    constructor(id,name,rent,surface)
    {
        this.id = id;
        this.name = name;
        this.rent = rent;
        this.surface = surface;
    }

    getShopView() {
        return util.format("<tr><td>"+this.id+"</td><td>"+this.name+"</td></tr>")
    };

    getShopCompleteView() {
        return util.format("<tr><td>"+this.id+"</td><td>"+this.name+"</td><td>"+this.rent+"</td><td>"+this.surface+"</td><td><a href=\'./create/dissociate?shopId="+arguments[0]+"\'>Dissociate</a></td></tr>")
    };


    getShopName(){
        return this.name;
    };

    check() {

        var regexNumber = new RegExp("^[a-zA-Z0-9]{3,20}$"); //The name'shop must be greater than 3 letters
        //if size is OK we can resume
        if(this.name!==undefined){
            if(regexNumber.test(this.name)){
                console.log("c ok");
                return true;

            }
            else{
                console.log("c pas ok");

                return false;
            }
        }
    }

}
module.exports = Shop;
