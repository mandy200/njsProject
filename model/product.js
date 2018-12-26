var util = require("util");

class Product {
    constructor(name,desc,img,price,barcode,brand,colour,size,category)
    {
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.price = price;
        this.barcode = barcode;
        this.brand = brand;
        this.colour = colour;
        this.size = size;
        this.category = category;
        /*this.template = "<div class=\"card col-sm\" style=\"width: 18rem;\">\n" +
            "  <img class=\"card-img-top\" src=\"%s\" alt=\"Card image cap\">\n" +
            "  <div class=\"card-body\">\n" +
            "    <h5 class=\"card-title\">%s</h5>\n" +
            "    <p class=\"card-text\">%s</p>\n" +
            "    <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\n" +
            "  </div>\n" +
            "</div>";*/
        this.template = "<div class=\"col-xl-4 col-sm-6\">\n" +
            "              <div class=\"product\">\n" +
            "                <div class=    \"product-image\"><img src=\"%s\" alt=\"product\" class=\"img-fluid\"/>\n" +
            "                  <div class=\"product-hover-overlay\"><a href=\"detail.html\" class=\"product-hover-overlay-link\"></a>\n" +
            "                    <div class=\"product-hover-overlay-buttons\"><a href=\"#\" class=\"btn btn-outline-dark btn-product-left\">\n" +
            "<i class=\"fa fa-shopping-cart\"></i></a><a href=\"detail.html\" class=\"btn btn-dark btn-buy\">\n" +
            "<i class=\"fa-search fa\"></i><span class=\"btn-buy-label ml-2\">View</span></a>\n" +
            "<a href=\"#\" data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-outline-dark btn-product-right\">\n" +
            "<i class=\"fa fa-expand-arrows-alt\"></i></a>\n" +
            "                    </div>\n" +
            "                  </div>\n" +
            "                </div>\n" +
            "                <div class=\"py-2\">\n" +
            "                  <p class=\"text-muted text-sm mb-1\">%s</p>\n" +
            "                  <h3 class=\"h6 text-uppercase mb-1\"><a href=\"detail.html\" class=\"text-dark\">%s</a></h3><span class=\"text-muted\">%s</span>\n" +
            "                </div>\n" +
            "              </div>\n" +
            "            </div>";
    }
    getProductView()
    {
        return util.format(this.template,this.img,this.name,this.desc,this.price, this.brand, this.colour);
    };

    weight() { return this.size.weight; }
    height() { return this.size.height; }
    width() { return this.size.width; }
    depth() { return this.size.depth; }
    check() {
        var regexNumber = new RegExp("[0-9]");
        var regexLetter = new RegExp("[a-zA-Z]");
        //if size is OK we can resume
        if(this.size.check())
        {
            //
            if(regexNumber.test(this.name) || regexLetter.test(this.price) || regexLetter.test(this.barcode) || regexNumber.test(this.colour) || regexNumber.test(this.brand))
                return false;
            else
                return true;
        }else
            return false;
    }
}
module.exports = Product;
