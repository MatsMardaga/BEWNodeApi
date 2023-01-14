var express = require('express');
const { createConnection } = require('mysql');
var router = express.Router();

const db = require('../database');

/* GET users listing. */
router.get('/shownews', function(req, res) {
    res.render('index', { title: 'news router', message: 'test' });
  });

module.exports = router;
