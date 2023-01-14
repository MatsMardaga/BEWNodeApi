var mysql = require('mysql');

var verbinding = mysql.createConnection({
  host: "localhost",
  database:"nodeapi",
  user: "NodeApi",
  password: "nodeapi123"
});



verbinding.connect(function(err) {
  if (err) throw err;
  console.log("Verbonden!");
});

module.exports = verbinding;
