const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');
const yearNode = document.getElementById('year');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

if (yearNode) yearNode.textContent = new Date().getFullYear();
