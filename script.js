// ============================================================
// PRELOADER – CORRECTED IIFE
// ============================================================
(function() {
  'use strict';

  const video = document.getElementById('intro-video');
  const preloader = document.getElementById('preloader');

  // Helper: remove preloader and enable scroll
  function dismissPreloader() {
    if (!preloader) return;
    preloader.classList.add('preloader-hidden');
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.remove();
        document.body.classList.add('preloader-done');
      }
    }, 700);
  }

  // Helper: force-dismiss (error / fallback)
  function forceDismiss() {
    if (!preloader) return;
    preloader.remove();
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.classList.add('preloader-done');
  }

  // Check if user already watched this session
  if (sessionStorage.getItem('introWatched') === 'true') {
    forceDismiss();
    return;
  }

  // If video already ended before we attached listener
  if (video.ended) {
    sessionStorage.setItem('introWatched', 'true');
    dismissPreloader();
    return;
  }

  // Normal flow: wait for video to end
  let endedFired = false;

  function onVideoEnded() {
    if (endedFired) return;
    endedFired = true;
    sessionStorage.setItem('introWatched', 'true');
    dismissPreloader();
  }

  video.addEventListener('ended', onVideoEnded);

  // Error handling
  video.addEventListener('error', function() {
    forceDismiss();
  });

  // Safety timeout: dismiss after 30 seconds if video never ends
  const safetyTimer = setTimeout(function() {
    if (!endedFired && preloader && preloader.parentNode) {
      sessionStorage.setItem('introWatched', 'true');
      forceDismiss();
    }
  }, 30000);

  // Cleanup timer if we dismiss early
  const origDismiss = dismissPreloader;
  dismissPreloader = function() {
    clearTimeout(safetyTimer);
    origDismiss.call(this);
  };

  const origForce = forceDismiss;
  forceDismiss = function() {
    clearTimeout(safetyTimer);
    origForce.call(this);
  };

  // Expose a helper for other scripts to know when preloader is done
  window.__preloaderDone = function() {
    return document.body.classList.contains('preloader-done');
  };

})();

// ============================================================
// HAMBURGER MENU (slides from right)
// ============================================================
const hamburger = document.getElementById('hamburgerIcon');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});

// ============================================================
// SCROLL‑TRIGGERED FADE‑UP ANIMATIONS
// ============================================================
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });

fadeElements.forEach(el => observer.observe(el));

// Also check elements already in view on load
window.addEventListener('load', () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
      observer.unobserve(el);
    }
  });

  // Random floating icon animations
  const floats = document.querySelectorAll('.floating-bg i');
  floats.forEach((icon, idx) => {
    const duration = 8 + (idx % 5);
    const delay = idx * 0.4;
    icon.style.animationDuration = `${duration}s`;
    icon.style.animationDelay = `${delay}s`;
  });
});

// ============================================================
// SMOOTH ANCHOR SCROLLING
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// BUTTON INTERACTIONS (demo)
// ============================================================
const donateBtn = document.getElementById('donateBtn');
if (donateBtn) {
  donateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Thank you for supporting Amar Shopno Foundation! Donation portal coming soon.');
  });
}

const volunteerBtn = document.getElementById('volunteerBtn');
if (volunteerBtn) {
  volunteerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Join our volunteer family! We will reach out soon.');
  });
}