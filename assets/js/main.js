const panels = document.querySelectorAll(".panel");
const navItems = document.querySelectorAll("nav span");

let current = 0;
let scrolling = false;

function showPanel(index) {
  if (index < 0 || index >= panels.length) return;

  panels.forEach(p => p.classList.remove("active"));
  navItems.forEach(n => n.classList.remove("active"));

  panels[index].classList.add("active");
  navItems[index].classList.add("active");

  current = index;
}

showPanel(0);

window.addEventListener("wheel", (e) => {
  if (scrolling) return;

  scrolling = true;
  setTimeout(() => scrolling = false, 700);

  if (e.deltaY > 0) showPanel(current + 1);
  else showPanel(current - 1);
});
