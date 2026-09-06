/* =========================================================
   OTTICA STROZZI — SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- HEADER: change appearance on scroll ---------- */
  var header = document.getElementById('site-header');

  function updateHeaderState() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* ---------- MOBILE MENU ---------- */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  function openMenu() {
    mobileMenu.classList.add('open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Chiudi il menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Apri il menu');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', function () {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close mobile menu with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      menuToggle.focus();
    }
  });

  /* ---------- SMOOTH SCROLL FOR INTERNAL LINKS ---------- */
  var internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId.length <= 1) return; // "#" alone (e.g. top button placeholder)

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var headerOffset = 90;
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });

  /* ---------- SCROLL-TRIGGERED REVEAL ANIMATIONS ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-up');

  if (prefersReducedMotion) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  } else if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* Trigger hero reveal immediately on load */
  window.requestAnimationFrame(function () {
    document.querySelectorAll('.hero .reveal').forEach(function (el) {
      el.classList.add('in-view');
    });
  });

  /* ---------- BACK TO TOP BUTTON ---------- */
  var backToTop = document.getElementById('back-to-top');

  function toggleBackToTop() {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

});
