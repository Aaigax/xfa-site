var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'AlatinaX!83',
   database: 'db_xfafamilyzone',
   multipleStatements: true
});

connection.connect(function (err) {
   if (!err) {
      console.log("Database is connected");
   } else {
      console.log("Error while connecting with database");
   }
});
module.exports = connection;