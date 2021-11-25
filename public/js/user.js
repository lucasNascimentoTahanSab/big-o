window.addEventListener('load', () => {
  document.getElementById('profile').addEventListener('click', abrirFecharPopover);
  document.getElementById('profile-button').addEventListener('click', irParaFeedDoUsuario);
  document.getElementById('logout-button').addEventListener('click', sair);
  document.getElementById('posts-button').addEventListener('click', irParaPosts);
  document.getElementById('bookmarks-button').addEventListener('click', irParaFavoritos);
  document.querySelectorAll('[data-id="bookmark"]').forEach(post => post.addEventListener('click', favoritarPost));
});

window.addEventListener('click', fecharPopoverQuandoClicandoFora);

/**
 * Método responsável pela abertura e fechamento do popover
 * para acesso ao feed e configurações do usuário.
 */
function abrirFecharPopover() {
  const popover = document.getElementById('profile-popover');
  if (popover.classList.contains('hidden')) popover.classList.remove('hidden');
  else popover.classList.add('hidden');
}

/**
 * Método responsável pelo fechamento do popover para acesso
 * ao feed e configurações do usuário quando o usuário 
 * clicar fora dele.
 */
function fecharPopoverQuandoClicandoFora(event) {
  if (document.getElementById('profile').contains(event.target) || document.getElementById('profile-popover').contains(event.target)) return;

  const popover = document.getElementById('profile-popover');
  if (!popover.classList.contains('hidden')) popover.classList.add('hidden');
}

function favoritarPost(event) {
  if (event.target.src.endsWith('img/bookmark.svg')) event.target.src = event.target.src.replace('img/bookmark.svg', 'img/bookmark-selected.svg');
  else event.target.src = event.target.src.replace('img/bookmark-selected.svg', 'img/bookmark.svg');
}

function removerPostagens() {
  const containerPostagens = document.querySelector('[data-type="post-container"]');
  containerPostagens.innerHTML = null;
}

function incluirPostagens(postagens) {
  const containerPostagens = document.querySelector('[data-type="post-container"]');
  postagens.forEach(postagem => containerPostagens.appendChild(postagem));
}

function irParaPosts() {
  const sessaoPosts = document.getElementById('posts-section');
  if (!sessaoPosts.classList.contains('hidden')) return;

  alternarBotaoPosts();
  alternarBotaoFavoritos();
  const sessaoFavoritos = document.getElementById('bookmarks-section');
  sessaoFavoritos.classList.add('hidden');
  sessaoPosts.classList.remove('hidden');
}

function irParaFavoritos() {
  const sessaoFavoritos = document.getElementById('bookmarks-section');
  if (!sessaoFavoritos.classList.contains('hidden')) return;

  alternarBotaoPosts();
  alternarBotaoFavoritos();
  const sessaoPosts = document.getElementById('posts-section');
  sessaoPosts.classList.add('hidden');
  sessaoFavoritos.classList.remove('hidden');
}

function alternarBotaoPosts() {
  const sessaoBotaoPosts = document.getElementById('posts-button');
  if (sessaoBotaoPosts.classList.contains('profile__navbar-item--selected')) sessaoBotaoPosts.classList.remove('profile__navbar-item--selected');
  else sessaoBotaoPosts.classList.add('profile__navbar-item--selected');
}

function alternarBotaoFavoritos() {
  const sessaoBotaoFavoritos = document.getElementById('bookmarks-button');
  if (sessaoBotaoFavoritos.classList.contains('profile__navbar-item--selected')) sessaoBotaoFavoritos.classList.remove('profile__navbar-item--selected');
  else sessaoBotaoFavoritos.classList.add('profile__navbar-item--selected');
}

/**
 * Método responsável por redirecionar o usuário para sua
 * página de perfil.
 */
function irParaFeedDoUsuario() {
  document.location.href = '/feed';
}

/**
 * Método responsável por redirecionar o usuário para 
 * página inicial.
 */
function sair() {
  document.location.href = '/home';
}