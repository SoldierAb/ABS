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
            _response = { status: 404, data: '暂无相关数据' }
        } else {
            for (var i = 0; i < result.length; i++) {
                var order = new Order();
                order.orderNo = result[i].orderNo;
                order.orderGrade = result[i].orderGrade;
                order.orderSex = result[i].orderSex;
                order.orderNeedSex = result[i].orderNeedSex;
                order.orderSubject = result[i].orderSubject;
                order.orderDetail = result[i].orderDetail;
                order.orderTimes = result[i].orderTimes;
                order.orderTeachTime = result[i].orderTeachTime;
                _arr.push(order);
            }

            _response = { status: 200, data: _arr };
        }

        res.send(JSON.stringify(_response));

    });
    console.log('-----------------------------getOrders--END-----------------------------');

});


module.exports = router;
