document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const overlayMenu = document.getElementById("overlay-menu");
    const body = document.body;
  
    hamburger.addEventListener("click", function() {
      const isMenuVisible = overlayMenu.classList.contains("show");
      overlayMenu.classList.toggle("show");
      body.style.overflow = isMenuVisible ? "auto" : "hidden"; // Toggle body overflow
    });
  });