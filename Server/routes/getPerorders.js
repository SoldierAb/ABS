var express = require('express');
var router = express.Router();
var db = require('../utils/DButil');
var connection = db.connect();
var Order = require('./order');

router.get('/getPerOrders', function (req, res, next) {
  console.log('--------------------------getOrders----START------------------------');
  var _response = {},
    _phone = req.query.phone,
    // _size = req.query.pageSize,
    // _curPage = req.query.currentPage,
    // _pageDrop = (_curPage - 1) * _size,
    _arr = [],
    // _sql = "SELECT * FROM orders WHERE phone=" + _phone + " limit " + _pageDrop + "," + _size + "",
    _sql = "SELECT * FROM orders WHERE phone=" + _phone + "",
    _countSql = "SELECT count(order_no) FROM orders WHERE phone=" + _phone + "",
    _total = 0;
  connection.query(_countSql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      res.send(JSON.stringify({ code: 202, data: '服务器错误' }));
      return;
    }
    _total = result[0]['count(order_no)'];
    console.log('总条数： ', _total);

  });
  connection.query(_sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      res.send(JSON.stringify({ code: 202, data: '服务器错误' }));
      return;
    }

    if (result.length < 1) {
      _response = { code: 404, data: [], msg: '暂无相关数据' };
    } else {
      for (var i = result.length - 1; i >= 0; i--) {
        var order = new Order();
        order.phone = result[i].phone;
        order.order_no = result[i].order_no;
        order.order_price = result[i].order_price;
        order.order_address = result[i].order_address;
        order.order_need_sex = result[i].order_need_sex;
        order.order_subject = result[i].order_subject;
        order.order_time = result[i].order_time;
        order.order_detail = result[i].order_detail;
        order.order_state = result[i].order_state;
        _arr.push(order);
      }
      _response = { code: 200, data: _arr, total: _total, msg: 'get orders success' };
      // _response = { code: 200, data: _arr, total: _total, currentPage: _curPage, pageSize: _size, msg: 'get orders success' };
    }
    res.send(JSON.stringify(_response));

  });
  console.log('-----------------------------getOrders--END-----------------------------');

});


module.exports = router;
