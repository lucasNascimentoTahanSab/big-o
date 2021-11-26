function Usuario(usuario) {
  this.nome = usuario?.nome;
  this.email = usuario?.email;
  this.senha = usuario?.senha;
  this.foto = usuario?.foto;
  this.id = usuario?.id;
}

function Publicacao(publicacao, usuario, comentarios) {
  this.titulo = publicacao?.titulo;
  this.descricao = publicacao?.descricao;
  this.imagem = publicacao?.imagem;
  this.idUsuario = usuario?.id;
  this.nomeUsuario = usuario?.nome;
  this.fotoUsuario = usuario?.foto;
  this.dataPublicacao = obterDataPublicacaoFormatada(publicacao?.dataPublicacao);
  this.id = publicacao?.id;
  this.comentarios = comentarios ? comentarios.map(comentario => new Comentario(comentario, usuario, publicacao)) : [];
}

function Comentario(comentario, usuario, publicacao) {
  this.idUsuario = usuario?.id;
  this.idPublicacao = publicacao?.id;
  this.id = comentario?.id;
  this.nomeUsuario = usuario?.nome;
  this.fotoUsuario = usuario?.foto;
  this.descricao = comentario?.descricao;
}

function Favorito(favorito, usuario, publicacao) {
  this.id = favorito?.id;
  this.idUsuario = usuario?.id;
  this.idPublicacao = publicacao?.id;
}

function obterDataPublicacaoFormatada(dataPublicacao) {
  const data = new Date(dataPublicacao);

  return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
}

module.exports = {
  Usuario,
  Publicacao,
  Favorito
};