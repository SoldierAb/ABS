var express = require('express');
var router = express.Router();
var db = require('../utils/DButil');
var connection = db.connect();

router.post('/regist', (req, res) => {

    var _type = !!req.body.type ? Number(req.body.type) : '',
        _table = '',
        _response = {},
        _addSql = '',
        _addParams = [],
        registcheckStr = '';

    switch (_type) {
        case 1:
            _table = 'users';
            _addSql = "INSERT INTO " + _table + "(phone,pwd,name,head,iden,type,collect,order_no) VALUES(?,?,?,?,?,?,?,?)";
            var userarr = ['phone', 'pwd', 'name', 'head', 'iden', 'type', 'collect', 'order_no'];
            userarr.forEach(function (item, index) {
                _addParams[index] = req.body[item] || '';
            })
            break;
        case 2:
            _table = 'admin';
            _addSql = "INSERT INTO " + _table + "(phone,pwd,type) VALUES(?,?,?)";
            var adminarr = ['phone', 'pwd', 'type'];
            adminarr.forEach(function (item, index) {
                _addParams[index] = req.body[item] || '';
            })
            break;
        case 3:
            _table = 'manger';
            _addSql = "INSERT INTO " + _table + "(phone,pwd,type) VALUES(?,?,?)";
            var managerarr = ['phone', 'pwd', 'type'];
            managerarr.forEach(function (item, index) {
                _addParams[index] = req.body[item] || '';
            })
            break;
        case 5:
            _table = 'teachers';
            _addSql = "INSERT INTO " + _table + "(phone,pwd,name,sex,head,iden,age,college,price,subject,address,time,type,evaluation,order_no) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            var teaarr = ['phone', 'pwd', 'name', 'sex', 'head', 'iden', 'age', 'college', 'price', 'subject', 'address', 'time', 'type', 'evaluation','order_no'];
            teaarr.forEach(function (item, index) {
                _addParams[index] = req.body[item] || '';
            });
            break;
        default:
            _response = { code: 202, data: '', msg: '未选择账户类型' };
            res.send(JSON.stringify(_response));
            return;
    }

    registcheckStr = "SELECT * FROM " + _table + "";

    connection.query(registcheckStr, function (err, result, field) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            _response = { code: 202, data: err.message, msg: '数据库查询错误' }
            res.send(JSON.stringify(_response));
            return;
        }
        if (result.length > 0) {
            console.log('-----数据库查询-------');
            console.log(result);
            console.log('--------------------');
            var iden_judge = true;
            var name_judge = true;
            result.forEach(function (item) {
                if (item.iden == req.body.iden) iden_judge = false;
                if (item.name == req.body.name) name_judge = false;
            })
            if (!iden_judge) {
                _response = { code: 302, data: '', msg: '身份证号已经存在了哦' }
                res.send(JSON.stringify(_response));
                return;
            } else if (!name_judge) {
                _response = { code: 302, data: '', msg: '用户名已经存在了哦' }
                res.send(JSON.stringify(_response));
                return;
            } else {
                insert_action()
            }
        } else {
            insert_action()
        }
    });

    function insert_action() {
        connection.query(_addSql, _addParams, (err, result) => {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                var _msg = err.message.indexOf("for key 'PRIMARY'") > -1 ? '手机号已存在' : '未知错误';
                _response = { code: 202, data: err.message, msg: _msg };
                res.send(JSON.stringify(_response));
                return;
            }
            _response = { code: 200, data: result, msg: 'success' };
            res.send(JSON.stringify(_response));
        });
    }

})


module.exports = router;

