var express = require('express');
const { createConnection } = require('mysql');
var router = express.Router();

const db = require('../database');

// -------------------------------------------------------Show all newsposts-------------------------------------------------------
router.get('/shownews', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    else {
      var sql = 'SELECT * FROM news';
      connection.query(sql, (err, result) => {
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
      connection.query(sqlcheck, [req.query.user_id], (err, result) => {
        if (err) console.log(err);
        if (result.length == 0) {
          //sadly it doesn't exist
          console.log('There is no user with that id')
        }
        else {
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


// -------------------------------------------------------Update new newspost-------------------------------------------------------


//Need to put a variable in the route before the ? -> example localhost:3000/news/updatenews/5?user_id=7
router.put('/updatenews/:id', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    else {
      //Check to see if user id is stored in certain post
      var sqlcheck = 'SELECT user_id FROM news WHERE id = ? and user_id = ?';
      connection.query(sqlcheck, [req.params.id, req.query.user_id], (err, result) => {
        if (err) {
          console.log(err)
        }

        //for some reason if either a newspost doesnt exist or a user id is not in newspost
        //console will always say 'post id not found'


        //user id not in post
        if (result.length == 0) {
          console.log('Post id not found')
        }
        //if the first value of the result (user_id) doesn't equa; the user_id in the query string
        //the user cannot edit it 
        else if (result[0].user_id != req.query.user_id) {
          console.log('Not authorized to update newspost')
        }
        else {
          console.log('News item exists and user authorized to edit it, editing post now...')
          var sql = 'UPDATE news SET title = ?, content = ? WHERE id = ?';
          var values = [req.query.title, req.query.content, req.params.id];
          connection.query(sql, values, (err, result) => {
            if (err) console.log(err)
            if (result.changedRows == 0) {
              console.log('Nothing to update')
            }
            else {
              res.send('News post edited sucessfully')
              connection.release();
            }

          })

        }
      })

    }
  });
});


// -------------------------------------------------------Delete new newspost-------------------------------------------------------

//Need to put a variable in the route before the ? -> example localhost:3000/news/updatenews/5?user_id=7
router.delete('/deletenews/:id', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    else {
      //Check to see if user id is stored in certain post
      var sqlcheck = 'SELECT user_id FROM news WHERE id = ? and user_id = ?';
      connection.query(sqlcheck, [req.params.id, req.query.user_id], (err, result) => {
        if (err) {
          console.log(err)
        }

        //for some reason if either a newspost doesnt exist or a user id is not in newspost
        //console will always say 'post id not found'


        //user id not in post
        if (result.length == 0) {
          console.log('Post id not found')
        }
        //if the first value of the result (user_id) doesn't equa; the user_id in the query string
        //the user cannot edit it 
        else if (result[0].user_id != req.query.user_id) {
          console.log('not authorized to delete newspost')
        }
        else {
          console.log('News item exists and user authorized to delete it, deleting post now...')
          var sql = 'DELETE FROM news WHERE id = ?';
          connection.query(sql, [req.params.id], (err, result) => {
            if (err) console.log(err);
            //check if user id exists
            if (result.affectedRows == 0) {
              console.log('There is no Newsitem to delete')
            }
            //if user id exists, the database entry is updated
            else {
              res.send('News post has been deleted');
              connection.release();
            }
          });
        }
      })
    }
  });
});

module.exports = router;
