const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const modal = document.querySelector('.evidence-modal');
const modalTitle = modal.querySelector('h2');
const modalText = modal.querySelector('p:not(.modal-note)');
const welcome = document.querySelector('.welcome-screen');
const matrixRain = welcome.querySelector('.matrix-rain');

const renderMatrixRain = () => {
  const columnStep = window.matchMedia('(max-width: 700px)').matches ? 9 : 16;
  const columnCount = Math.ceil(window.innerWidth / columnStep);
  matrixRain.style.setProperty('--matrix-step', `${columnStep}px`);
  if (matrixRain.childElementCount === columnCount) return;

  const columns = document.createDocumentFragment();
  for (let index = 0; index < columnCount; index += 1) {
    const column = document.createElement('span');
    const digitCount = 34 + Math.floor(Math.random() * 23);
    column.className = 'matrix-column';
    column.style.setProperty('--column', index);
    column.style.setProperty('--stream-opacity', (0.5 + Math.random() * 0.5).toFixed(2));
    column.style.setProperty('--rain-speed', `${18 + Math.random() * 14}s`);
    column.style.setProperty('--rain-delay', `${-Math.random() * 26}s`);
    column.textContent = Array.from({ length: digitCount }, () => Math.random() < 0.5 ? '0' : '1').join('\n');
    columns.append(column);
  }
  matrixRain.replaceChildren(columns);
};

renderMatrixRain();
window.addEventListener('resize', renderMatrixRain);

welcome.showModal();
welcome.querySelector('.welcome-button').addEventListener('click', () => welcome.close());
welcome.addEventListener('close', () => document.body.append(matrixRain));

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  menuButton.title = isOpen ? 'Cerrar menú' : 'Abrir menú';
  if (isOpen) nav.querySelector('a').focus();
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  menuButton.title = 'Abrir menú';
}));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    menuButton.title = 'Abrir menú';
    menuButton.focus();
  }
});

document.querySelectorAll('.view-button').forEach((button) => button.addEventListener('click', () => {
  modalTitle.textContent = button.dataset.title;
  modalText.textContent = button.dataset.text;
  modal.showModal();
}));

document.querySelector('.close-modal').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});