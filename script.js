/* ============================================
   IMPACTO DE VENDAS — Landing Page Scripts
   ============================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Staggered delay helper ----------
  function applyStaggeredDelays(selector, delayStep) {
    if (prefersReducedMotion) return;
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.style.setProperty('--stagger-delay', (i * delayStep) + 'ms');
    });
  }

  // Apply stagger to grid children
  applyStaggeredDelays('.content-grid .content-card', 60);
  applyStaggeredDelays('.benefits-grid .benefit-card', 70);
  applyStaggeredDelays('.proof-grid .proof-card', 50);
  applyStaggeredDelays('.bonus-grid .bonus-card', 80);
  applyStaggeredDelays('.video-grid .video-card', 80);

  // ---------- Intersection Observer for fade-in animations ----------
  const fadeEls = document.querySelectorAll('.fade-in');

  if (prefersReducedMotion) {
    fadeEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else if ('IntersectionObserver' in window) {
    const isMobile = window.innerWidth < 640;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: isMobile ? 0.08 : 0.12,
        rootMargin: '0px 0px -32px 0px'
      }
    );

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---------- Lightbox for proof images ----------
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('.lightbox__img') : null;
  var lightboxClose = lightbox ? lightbox.querySelector('.lightbox__close') : null;
  var proofCards = document.querySelectorAll('.proof-card img');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  proofCards.forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // ---------- Smooth scroll for CTA links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });
})();
