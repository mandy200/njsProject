var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var sio = require('socket.io');
var debug = require('debug')('pds:server');
var {ProductDAO, CustomerDAO, ShopDAO} = require('./DAO/DAOs.js');
var {Product, Customer, Shop} = require('./model/models');

var bodyParser = require('body-parser');

//let session = require('express-session');
var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');
var shopsRouter = require('./routes/shops');
var productRouter = require('./routes/products');

var app = express();
var server = app.listen(3000);
server.on('listening', onListening);

var io = sio.listen(server);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shops', shopsRouter);
app.use('/products',productRouter);

app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
io.sockets.on('connection', function (socket) {
   console.log("hello");
    socket.on('loadMore', function(value){
            socket.emit('isLoading', 'visible');
            //just for test
            //loading more data
            value = JSON.parse(value);
            ProductDAO.getProduct(value.start,value.number,function (err, rows) {
                if(err==null) {
                    retour = "";
                    for (row of rows) {
                        var p = new Product(row.Name, row.Description, row.img);
                        retour += p.getProductView();
                    }
                    socket.emit('newObject', retour);
                    socket.emit('isLoading', "hidden");
                }else
                {
                    console.log(rows);
                    socket.emit('newObject', "ERROR !!!");
                    socket.emit('isLoading', "hidden");
                }
            });
        })
    }
);

io.sockets.on('connection', function (socket) {
        console.log("Test customer !");
        socket.on('loadMore', function(value){
            socket.emit('isLoading', 'visible');
            //just for test
            //loading more data
            value = JSON.parse(value);
            var c = new Customer("toto");
            c.getCustomer(value.start,value.number,function (err, rows) {
                if(err==null) {
                    retour = "";
                    for (row of rows) {
                        retour += c.getCustomerView(row.firstName,row.lastName,row.Address,row.Email,row.Phone);
                    }
                    socket.emit('newObjec', retour);
                    socket.emit('isLoading', "hidden");
                }else
                {
                    console.log(rows);
                    socket.emit('newObject', "ERROR !!!");
                    socket.emit('isLoading', "hidden");
                }
            });
        })
    }
);
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
module.exports = {app : app,
    sockets : io.sockets,
    };
