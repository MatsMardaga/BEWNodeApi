var express = require('express');
const { createConnection } = require('mysql');
var router = express.Router();

const db = require('../database');

/* GET users listing. */
router.get('/shownews', (req, res)=> {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    else {
      var sql = 'SELECT * FROM news';
      connection.query(sql, (err, result)=> {
        if (err) console.log(err);
        res.send(result);
      });
    }
  });
});

module.exports = router;
