const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Macethan19970528",
  database: "tacker_db",
});

connection.connect(function (err) {
  if (err) throw err;
});


module.exports = connection;