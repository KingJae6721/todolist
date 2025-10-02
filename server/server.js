const express = require('express');
const cors = require('cors');
const conn = require('./mariadb')

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

app.get('/api/todos', (req, res) => {

  let sql = 'SELECT * FROM todolist'

  conn.query(sql, (err, results) => {
    if (results.length)
      res.status(200).json(results)
    else {
      res.status(404).json({
        message: "데이터를 받아올 수 없습니다."
      })
    }
  })
});

app.post('/api/todos', (req, res) => {

 const { task, completed, category, notes } = req.body
        let sql =`INSERT INTO todolist (task, completed, category, notes)
         VALUES (?, ?, ?,?);`
        let values =[task, completed, category, notes]
        conn.query(
            sql,
            values,
            function (err, results) {
                res.status(201).json(results);
            }
        );
   
});

app.listen(5000, () => {
  console.log('✅ Express server running on http://localhost:5000');
});