const panels = document.querySelectorAll(".panel");
const navItems = document.querySelectorAll("nav span");

let currentIndex = 0;
let scrolling = false;
let mouseX = 0;
let mouseY = 0;

// Mouse glow effect
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  document.body.classList.add('mouse-active');
  document.body.style.setProperty('--mouse-x', `${mouseX}px`);
  document.body.style.setProperty('--mouse-y', `${mouseY}px`);
  
  // Position the glow
  const glow = document.body;
  glow.style.setProperty('--glow-x', `${mouseX}px`);
  glow.style.setProperty('--glow-y', `${mouseY}px`);
  
  // Update CSS custom property for glow position
  document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
});

// Add dynamic glow positioning via inline style
const style = document.createElement('style');
style.textContent = `
  body::before {
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
  }
`;
document.head.appendChild(style);

// Update active nav while scrolling
function updateActiveNav() {
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  
  panels.forEach((panel, index) => {
    const rect = panel.getBoundingClientRect();
    const panelTop = rect.top + window.scrollY;
    const panelBottom = panelTop + rect.height;
    
    if (scrollPosition >= panelTop && scrollPosition < panelBottom) {
      navItems.forEach(n => n.classList.remove("active"));
      navItems[index].classList.add("active");
      currentIndex = index;
    }
  });
}

// Smooth scroll with requestAnimationFrame
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveNav();
      ticking = false;
    });
    ticking = true;
  }
});

// Click / tap navigation with smooth scroll
navItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const targetPanel = panels[index];
    const targetPosition = targetPanel.offsetTop;
    
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
    
    // Update active state immediately
    navItems.forEach(n => n.classList.remove("active"));
    item.classList.add("active");
    currentIndex = index;
  });
});

// Desktop-only wheel navigation with smooth scrolling
const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (isDesktop) {
  let wheelTimeout;
  
  window.addEventListener("wheel", (e) => {
    // Clear existing timeout
    clearTimeout(wheelTimeout);
    
    // Debounce wheel events
    wheelTimeout = setTimeout(() => {
      if (scrolling) return;
      
      const delta = Math.sign(e.deltaY);
      
      // Determine if we should navigate to next/previous section
      if (delta > 0 && currentIndex < panels.length - 1) {
        currentIndex++;
        scrollToPanel(currentIndex);
      } else if (delta < 0 && currentIndex > 0) {
        currentIndex--;
        scrollToPanel(currentIndex);
      }
    }, 50);
  }, { passive: true });
}

function scrollToPanel(index) {
  if (scrolling) return;
  
  scrolling = true;
  
  const targetPanel = panels[index];
  const targetPosition = targetPanel.offsetTop;
  
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth"
  });
  
  // Update active nav
  navItems.forEach(n => n.classList.remove("active"));
  navItems[index].classList.add("active");
  
  // Allow next scroll after animation completes
  setTimeout(() => {
    scrolling = false;
  }, 1000);
}

// Initialize on load
window.addEventListener('load', updateActiveNav);