//agora vamos criar nosso servidor expresso

//comando usado para criar o servidor expresso
const express = require('express');
//criando um app da variavel express
const app = express();
/*é um mecanismo que permite que recursos restritos em uma página da Web sejam 
solicitados de outro domínio fora do domínio do qual o primeiro recurso foi atendido*/
const cors = require('cors') 
//o bodyParser e um middleware usado para recuperar as informaçoes em json
const bodyParser = require('body-parser');
//acessando o mysql
const mysql = require('mysql');

//criando a conexão com o banco de dados
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'crud_db'
})
//evitar alguns tipos de erros
app.use(cors())
//transformar oq foi digitado em json e mandar para o banco
app.use(express.json())
//talvez sirva para mostrar o erro
app.use(bodyParser.urlencoded({extended: true}))


app.get('/api/get', (req, res)=>{
  //busca todos os registros na tabela
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect,(err, result)=>{
    res.send(result)
    
  })
})


app.post('/api/insert', (req, res)=>{
  /*
    ("urlQueEuQuizer"), rack =>{
    }
  */
 //criando variaveis para usar junto do bodyP arser
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  /*
    comando em sql para inserir as informações no banco de dados
    insert into nome-do-banco(nota-da-tabela,nome-da-tabela) values (valor do input,valor do input)
  */
  const sqlInsert = 
  "INSERT INTO movie_reviews(movieName, movieReview) VALUES (?,?)"
  /*
    para fazer um comando em sql devemos udar o db.query
    db.query(variavelSQL , [array com os valores do input], (erro , resultado)=>{
    outras funções (acho que vou jogar a promissse aqui)
    })
  */
  db.query(sqlInsert, [movieName, movieReview], (err, result)=>{
    console.log(err)
    /*
      console.log(err) mostra o erro no navegador
      console.log(result) mostra se deu certo    
    */
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
