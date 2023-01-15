var express = require('express');
const { createConnection } = require('mysql');
var router = express.Router();

const db = require('../database');

// -------------------------------------------------------Show all users-------------------------------------------------------
router.get('/showusers', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    else {
      // LIMIT 20 will print out the first 20 users 9LIMIT20) starting at the 6th row of the users table (OFFSET 5)
      var sql = 'SELECT * FROM user LIMIT 20 OFFSET 5';
      connection.query(sql, (err, result) => {
        if (err) console.log(err);
        res.send(result);
        connection.release();
      });
    }
  });

});


// -------------------------------------------------------Create new user-------------------------------------------------------
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

// -------------------------------------------------------Update specific user-------------------------------------------------------
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
        if (result.affectedRows == 0) {
          console.log('There is no user with that id')
        }
        //check if there is anything to change
        else if (result.changedRows == 0) {
          console.log('Nothing to update')
        }
        //if user id exists, the database entry is updated
        else {
          res.send('user has been updated');
          connection.release();
        }
      });
    }
  });
});

// -------------------------------------------------------Delete user-------------------------------------------------------
router.delete('/deleteuser', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    else {
      //prepared statement
      var sql = 'DELETE FROM user WHERE id = ?';
      var values = [req.query.id];
      connection.query(sql, values, (err, result) => {
        if (err) console.log(err);
        //check if user id exists
        if (result.affectedRows == 0) {
          console.log('There is no user with that id')
        }
        //if user id exists, the database entry is updated
        else {
          res.send('user has been deleted');
          connection.release();
        }
      });
    }
  });

});


module.exports = router;
