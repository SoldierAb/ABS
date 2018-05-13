var express = require('express');
var router = express.Router();
var db = require('../utils/DButil');
var connection = db.connect();
var Order = require('./order');


router.get('/getOrders', function (req, res, next) {
    console.log('--------------------------getOrders----START------------------------');

    var _response = {},
        _arr = [],
        _sql = 'SELECT * FROM orders';

    connection.query(_sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({ status: 202, data: '服务器错误' }));
            return;
        }

        if (result.length < 1) {
            _response = { status: 404, data: '暂无相关数据' };
        } else {
            console.log('order res: ', result);
            for (var i = 0; i < result.length; i++) {
                var order = new Order();
                order.phone = result[i].phone;
                order.order_no = result[i].order_no;
                order.order_price = result[i].order_price;
                order.order_address = result[i].order_address;
                order.order_need_sex = result[i].order_need_sex;
                order.order_subject = result[i].order_subject;
                order.order_time = result[i].order_time;
                order.order_detail = result[i].order_detail;
                _arr.push(order);
            }
            _response = { code: 200, data: _arr, msg: 'get orders success' };
        }
        res.send(JSON.stringify(_response));

    });
    console.log('-----------------------------getOrders--END-----------------------------');

});


module.exports = router;
