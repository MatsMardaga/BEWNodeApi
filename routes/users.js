var express = require('express');
var router = express.Router();

const db = require('../database');

/* GET users listing. */
router.get('/showusers', function(req, res) {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    else {
      var sql = 'SELECT * FROM user';
      connection.query(sql, (err, result)=> {
        if (err) console.log(err);
        res.send(result);
      });
    }
  });
});

module.exports = router;
