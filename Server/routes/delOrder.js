var express = require('express');
var router = express.Router();
var db = require('../utils/DButil');
var connection = db.connect();

router.post('/delOrder', (req, res) => {

  var _orders = req.body.orders.length > 0 ? req.body.orders : [],
    _response = {},
    _delSql = '';
  for (var i = 0; i < _orders.length; i++) {
    _delSql = "DELETE FROM orders WHERE order_no=" + _orders[i] + "";
    connection.query(_delSql, function (err, result) {
      if (err) {
        console.log('[DELETE ERROR] - ', err.message);
        _response = { code: 200, data: 'DELETE FAIL', msg: err.message };
        return;
      }
      console.log('--------------------------DELETE----------------------------');
      console.log('DELETE affectedRows', result.affectedRows);
      console.log('-----------------------------------------------------------------\n\n');
      _response = { code: 200, data: 'DELETE SUCCESS', msg: '' };
    });
  }
  res.send(JSON.stringify(_response));
})


module.exports = router;

