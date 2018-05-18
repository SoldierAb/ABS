var express = require('express');
var router = express.Router();
var Teacher = require('./teacher');
var db = require('../utils/DButil');
var connection = db.connect();

router.get('/getTeachers', function (req, res, next) {
    console.log('-----getTeachers----START---------');

    var _response = {},
        _city = req.query.city ? req.query.city : null,
        _size = req.query.pageSize,
        _curPage = req.query.currentPage,
        _pageDrop = (_curPage - 1) * _size,
        _arr = [],
        _sql = _city ? "SELECT * FROM teachers WHERE address like '%" + _city + "%'  limit " + _pageDrop + "," + _size + "" : "SELECT * FROM teachers limit " + _pageDrop + "," + _size + "",
        _countSql = "SELECT count(phone) FROM teachers WHERE address like '%" + _city + "%' ",
        _total = 0;
    console.log(_sql);

    connection.query(_countSql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({ code: 202, data: [], msg: '服务器错误' }));
            return;
        }
        _total = result[0]['count(phone)'] || 0;
        console.log('总条数： ', _total);

    });

    connection.query(_sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({ code: 202, data: [], msg: '服务器错误' }));
            return;
        }

        if (result.length < 1) {
            _response = { code: 202, data: [], msg: '暂无相关数据' };
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

            // _response = { code: 200, data: _arr, msg: '加载教员数据成功' };
            _response = { code: 200, data: _arr, total: _total, currentPage: _curPage, pageSize: _size, msg: 'get teachers success' };

        }

        res.send(JSON.stringify(_response));

    });

    console.log('---------getTeachers--END------------');
});


module.exports = router;
