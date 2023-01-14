var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(res) {
  res.render('index', { title: 'default router' });
});

router.get('/home', function(req, res) {
  res.render('index', { title: 'home router' });
});


module.exports = router;
