var express = require('express');
var router = express.Router();
var db = require('../utils/DButil');
var usertypes = require('./usertypes');
var tables = require('./tables');
var connection = db.connect();

// { root: selectedRowKeys, state: _state, type: UserTypes.USER }
router.post('/rootActive', (req, res) => {

  console.log('active --------------------');
  var _type = !!req.body.type ? Number(req.body.type) : '';
  if (!_type) return res.send(JSON.stringify({ code: 200, data: [], msg: '为传入用户类型' }));;
  var _table = tables[_type],
    _root = req.body.root.length > 0 ? req.body.root : [],
    _state = req.body.state,
    _response = {},
    _modSql = "UPDATE " + _table + " SET state=? WHERE phone=?",
    _modParams = [];
  for (var i = 0; i < _root.length; i++) {
    _modParams = [_state, _root[i]];
    connection.query(_modSql, _modParams, function (err, result) {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
      }
      console.log('--------------------------UPDATE----------------------------');
      console.log('UPDATE affectedRows', result.affectedRows);
      console.log('-----------------------------------------------------------------\n\n');
    });
  }
  _response = { code: 200, data: 'active success', msg: '' };
  res.send(JSON.stringify(_response));
})


module.exports = router;

