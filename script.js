// Mobile hamburger menu – slides from the same side (right side)
const hamburger = document.getElementById('hamburgerIcon');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});

// Scroll‑triggered fade‑up animations using Intersection Observer
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

// Also check elements already in view on page load (safe double‑check)
window.addEventListener('load', () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
      observer.unobserve(el);
    }
  });

  // Apply random animation delays to floating icons for variety
  const floats = document.querySelectorAll('.floating-bg i');
  floats.forEach((icon, idx) => {
    const duration = 8 + (idx % 5);
    const delay = idx * 0.4;
    icon.style.animationDuration = `${duration}s`;
    icon.style.animationDelay = `${delay}s`;
  });
});

// Smooth anchor scrolling for internal navigation
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

// Demo button interactions (non‑intrusive, nonprofit demo)
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