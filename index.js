const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var session = require('express-session');
var app = express();
app.use(session({ //	<button class="btn btn-success" data-toggle="modal" data-target="#myModalAdd" onclick="window.location.href='welcome'">Perfil</button>
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//Cria Conexão
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_db'
});

// conexão com o bd
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '/public')));

//select
app.get('/', (req, res) => {
  let sql = "SELECT * FROM usuario";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render('cadastro_view', {
      results: results
    });
  });
});

app.get('/inicial', (req, res) => {
  let sql = "SELECT * FROM usuario";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render('cadastro_view', {
      results: results
    });
  });
});



//insert
app.post('/save', (req, res) => {
  let data = { usuario_name: req.body.usuario_name, usuario_email: req.body.usuario_email, usuario_senha: req.body.usuario_senha };
  let sql = "INSERT INTO usuario SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//update
app.post('/update', (req, res) => {
  let sql = "UPDATE usuario SET usuario_name='" + req.body.usuario_name + "', usuario_email='" + req.body.usuario_email + "', usuario_senha='" + req.body.usuario_senha + "' WHERE usuario_id=" + req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/welcome');
  });
});

//delete
app.post('/delete', (req, res) => {
  let sql = "DELETE FROM usuario WHERE usuario_id=" + req.body.usuario_id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/welcome');
  });
});

//autenticação login
app.post('/auth', (req, res) => {
  var usuario_email = req.body.usuario_email;
  var usuario_senha = req.body.usuario_senha;
  if (usuario_email && usuario_senha) {
    conn.query('SELECT * FROM usuario WHERE usuario_email = ? AND usuario_senha = ?', [usuario_email, usuario_senha], function (error, results, fields) {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.usuario_email = usuario_email;


        res.redirect('/home');
      } else {
        res.send('Email ou senha incorretos!');
      }
      res.end();
    });
  } else {
    res.send('Entre com um email valido!');

    console.log(req.body.usuario_email);
    res.end();
  }
});

app.get('/home', (req, res) => {
  if (req.session.loggedin) {
    let sql = "SELECT * FROM usuario WHERE usuario_email  = '" + req.session.usuario_email + "'";
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.render('telainicial_view', {
        results: results
      });
    });
  }
  else {
    res.send('Entre com um email valido!');
  }
});

app.get('/welcome', (req, res) => {
  let sql = "SELECT * FROM usuario WHERE usuario_email  = '" + req.session.usuario_email + "'";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render('usuario_view', {
      results: results
    });
  });
});

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
