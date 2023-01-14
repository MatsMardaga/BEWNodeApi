var express = require('express');
var router = express.Router();

const db = require('../database');

/* GET users listing. */
router.get('/showusers', function(req, res, next) {
  res.render('index', { title: 'users router' });
  res.send('respond with a resource');
});

module.exports = router;
