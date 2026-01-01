const panels = document.querySelectorAll(".panel");
const navItems = document.querySelectorAll("nav span");

let currentIndex = 0;
let scrolling = false;

// Update active nav while scrolling
function updateActiveNav() {
  panels.forEach((panel, index) => {
    const rect = panel.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      navItems.forEach(n => n.classList.remove("active"));
      navItems[index].classList.add("active");
      currentIndex = index;
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// Click / tap navigation
navItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    panels[index].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// Desktop-only wheel navigation
const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (isDesktop) {
  window.addEventListener("wheel", (e) => {
    if (scrolling) return;

    scrolling = true;
    setTimeout(() => scrolling = false, 700);

    if (e.deltaY > 0 && currentIndex < panels.length - 1) currentIndex++;
    if (e.deltaY < 0 && currentIndex > 0) currentIndex--;

    panels[currentIndex].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}
