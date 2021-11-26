const mysql = require('mysql');

/**
 * Definição de conexão com o banco de dados MySQL
 * (bigo) em localhost.
 */
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bigo'
});

mysqlConnection.connect(erro => { if (erro) throw erro });

const obterUsuariosConsulta = () => `SELECT * FROM usuario`;
const obterUsuarios = () => new Promise((resolve, reject) =>
  mysqlConnection.query(obterUsuariosConsulta(), (erro, usuarios) => erro ? reject(erro) : resolve(usuarios))
);

const obterUsuarioPorIdConsulta = (idUsuario) => `SELECT * FROM usuario WHERE id = '${idUsuario}' LIMIT 1`;
const obterUsuarioPorId = (idUsuario) => new Promise((resolve, reject) =>
  mysqlConnection.query(obterUsuarioPorIdConsulta(idUsuario), (erro, usuario) => erro ? reject(erro) : resolve(usuario))
);

const obterUsuarioPorCredenciaisConsulta = (email, senha) => `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}' LIMIT 1`;
const obterUsuarioPorCredenciais = (email, senha) => new Promise((resolve, reject) =>
  mysqlConnection.query(obterUsuarioPorCredenciaisConsulta(email, senha), (erro, usuario) => erro ? reject(erro) : resolve(usuario))
);

const obterPublicacoesConsulta = () => `SELECT * FROM publicacao`;
const obterPublicacoes = () => new Promise((resolve, reject) =>
  mysqlConnection.query(obterPublicacoesConsulta(), (erro, publicacoes) => erro ? reject(erro) : resolve(publicacoes))
);

const obterPublicacoesDoUsuarioConsulta = (idUsuario) => `SELECT * FROM publicacao WHERE idUsuario  = '${idUsuario}'`;
const obterPublicacoesDoUsuario = (idUsuario) => new Promise((resolve, reject) =>
  mysqlConnection.query(obterPublicacoesDoUsuarioConsulta(idUsuario), (erro, publicacoes) => erro ? reject(erro) : resolve(publicacoes))
);

const obterComentariosConsulta = () => `SELECT * FROM comentario`;
const obterComentarios = () => new Promise((resolve, reject) =>
  mysqlConnection.query(obterComentariosConsulta(), (erro, comentarios) => erro ? reject(erro) : resolve(comentarios))
);

const obterFavoritosDoUsuarioConsulta = (idUsuario) => `SELECT * FROM favorito WHERE idUsuario = '${idUsuario}'`;
const obterFavoritosDoUsuario = (idUsuario) => new Promise((resolve, reject) =>
  mysqlConnection.query(obterFavoritosDoUsuarioConsulta(idUsuario), (erro, favoritos) => erro ? reject(erro) : resolve(favoritos))
);

const inserirUsuarioConsulta = () => `INSERT INTO usuario SET ?`;
const inserirUsuario = (usuario) => new Promise((resolve, reject) =>
  mysqlConnection.query(inserirUsuarioConsulta(), usuario, (erro, usuarioInserido) => erro ? reject(erro) : resolve(usuarioInserido))
);

const atualizarUsuarioConsulta = (idUsuario) => `UPDATE usuario SET ? WHERE id = '${idUsuario}'`;
const atualizarUsuario = (usuario) => new Promise((resolve, reject) =>
  mysqlConnection.query(atualizarUsuarioConsulta(usuario.id), usuario, (erro, usuarioAtualizado) => erro ? reject(erro) : resolve(usuarioAtualizado))
);

const deletarUsuarioConsulta = (idUsuario) => `DELETE FROM usuario WHERE id = '${idUsuario}'`;
const deletarUsuario = (idUsuario) => new Promise((resolve, reject) =>
  mysqlConnection.query(deletarUsuarioConsulta(idUsuario), erro => erro ? reject(erro) : resolve(idUsuario))
);

const inserirPublicacaoConsulta = () => `INSERT INTO publicacao SET ?`;
const inserirPublicacao = (publicacao) => new Promise((resolve, reject) =>
  mysqlConnection.query(inserirPublicacaoConsulta(), publicacao, (erro, publicacaoInserida) => erro ? reject(erro) : resolve(publicacaoInserida))
);

const inserirComentarioConsulta = () => `INSERT INTO comentario SET ?`;
const inserirComentario = (comentario) => new Promise((resolve, reject) =>
  mysqlConnection.query(inserirComentarioConsulta(), comentario, (erro, comentarioInserido) => erro ? reject(erro) : resolve(comentarioInserido))
);

const favoritarPublicacaoConsulta = () => `INSERT INTO favorito SET ?`;
const favoritarPublicacao = (favorito) => new Promise((resolve, reject) =>
  mysqlConnection.query(favoritarPublicacaoConsulta(), favorito, (erro, favoritoInserido) => erro ? reject(erro) : resolve(favoritoInserido))
);

module.exports = {
  obterUsuarios,
  obterUsuarioPorId,
  obterUsuarioPorCredenciais,
  obterPublicacoes,
  obterPublicacoesDoUsuario,
  obterComentarios,
  obterFavoritosDoUsuario,
  inserirUsuario,
  atualizarUsuario,
  deletarUsuario,
  inserirPublicacao,
  inserirComentario,
  favoritarPublicacao
};