const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const header = document.getElementById('header');
const navLinks = mainNav.querySelectorAll('a');
const sections = document.querySelectorAll('section[id]');

navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

function updateActiveNav() {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

const revealElements = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
});

revealElements.forEach(el => revealObserver.observe(el));

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Gracias por tu mensaje, ' + document.getElementById('nombre').value + '. Te responderemos a la brevedad.');
        contactForm.reset();
    });
}
