var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'default router' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'home router' });
});


module.exports = router;
