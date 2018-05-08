var express = require('express');
var router = express.Router();
var db = require('../utils/DButil');
var connection = db.connect();
var formidable = require('formidable');

router.post('/loginCheck', (req, res) => {                                       //登陆验证
    var _type = !!req.body.usertype ? Number(req.body.usertype) : '',
        _table = '',
        _response = {},
        _phone = req.body.userphone,
        _pwd = req.body.userpwd,
        logincheckStr = '';
    switch (_type) {
        case 1:
            _table = 'users';
            break;
        case 2:
            _table = 'admin';
            break;
        case 3:
            _table = 'manger';
            break;
        case 5:
            _table = 'teachers'
            break;
        default:
            _response = { code: 202, data: '', msg: '未选择账户类型' };
            res.send(JSON.stringify(_response));
            return;
    }

    logincheckStr = "SELECT * FROM " + _table + " WHERE phone=" + _phone + ""

    connection.query(logincheckStr, function (err, result, field) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            _response = { code: 202, data: '', msg: '信息输入错误' }
            res.send(JSON.stringify(_response));
            return;
        }
        if (result.length < 1) {
            _response = { code: 404, data: '', msg: '该类型账号不存在' }
        } else {
            if (_pwd == result[0].pwd) {
                _response = { code: 200, data: result[0], msg: '验证成功' }
            } else {
                _response = { code: 300, data: '', msg: '密码错误' }
            }
        }
        res.send(JSON.stringify(_response));
    });

});


module.exports = router;