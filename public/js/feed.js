let postagens = [];

window.addEventListener('load', () => {
  document.getElementById('profile').addEventListener('click', abrirFecharPopover);
  document.getElementById('profile-button').addEventListener('click', irParaPerfilDoUsuario);
  document.getElementById('logout-button').addEventListener('click', sair);
  document.querySelectorAll('[data-id="bookmark"]').forEach(post => post.addEventListener('click', favoritarPost));
  document.getElementById('search').addEventListener('input', filtrarPostagens);
  obterPostagens();
});

window.addEventListener('click', fecharPopoverQuandoClicandoFora);

/**
 * Método responsável pela abertura e fechamento do popover
 * para acesso ao perfil e configurações do usuário.
 */
function abrirFecharPopover() {
  const popover = document.getElementById('profile-popover');
  if (popover.classList.contains('hidden')) popover.classList.remove('hidden');
  else popover.classList.add('hidden');
}

/**
 * Método responsável pelo fechamento do popover para acesso
 * ao perfil e configurações do usuário quando o usuário 
 * clicar fora dele.
 */
function fecharPopoverQuandoClicandoFora(event) {
  if (document.getElementById('profile').contains(event.target) || document.getElementById('profile-popover').contains(event.target)) return;

  const popover = document.getElementById('profile-popover');
  if (!popover.classList.contains('hidden')) popover.classList.add('hidden');
}

/**
 * Método responsável por redirecionar o usuário para sua
 * página de perfil.
 */
function irParaPerfilDoUsuario() {
  document.location.href = '/user';
}

/**
 * Método responsável por redirecionar o usuário para 
 * página inicial.
 */
function sair() {
  document.location.href = '/home';
}

function favoritarPost(event) {
  if (event.target.src.endsWith('img/bookmark.svg')) event.target.src = event.target.src.replace('img/bookmark.svg', 'img/bookmark-selected.svg');
  else event.target.src = event.target.src.replace('img/bookmark-selected.svg', 'img/bookmark.svg');
}

/**
 * Método responsável pela obtenção das postagens apresentadas
 * para posterior filtragem.
 */
function obterPostagens() {
  postagens = document.querySelectorAll('[data-type="post"]');
}

/**
 * Método responsável pela atualização das postagens apresentadas
 * de acordo com filtro selecionado pelo usuário na barra de pesquisa. 
 */
function filtrarPostagens(event) {
  const postagensFiltradas = Array.from(postagens).filter(postagem => postagem.dataset.title.toLowerCase().includes(event.target.value));
  removerPostagens();
  incluirPostagens(postagensFiltradas);
}

function removerPostagens() {
  const containerPostagens = document.querySelector('[data-type="post-container"]');
  containerPostagens.innerHTML = null;
}

function incluirPostagens(postagens) {
  const containerPostagens = document.querySelector('[data-type="post-container"]');
  postagens.forEach(postagem => containerPostagens.appendChild(postagem));
}