var mysql = require('mysql');

var verbinding = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  database:"nodeapi",
  user: "NodeApi",
  password: "nodeapi123"
});

module.exports = verbinding;
