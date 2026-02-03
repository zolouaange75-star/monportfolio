// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Vérifier les préférences sauvegardées
const savedTheme = localStorage.getItem('theme') || 'light-mode';
body.classList.add(savedTheme === 'dark-mode' ? 'dark-mode' : 'light-mode');
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci pour votre message! Je vous recontacterai bientôt.');
        contactForm.reset();
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Intersection observer for project cards (supports .project and .project-card)
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.project, .project-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s, transform 0.6s';
  observer.observe(el);
});

// Toggle "open" sur les cartes de compétences pour le toucher (mobile/tablette)
(function () {
    const skillCards = document.querySelectorAll('.skills .skill-category');
    if (!skillCards.length) return;

    skillCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // éviter toggle si l'utilisateur clique sur un élément interactif interne
            const tag = e.target.tagName.toLowerCase();
            if (['a', 'button', 'input', 'textarea', 'label'].includes(tag)) return;
            card.classList.toggle('open');
        });
    });

    // fermer les cartes ouvertes en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.skills .skill-category')) {
            document.querySelectorAll('.skills .skill-category.open').forEach(c => c.classList.remove('open'));
        }
    });
})();