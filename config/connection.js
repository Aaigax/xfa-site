var mysql = require('mysql');

var connection = mysql.createConnection({
   host: 'xfa-site.ch17u3pxo3ux.ap-southeast-2.rds.amazonaws.com',
   user: 'admin',
   password: 'AlatinaX!83',
   database: 'db_xfafamilyzone',
   port: 3306,
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