
var {model} = require("../model/models.js");

var socketListener = {};

socketListener.prototype.connection = new function(io) {
    io.sockets.on('connection', function (socket) {
        console.log("hello");
        socket.on('loadMore', function (value) {
            console.log(value);
            socket.emit('isLoading', 'visible');
            //just for test
            //loading more data
            socket.emit('newObject', model.getProductView("Test", "sdfgkdsbglkzdglfj", "sdfsklqjhfl") + "test");
            socket.emit('isLoading', "hidden");
        });
    });
};
module.exports = socketListener;