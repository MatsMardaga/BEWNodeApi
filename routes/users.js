var express = require('express');
var router = express.Router();

const db = require('../database');

/* GET users listing. */
router.get('/showusers', function(req, res) {
  res.render('index', { title: 'users router', message: 'test' });
});

module.exports = router;
