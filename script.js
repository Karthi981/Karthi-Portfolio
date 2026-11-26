const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.addEventListener('load', () => setTimeout(() => document.body.classList.add('loaded'), 450));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
  document.body.style.overflow = open ? '' : 'hidden';
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', (event) => {
    glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  }, { passive: true });
}

if (!reduceMotion && window.gsap) {
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.site-header', { y: -24, opacity: 0, duration: .7 })
    .from('.hero .eyebrow', { y: 18, opacity: 0, duration: .55 }, '-=.32')
    .from('.hero-title .line', { yPercent: 115, duration: .9, stagger: .1 }, '-=.2')
    .from('.hero-bottom, .hero-index', { y: 18, opacity: 0, duration: .6 }, '-=.4');

  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.to(element, {
      opacity: 1, y: 0, duration: .75, ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 86%', once: true }
    });
  });

  gsap.utils.toArray('.project-image').forEach((image) => {
    gsap.fromTo(image, { yPercent: 8 }, {
      yPercent: -8, ease: 'none',
      scrollTrigger: { trigger: image.closest('.project'), start: 'top bottom', end: 'bottom top', scrub: .8 }
    });
  });

  gsap.fromTo('.about-image', { yPercent: -5 }, {
    yPercent: 7, ease: 'none',
    scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.style.cssText = 'opacity:1;transform:none');
}

document.getElementById('year').textContent = new Date().getFullYear();
