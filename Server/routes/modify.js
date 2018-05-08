var express = require('express');
var router = express.Router();
var db = require('../utils/DButil');
var connection = db.connect();

router.post('/modify', (req, res) => {

    var _type = !!req.body.type ? Number(req.body.type) : '',
        _table = '',
        _response = {},
        _modSql = '',
        _modParams = [],
        updateCheckSql = '';

    switch (_type) {
        case 1:
            _table = 'users';
            _modSql = "UPDATE " + _table + " SET pwd=?,name=?,head=?,iden=?,type=?,collect=?,order_no=? WHERE phone=?";
            var userarr = [ 'pwd', 'name', 'head', 'iden', 'type', 'collect', 'order_no','phone'];
            userarr.forEach(function (item, index) {
                _modParams[index] = req.body[item] || '';
            })
            break;
        case 2:
            _table = 'admin';
            _modSql = "UPDATE " + _table + " SET pwd=?,type=? WHERE phone=?";
            var adminarr = ['pwd', 'type','phone'];
            adminarr.forEach(function (item, index) {
                _modParams[index] = req.body[item] || '';
            })
            break;
        case 3:
            _table = 'manger';
            _modSql = "UPDATE " + _table + " SET pwd=?,type=? WHERE phone=?";
            var managerarr = ['pwd', 'type','phone'];
            managerarr.forEach(function (item, index) {
                _modParams[index] = req.body[item] || '';
            })
            break;
        case 5:
            _table = 'teachers';
            _modSql = "UPDATE " + _table + " SET pwd=?,name=?,sex=?,head=?,iden=?,age=?,college=?,price=?,subject=?,address=?,time=?,type=?,evaluation=?,order_no=? WHERE phone=?";
            var teaarr = ['pwd', 'name', 'sex', 'head', 'iden', 'age', 'college', 'price', 'subject', 'address', 'time', 'type', 'evaluation', 'order_no','phone'];
            teaarr.forEach(function (item, index) {
                _modParams[index] = req.body[item] || '';
            });
            break;
        default:
            _response = { code: 202, data: '', msg: '未选择账户类型' };
            res.send(JSON.stringify(_response));
            return;
    }

    updateCheckSql = "SELECT * FROM " + _table + "  WHERE phone="+req.body.phone+"";

    connection.query(updateCheckSql, function (err, result, field) {
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
            modify_action()
        } else {
            _response={code:404,data:'',msg:'未找到相关账号，请不要修改手机号'};
            res.send(JSON.stringify(_response));
            return;
        }
    });

    function modify_action() {
        connection.query(_modSql, _modParams, (err, result) => {
            if (err) {
                console.log('[MODIFY  ERROR] - ', err.message);
                var _msg = err.message.indexOf("for key 'PRIMARY'") > -1 ? '手机号已存在' : '未知错误';
                _response = { code: 202, data: err.message, msg: _msg };
                res.send(JSON.stringify(_response));
                return;
            }

            connection.query(updateCheckSql, function (err, q_result, field) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    _response = { code: 202, data: err.message, msg: '数据库查询错误' }
                    res.send(JSON.stringify(_response));
                    return;
                }
                console.log('*********************************************');
                console.log(q_result);
                console.log('*********************************************');
                if (q_result.length > 0) {
                    console.log('AAAAAAAAAAAAA');
                    _response = { code: 200, data: q_result[0], msg: 'update success' };
                    res.send(JSON.stringify(_response));
                    return;
                } else {
                    _response={code:404,data:'',msg:'更新后查询错误'};
                    res.send(JSON.stringify(_response));
                    return;
                }
            });
            // res.send(JSON.stringify(_response));
        });
    }
    
})


module.exports = router;

