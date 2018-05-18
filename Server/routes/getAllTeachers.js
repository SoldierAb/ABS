var express = require('express');
var router = express.Router();
var Teacher = require('./teacher');
var db = require('../utils/DButil');
var connection = db.connect();

router.get('/getAllTeachers', function (req, res, next) {
  console.log('-----getAllTeachers----START---------');

  var _response = {},
    _arr = [],
    _sql = "SELECT * FROM teachers ",
    _countSql = "SELECT count(phone) FROM teachers",
    _total = 0;
  console.log(_sql);

  connection.query(_countSql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      res.send(JSON.stringify({ code: 202, data: [], msg: '服务器错误' }));
      return;
    }
    _total = result[0]['count(phone)'] || 0;
    console.log('教师生总数目： ', _total);

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
        teacher.iden = result[i].iden;
        teacher.evaluation = result[i].evaluation;
        teacher.state = result[i].state;
        _arr.push(teacher);
      }

      _response = { code: 200, data: _arr, msg: '加载教员数据成功' };
      // _response = { code: 200, data: _arr, total: _total, currentPage: _curPage, pageSize: _size, msg: 'get all teachers success' };

    }

    res.send(JSON.stringify(_response));

  });

  console.log('---------getAllTeachers--END------------');
});


module.exports = router;
