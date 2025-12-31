const panels = document.querySelectorAll(".panel");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        panels.forEach(p => p.classList.remove("active"));
        entry.target.classList.add("active");

        navLinks.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(
          `a[href="#${entry.target.id}"]`
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { threshold: 0.6 }
);

panels.forEach(panel => observer.observe(panel));