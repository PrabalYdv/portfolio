const panels = document.querySelectorAll(".panel");
const navItems = document.querySelectorAll("nav span");

let current = 0;
let scrolling = false;

// Detect touch devices
const isTouch =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

// Show panel (desktop mode)
function showPanel(index) {
  if (index < 0 || index >= panels.length) return;

  panels.forEach(p => p.classList.remove("active"));
  navItems.forEach(n => n.classList.remove("active"));

  panels[index].classList.add("active");
  navItems[index].classList.add("active");

  current = index;
}

// DESKTOP ONLY – wheel navigation
if (!isTouch) {
  showPanel(0);

  window.addEventListener(
    "wheel",
    (e) => {
      if (scrolling) return;

      scrolling = true;
      setTimeout(() => (scrolling = false), 700);

      if (e.deltaY > 0) showPanel(current + 1);
      else showPanel(current - 1);
    },
    { passive: true }
  );
}

// TAP / CLICK NAVIGATION (ALL DEVICES)
navItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    showPanel(index);

    // Smooth scroll for mobile
    if (isTouch) {
      panels[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
