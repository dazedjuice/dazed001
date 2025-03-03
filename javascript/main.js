document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const buttonContainer = document.getElementById("button-container");
  
    hamburger.addEventListener("click", function() {
      buttonContainer.classList.toggle("show");
    });
  });