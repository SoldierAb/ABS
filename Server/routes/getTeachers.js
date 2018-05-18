var express = require('express');
var router = express.Router();
var Teacher = require('./teacher');
var db = require('../utils/DButil');
var connection = db.connect();

router.get('/getTeachers', function (req, res, next) {
    console.log('-----getTeachers----START---------');

    var _response = {},
        _city = req.query.city ? req.query.city : null,
        _arr = [],
        _sql = _city ? "SELECT * FROM teachers WHERE address like '%" + _city + "%' " : 'SELECT * FROM teachers';
    console.log(_sql);

    connection.query(_sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({ code: 202, data: [], msg: '服务器错误' }));
            return;
        }

        if (result.length < 1) {
            _response = { code: 404, data: [], msg: '暂无相关数据' };
        } else {
            for (var i = 0; i < result.length; i++) {
                var teacher = new Teacher();
                teacher.phone = result[i].phone;
                teacher.name = result[i].name;
                teacher.sex = result[i].sex;
                teacher.head = result[i].head;
                teacher.age = result[i].age;
                teacher.college = result[i].college;
                teacher.price = result[i].price;
                teacher.subject = result[i].subject;
                teacher.address = result[i].address;
                teacher.time = result[i].time;
                teacher.evaluation = result[i].evaluation;
                _arr.push(teacher);
            }

            _response = { code: 200, data: _arr, msg: '加载教员数据成功' };
        }

        res.send(JSON.stringify(_response));

    });

    console.log('---------getTeachers--END------------');
});


module.exports = router;
