//agora vamos criar nosso servidor expresso

//comando usado para criar o servidor expresso
const express = require('express');
//criando um app da variavel express
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

/*
vamos criar essa variavel para pasar qual porta vamos abrir
ja que nosso react-client está rodando na porta 3001
*/
app.listen(3001, () =>{
  //um console;.log apenas para saber se realmente estamos no porta 3001
  console.log("running on port 3001")
});
