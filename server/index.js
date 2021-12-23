// npm init pra iniciar o servidor
// npm install nodemon
// nmp install express body-parser mysql

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'crud_db'
})

app.use(bodyParser.urlencoded({extended: true}))


app.post('/api/insert', (req, res)=>{

  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert = 
  "INSERT INTO movie_reviews(movieName, movieReview) VALUES (?,?)"
  db.query(sqlInsert, [movieName, movieReview], (err, result)=>{
    console.log(result)
  })
})

app.listen(3001, () =>{
  console.log("running on port 3001")
});
