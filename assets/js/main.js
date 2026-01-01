const panels = document.querySelectorAll(".panel");
const navItems = document.querySelectorAll("nav span");

let current = 0;
let scrolling = false;

// TRUE device detection
const isTouchDevice =
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

// Desktop panel switch
function showPanel(index) {
  if (index < 0 || index >= panels.length) return;

  panels.forEach(p => p.classList.remove("active"));
  navItems.forEach(n => n.classList.remove("active"));

  panels[index].classList.add("active");
  navItems[index].classList.add("active");

  current = index;
}

// DESKTOP: wheel navigation
if (!isTouchDevice) {
  showPanel(0);

  window.addEventListener("wheel", (e) => {
    if (scrolling) return;

    scrolling = true;
    setTimeout(() => scrolling = false, 700);

    if (e.deltaY > 0) showPanel(current + 1);
    else showPanel(current - 1);
  });
}

// CLICK / TAP NAVIGATION
navItems.forEach((item, index) => {
  item.addEventListener("click", () => {

    if (!isTouchDevice) {
      showPanel(index);
    } else {
      panels[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  });
});
