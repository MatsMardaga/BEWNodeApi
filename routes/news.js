var express = require('express');
const { createConnection } = require('mysql');
var router = express.Router();

const db = require('../database');

/* GET users listing. */
router.get('/shownews', function(req, res, next) {
    res.render('index', { title: 'news router' });
    connection.query('SELECT * FROM news', function(err, result){
        res.send(result);
    });
    connection.release;
  });

module.exports = router;
