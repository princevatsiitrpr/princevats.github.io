// ─── Dark Mode Toggle ───
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.classList.toggle('light-mode', savedTheme === 'light');
  updateThemeIcon();
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLightMode = html.classList.toggle('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  if (themeToggle) {
    const span = themeToggle.querySelector('span');
    if (span) {
      span.textContent = html.classList.contains('light-mode') ? '☀️' : '🌙';
    }
  }
}

// ─── Navbar scroll effect ───
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
  // trigger on load in case page is already scrolled
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}

// ─── Hamburger toggle ───
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ─── Scroll-reveal observer ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Form handler (placeholder) ───
function handleSubmit(e) {
  e.preventDefault();
  alert('Thank you for your message! I will get back to you soon.');
  e.target.reset();
}

// ─── Counter Animation for Stat Cards ───
function animateCounter(element, target, duration = 1500) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observe stat cards and animate on scroll into view
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      // Animate stat numbers (if they exist and are numeric)
      const statNumber = entry.target.querySelector('.stat-number');
      if (statNumber && !isNaN(parseInt(statNumber.textContent))) {
        const target = parseInt(statNumber.textContent);
        animateCounter(statNumber, target, 1200);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => counterObserver.observe(card));
