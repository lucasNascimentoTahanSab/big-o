window.addEventListener('load', () => {
  document.getElementById('profile').addEventListener('click', abrirFecharPopover);
  document.getElementById('profile-button').addEventListener('click', irParaPerfilDoUsuario);
  document.getElementById('bookmark').addEventListener('click', favoritarPost);
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

function favoritarPost(event) {
  if (event.target.src.endsWith('img/bookmark.svg')) event.target.src = event.target.src.replace('img/bookmark.svg', 'img/bookmark-selected.svg');
  else event.target.src = event.target.src.replace('img/bookmark-selected.svg', 'img/bookmark.svg');
}