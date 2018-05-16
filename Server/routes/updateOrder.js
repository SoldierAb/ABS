var express = require('express');
var router = express.Router();
var db = require('../utils/DButil');
var connection = db.connect();

router.post('/updateOrder', (req, res) => {

  var _type = !!req.body.type ? Number(req.body.type) : '',
    _orders = req.body.orders.length > 0 ? req.body.orders : [],
    _response = {},
    _modSql = "UPDATE orders SET order_state=? WHERE order_no=?",
    _modParams = [];
  for (var i = 0; i < _orders.length; i++) {
    _modParams = [_type, _orders[i]];
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
  _response = { code: 200, data: 'update success', msg: '' };
  res.send(JSON.stringify(_response));
})


module.exports = router;

