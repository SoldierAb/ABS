var express = require('express');
var router = express.Router();
var db = require('../utils/DButil');
var connection = db.connect();

router.post('/orderadd', (req, res) => {

    var _table = 'orders',
        _response = {},
        _addSql = '',
        _addParams = [],
        orderarr = ['phone', 'order_no', 'order_price', 'order_address', 'order_need_sex', 'order_subject', 'order_time', 'order_detail'],
        _addSql = "INSERT INTO " + _table + "(phone, order_no, order_price,order_address, order_need_sex, order_subject,order_time, order_detail) VALUES(?,?,?,?,?,?,?,?)";

    orderarr.forEach(function (item, index) {
        _addParams[index] = req.body[item] || '';
    });

    connection.query(_addSql, _addParams, (err, result) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            var _msg = err.message.indexOf("for key 'PRIMARY'") > -1 ? '订单号已存在' : '未知错误';
            _response = { code: 202, data: err.message, msg: _msg };
            res.send(JSON.stringify(_response));
            return;
        }
        _response = { code: 200, data: result, msg: 'success' };
        res.send(JSON.stringify(_response));
    });
})


module.exports = router;

