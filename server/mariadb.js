
const mysql = require('mysql2')

// Create the connection to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password : '1234',
  database: 'TodoList',
  dateStrings : true //String 형태로 받겠음
  //db에 SET GLOBAL time_zone='Asia/Seoul';

});

module.exports = connection;