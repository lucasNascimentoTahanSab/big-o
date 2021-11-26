function Usuario(usuario) {
  this.nome = usuario?.nome;
  this.email = usuario?.email;
  this.senha = usuario?.senha;
  this.foto = usuario?.foto ? obterFonteParaImagemAPartirDeBlob(usuario.foto) : null;
  this.id = usuario?.id;
}

function Publicacao(publicacao, comentarios) {
  this.titulo = publicacao?.titulo;
  this.descricao = publicacao?.descricao;
  this.imagem = publicacao?.imagem ? obterFonteParaImagemAPartirDeBlob(publicacao.imagem) : null;
  this.idUsuario = publicacao?.idUsuario;
  this.nomeUsuario = publicacao?.nomeUsuario;
  this.fotoUsuario = publicacao?.fotoUsuario ? obterFonteParaImagemAPartirDeBlob(publicacao.fotoUsuario) : null;
  this.dataPublicacao = obterDataPublicacaoFormatada(publicacao?.dataPublicacao);
  this.id = publicacao?.id;
  this.comentarios = comentarios ? comentarios.map(comentario => new Comentario(comentario, publicacao)) : [];
}

function Comentario(comentario, publicacao) {
  this.idUsuario = comentario?.idUsuario;
  this.idPublicacao = publicacao?.id;
  this.id = comentario?.id;
  this.nomeUsuario = comentario?.nomeUsuario;
  this.fotoUsuario = comentario?.fotoUsuario ? obterFonteParaImagemAPartirDeBlob(comentario.fotoUsuario) : null;;
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

function obterFonteParaImagemAPartirDeBlob(blob) {
  return `data:image/png;base64,${blob.toString('base64')}`;
}

module.exports = {
  Usuario,
  Publicacao,
  Favorito
};