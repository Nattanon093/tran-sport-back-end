// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const bodyParser = require('body-parser'); // ใช้ในการรับข้อมูลจาก body ของ request
// const port = process.env.PORT || 5173; // 5432 posr ใช้ในการรัน server

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   const origin = req.get('origin');
//   // TODO Add origin validation
//   res.header('Access-Control-Allow-Origin', origin);
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

//   // intercept OPTIONS method
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(204);
//   } else {
//     next();
//   }
// }); // 404 หาไม่เจอ จะส่งไปที่ error handler ด้านล่าง

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// app.listen(port, () => {
//   console.log('Server is running on port: ' + port);
// });

// var appRouteAuthen = require('./routes/appRoutesAuthen');
// // var appRouteUpload = require('./routes/users');

// appRouteAuthen(app);
// // appRouteUpload(app);

// module.exports = app;


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5432;

var publicDir = require('path').join(__dirname, '/public/');
app.use(express.static(publicDir));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    const origin = req.get('origin');
    // TODO Add origin validation
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});

app.listen(port, () => {
    console.log('API Start server at port ' + port + '.');
})

var appRouteAuthen = require('./routes/appRoutesAuthen');
var appRouteUsers = require('./routes/appRoutesUsers');
var appRouteStock = require('./routes/appRoutesStock');
var appRouteBill = require('./routes/appRoutesBill');
var appRouteMaster = require('./routes/appRoutesMaster');
var appRoutesCompany = require('./routes/appRoutesCompany');
var appRouteCheque = require('./routes/appRoutesCheque');
// set routes

appRouteAuthen(app);
appRouteUsers(app);
appRouteStock(app);
appRouteBill(app);
appRouteMaster(app);
appRoutesCompany(app);
appRouteCheque(app);