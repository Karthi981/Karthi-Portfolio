const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => setTimeout(() => document.body.classList.add('loaded'), 650));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
  document.body.style.overflow = open ? '' : 'hidden';
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
}));

if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', (event) => {
    glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  }, { passive: true });
  document.querySelectorAll('a, button').forEach((item) => {
    item.addEventListener('mouseenter', () => glow.style.opacity = '.35');
    item.addEventListener('mouseleave', () => glow.style.opacity = '1');
  });
}

if (!reduceMotion) {
  const image = document.querySelector('.about-image');
  window.addEventListener('scroll', () => {
    const rect = image.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      image.style.transform = `translateY(${Math.round((window.innerHeight / 2 - rect.top) * .07)}px)`;
    }
  }, { passive: true });
}

document.getElementById('year').textContent = new Date().getFullYear();
