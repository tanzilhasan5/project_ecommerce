/**
 * Storly Theme Landing Page - Main JavaScript
 * Tech Stack: ES6, Bootstrap 5.3, Smooth Scrolling, Navbar Shadow, Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Shadow Effect
  const navbar = document.querySelector('.storly-navbar');

  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Smooth Scrolling for Internal Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId === '#!') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // Calculate offset for sticky navbar (~95px)
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile navbar collapse if open
        const navbarCollapse = document.getElementById('storlyNavMenu');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      }
    });
  });

  // 3. Accessible Keyboard Navigation for Interactive Elements
  const interactiveButtons = document.querySelectorAll('.btn-storly-lime, .hero-cta-btn');
  interactiveButtons.forEach((btn) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        btn.click();
      }
    });
  });

  // 4. Parallax micro-tilt for mockup cards on desktop (subtle premium feel)
  const heroSection = document.querySelector('.storly-hero');
  const mockupCards = document.querySelectorAll('.mockup-card');

  if (heroSection && mockupCards.length > 0 && window.matchMedia('(min-width: 992px)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 8;
      const yPercent = (clientY / window.innerHeight - 0.5) * 8;

      mockupCards.forEach((card, index) => {
        const factor = (index % 2 === 0 ? 1 : -1) * 0.4;
        card.style.transform = `translate3d(${xPercent * factor}px, ${yPercent * factor}px, 0)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      mockupCards.forEach((card) => {
        card.style.transform = '';
      });
    });
  }
});
