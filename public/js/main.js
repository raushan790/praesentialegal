/* ==========================================================================
   Praesentia Legal Solutions — Interactions
   Vanilla JS · zero dependencies · superfast
   ========================================================================== */
(function () {
  'use strict';

  /* ---- Scroll progress + navbar state ---- */
  var nav = document.querySelector('.nav');
  var bar = document.querySelector('.scroll-progress');
  function onScroll() {
    var st = window.scrollY || document.documentElement.scrollTop;
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
    }
    if (nav) nav.classList.toggle('scrolled', st > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('mobile');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('mobile');
      });
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Animated counter ---- */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var started = false;
    function run() {
      if (started) return; started = true;
      var dur = 1600, t0 = performance.now();
      function step(now) {
        var p = Math.min((now - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window) {
      var c = new IntersectionObserver(function (ents) {
        if (ents[0].isIntersecting) { run(); c.disconnect(); }
      }, { threshold: 0.5 });
      c.observe(el);
    } else { run(); }
  });

  /* ---- Footer year ---- */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Contact form (progressive enhancement, no backend) ---- */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var note = form.querySelector('.form-note');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      // Simulate async send (replace with real endpoint later)
      setTimeout(function () {
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
        if (note) {
          note.innerHTML = '<span style="color:#1a8a3a;font-weight:600">✓ Thank you — we\u2019ll be in touch within one business day.</span>';
        }
      }, 1200);
    });
  }
})();