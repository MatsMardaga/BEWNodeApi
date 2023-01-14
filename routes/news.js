var express = require('express');
const { createConnection } = require('mysql');
var router = express.Router();

const db = require('../database');

/* GET users listing. */
router.get('/shownews', function (req, res, next) {
  db.getConnection((err, connection) => {
      if (err) console.log(err);
      var sql = 'SELECT * FROM news';
      connection.query(sql, function (err, result) {
          if (err) console.log(err);
          res.send(result);
      });
  });
});

module.exports = router;
