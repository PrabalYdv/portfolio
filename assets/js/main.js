const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sections.forEach((s) => s.classList.remove('visible'));
        entry.target.classList.add('visible');

        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(
          `a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  {
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  }
);

sections.forEach((section) => observer.observe(section));
