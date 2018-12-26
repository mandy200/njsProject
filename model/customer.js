var util = require("util");
var sequelize = require('../utils/database.js');
var Sequelize = require('sequelize');

class Customer {
    constructor(firstName,lastName,address,email,phone,login,password,newsletter)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.login = login;
        this.password = password;
        this.newsletter = newsletter;
    }

    /*
    getCustomerView()
    {
        return util.format(this.template,this.firstname,this.lastname,this.email,this.phone);
        this.login = login;
        this.password = password;
        this.newsletter = newsletter;
    }
    */
    getCustomerView()
    {
        return util.format(this.firstName,this.lastName,this.address,this.email,this.phone,this.login,this.password,this.newsletter);
    };

    checkCustomer(newCustomer)
    {
        var pattern = new RegExp(/[~`!#$%\^&@*+=\-\[\]\\;,/{}|\\":<>\?]/);
        var message = "";
        if (isNaN(newCustomer.phone)) {
            message += "error with cellphone | ";
        }
        if (pattern.test(newCustomer.lastName)){
            message += "error with lastname | ";
        }
        if (pattern.test(newCustomer.firstName)){
            message += "error with firstname | ";
        }
        if (pattern.test(newCustomer.address)){
            message += "error with address | ";
        }
        if (newCustomer.email.indexOf("@") == - 1){
            message += "error with email address";
        }
        return message;
    };
}
module.exports = Customer;
