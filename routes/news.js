var express = require('express');
const { createConnection } = require('mysql');
var router = express.Router();

const db = require('../database');

// -------------------------------------------------------Show all newsposts-------------------------------------------------------
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

// -------------------------------------------------------Create new newspost-------------------------------------------------------

router.post('/createnews', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    else {
      
      var sqlcheck = 'SELECT id FROM user WHERE id = ?';
     
      //First check to see if user id exists    
      connection.query(sqlcheck,[req.query.user_id], (err, result) => {
        if (err) console.log(err);
        if (result.length == 0) {
          //sadly it doesn't exist
          console.log('There is no user with that id')
        }
        else{
          //it exists so we will create newsitem for that user id
          console.log('user id valid, creating newsitem')
          var sql = 'INSERT INTO news(title,content,user_id) VALUES (?, ?, ?)';
          var values = [req.query.title, req.query.content, req.query.user_id];
          connection.query(sql, values, (err, result) => {
            if (err) console.log(err);
            res.send('created a new newsitem');
          });
        }
        connection.release();
      });
    }
  });
});



module.exports = router;
