var express = require('express');
var router = express.Router();
var db = require('../utils/DButil');
var connection = db.connect();
var User = require('./user');

router.get('/getUsers', function (req, res, next) {
    console.log('-----getUsers----START---------');

    var _response = {},
        _arr = [],
        _sql = 'SELECT * FROM users';

    connection.query(_sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({ status: 202, data: '服务器错误' }));
            return;
        }

        if (result.length < 1) {
            _response = { status: 404, data: '暂无相关数据' };
        } else {
            for (var i = 0; i < result.length; i++) {
                var user = new User();
                user.phone = result[i].phone;
                user.pwd = result[i].pwd;
                user.name = result[i].name;
                user.head= result[i].head;
                user.iden= result[i].iden;
                user.type= result[i].type;
                user.collect= result[i].collect;
                _arr.push(user);
            }

            _response = { status: 200, data: _arr };
        }

        res.send(JSON.stringify(_response));

    });

    console.log('---------getUsers--END------------');
});


module.exports = router;
