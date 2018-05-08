var express = require('express');
var router = express.Router();
var db = require('../utils/DButil');
var connection = db.connect();
var Admin = require('./admin');


router.get('/getAdmins', function (req, res, next) {
    var _response = {},
        _sql = 'SELECT * FROM admin',
        _arr = [];
    connection.query(_sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({ status: 202, data: '服务器错误' }));
            return;
        }

        if (result.length < 1) {
            _response = { status: 404, data: '', msg: '暂无相关数据' };
        } else {
            for (var i = 0; i < result.length; i++) {
                var admin = new Admin();
                admin.phone = result[i].phone;
                admin.type = result[i].type;
                _arr.push(admin);
            }
            _response = { status: 200, data: _arr, msg: '获取成功' }
        }

        res.send(JSON.stringify(_response));
    })
})


module.exports = router;