const path = require('path');
const express = require('express');
const session = require('express-session');
const query = require('./public/js/query');
const entities = require('./public/js/entities');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

/**
 * Callback invocada para carregamento da página inicial,
 * quando requisição à raiz da aplicação (homepage_view).
 */
app.get('/', (req, res) => carregarPaginaInicial(req, res));

/**
 * Callback invocada para carregamento da página inicial.
 * (homepage_view).
 */
app.get('/home', (req, res) => carregarPaginaInicial(req, res));

/**
 * Callback invocada para carregamento da página de feed
 * ('feed_view'). 
 */
app.get('/feed', (req, res) => carregarFeed(req, res));

/**
 * Callback invocada para carregamento da página do usuário 
 * ('user_view'). 
 */
app.get('/user', (req, res) => carregarPaginaDoUsuario(req, res));

/**
 * Callback invocada sempre que um novo usuário for inserido
 * na base de dados.
 */
app.post('/save', (req, res) => inserirUsuario(req, res));

/**
 * Callback invocada sempre que uma nova publicação for inserida
 * na base de dados.
 */
app.post('/publish', (req, res) => inserirPublicacao(req, res));

/**
 * Callback invocada sempre que uma atualização for realizada
 * no registro de um usuário.
 */
app.post('/update', (req, res) => atualizarUsuario(req, res));

/**
 * Callback invocada sempre que o registro de um usuário for
 * deletado.
 */
app.post('/delete', (req, res) => deletarUsuario(req, res));

/**
 * Callback invocada no momento de entrada do usuário na
 * aplicação (login).
 */
app.post('/auth', (req, res) => realizarLoginComoUsuario(req, res));

/**
 * Inicialização da aplicação em localhost na porta 8000.
 */
app.listen(8000, () => console.log('Server is running at port 8000'));

function carregarPaginaInicial(req, res) {
  req.session.loggedin = false;
  req.session.idUsuario = null;

  res.render('homepage_view');
}

/**
 * Método responsável pelo carregamento do feed, repassando
 * o registro do usuário atual. 
 */
function carregarFeed(req, res) {
  if (req.session.loggedin) {
    query.obterUsuarioPorId(req.session.idUsuario)
      .then(async usuarios => {
        const usuarioFinal = new entities.Usuario(usuarios[0]);
        const publicacoes = await query.obterPublicacoes();
        return {
          usuario: usuarioFinal,
          publicacoes: publicacoes.map(publicacao => new entities.Publicacao(publicacao, usuarioFinal))
        };
      })
      .then(retorno => res.render('feed_view', { ...retorno }))
      .catch(erro => res.send(erro));
  } else {
    res.send('Entre com email e senha válidos!');
  }
}

/**
 * Método responsável pelo carregamento da página do usuário,
 * repassando o registro do usuário atual. 
 */
function carregarPaginaDoUsuario(req, res) {
  if (req.session.loggedin) {
    query.obterUsuarioPorId(req.session.idUsuario)
      .then(async usuarios => {
        const usuarioFinal = new entities.Usuario(usuarios[0]);
        const publicacoes = await query.obterPublicacoesDoUsuario(req.session.idUsuario);
        return {
          usuario: usuarioFinal,
          publicacoes: publicacoes.map(publicacao => new entities.Publicacao(publicacao, usuarioFinal))
        };
      })
      .then(retorno => res.render('user_view', { ...retorno }))
      .catch(erro => req.send(erro));
  } else {
    res.send('Entre com email e senha válidos!');
  }
}

function inserirUsuario(req, res) {
  const usuario = { nome: req.body.nome, email: req.body.email, senha: req.body.senha };
  query.inserirUsuario(usuario)
    .then(() => res.redirect('/'))
    .catch(erro => req.send(erro));
}

function inserirPublicacao(req, res) {
  if (req.session.loggedin) {
    query.obterUsuarioPorId(req.session.idUsuario)
      .then(usuarios => {
        const usuario = usuarios[0];
        const publicacao = {
          titulo: req.body.titulo,
          descricao: req.body.descricao,
          imagem: req.body.imagem,
          idUsuario: req.session.idUsuario,
          dataPublicacao: new Date,
          nomeUsuario: usuario.nome,
          fotoUsuario: usuario.foto
        };

        return query.inserirPublicacao(publicacao);
      })
      .then(() => res.redirect('/feed'))
      .catch(erro => res.send(erro));
  } else {
    res.send('Entre com email e senha válidos!');
  }
}

function atualizarUsuario(req, res) {
  if (req.session.loggedin) {
    const usuario = { nome: req.body.nome, email: req.body.email, senha: req.body.senha };
    query.atualizarUsuario(usuario)
      .then(() => res.redirect('/user'))
      .catch(erro => res.send(erro));
  } else {
    res.send('Entre com email e senha válidos!');
  }
}

function deletarUsuario(req, res) {
  if (req.session.loggedin) {
    query.deletarUsuario(req.session.idUsuario)
      .then(() => {
        req.session.loggedin = false;
        req.session.idUsuario = null;
        res.redirect('/')
      })
      .catch(erro => res.send(erro));
  } else {
    res.send('Entre com email e senha válidos!');
  }
}

/**
 * Método responsável pela entrada do usuário na plataforma caso
 * exista usuário com email e senha indicados. 
 */
function realizarLoginComoUsuario(req, res) {
  const email = req.body.email;
  const senha = req.body.senha;
  if (email && senha) {
    query.obterUsuarioPorCredenciais(email, senha)
      .then(usuarios => {
        req.session.loggedin = true;
        req.session.idUsuario = usuarios[0].id;
        res.redirect('/feed');
      })
      .catch(erro => res.send(erro))
      .finally(() => res.end());
  } else {
    res.send('Entre com email e senha válidos!');
    res.end();
  }
}
