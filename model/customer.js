var util = require("util");

class Customer {
    constructor(firstName,lastName,birthday,age,gender,address,email,phone,login,password,newsletter,position, profile, totalOrder)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.login = login;
        this.password = password;
        this.newsletter = newsletter;
        this.position = position;
        this.profile = profile;
        this.totalOrder = totalOrder;
        //this.template = "<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><tr>"

    }




    getCustomerView()
    {
        this.age =  this.calculateAge();
        console.log(this.age);
        var s=util.format(this.firstName, this.lastName,this.birthday, this.calculateAge(), this.gender,this.address,this.email,this.phone,this.login,this.password,this.newsletter,this.position, this.profile, this.totalOrder);
        return s;
    };


    static check(newCustomer)
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
        if (newCustomer.email.indexOf('@') === - 1){
            message += "error with email address";
        }
        return message;
    };
    static checkingSearch(value){
        var pattern = new RegExp(/[!*#$%^&()/\~+-,.?":{}|<>]/);

        if (value === '' || !pattern.test(value)){
            return true;
        }else{
            return false;
        }
    };

}
module.exports = Customer;
