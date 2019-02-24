var util = require("util");

class ShopPlaces {

    constructor(id,surface,rent, points){
        this.id = id;
        this.surface = surface;
        this.rent = rent;
        this.points =  points;
    };

    getShopPlaceView() {
        return util.format("<tr><td>"+this.id+"</td><td>"+this.surface+"</td><td>"+this.rent+"</td></tr>")
    };

}
module.exports = ShopPlaces;