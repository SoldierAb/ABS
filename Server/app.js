var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer');                               //文件上传multer模块
var multipart = require('connect-multiparty');

app.use(bodyParser.json());                                      //json数据解析
app.use(bodyParser.urlencoded({ extended: false }));             //此项必须在 bodyParser.json 下面,为参数编码

var users = require('./routes/getUsers');
var teachers = require('./routes/getTeachers');
var upload = require('./routes/upload');
var loginCheck = require('./routes/logincheck');
var regist = require('./routes/register');
var modify = require('./routes/modify');
var orderadd = require('./routes/orderAdd');
var orderall = require('./routes/getOrders');
app.use('/', orderall);
app.use('/', orderadd);
app.use('/', modify);
app.use('/', regist);
app.use('/', loginCheck);
app.use('/', upload);
app.use('/', users);
app.use('/', teachers);
app.use('/', express.static('files'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
