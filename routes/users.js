var express = require('express');
const { createConnection } = require('mysql');
var router = express.Router();

const db = require('../database');

/* GET users listing. */
router.get('/showusers', (req, res)=> {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    else {
      var sql = 'SELECT * FROM user';
      connection.query(sql, (err, result)=> {
        if (err) console.log(err);
        res.send(result);
        connection.release();
      });
    }
  });
  
});

router.post('/createuser', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    else {
      //prepared statement
      var sql = 'INSERT INTO user(name,email,password) VALUES (?, ?, ?)';
      var values = [req.query.name, req.query.email, req.query.password];
      connection.query(sql, values, (err, result) => {
        if (err) console.log(err);
        res.send('created a new user');
        connection.release();
      }); 
    }
  });
});

router.put('/updateuser', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    else {
      //prepared statement
      var sql = 'UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?';
      var values = [req.query.name, req.query.email, req.query.password, req.query.id];
      connection.query(sql, values, (err, result) => {
        if (err) console.log(err);
        //check if user id exists
        if(result.affectedRows == 0){
          console.log('There is no user with that id')
        }
        //check if there is anything to change
        else if(result.changedRows == 0){
          console.log('Nothing to update')
        }
        //if user id exists, the database entry is updated
        else{
          res.send('user has been updated');
          connection.release();
        }
      }); 
    }
  });
});


module.exports = router;
