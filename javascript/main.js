document.addEventListener('DOMContentLoaded', () => {
  const overlayMenu = document.querySelector('.overlay-menu');
  const overlayContent = document.querySelector('.overlay-content');
  const hamburger = document.querySelector('.hamburger');
  const body = document.body;

  // Show overlay menu with animation
  hamburger.addEventListener('click', () => {
    overlayMenu.classList.add('show');
    body.style.overflow = 'hidden'; // Prevent scrolling when overlay is active
  });

  // Hide overlay menu when clicking on the white part
  overlayMenu.addEventListener('click', (event) => {
    if (!overlayContent.contains(event.target)) {
      overlayMenu.classList.remove('show');
      body.style.overflow = 'auto'; // Allow scrolling when overlay is hidden
    }
  });

  // Ensure clicks on overlay content do not close the overlay
  overlayContent.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  // Add event listeners to all links in the overlay content
  const links = overlayContent.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      // Prevent the default action to ensure the overlay is hidden before navigation
      event.preventDefault();
      const href = link.getAttribute('href');
      overlayMenu.classList.remove('show');
      body.style.overflow = 'auto'; // Allow scrolling when overlay is hidden
      // Navigate to the target page after a short delay to ensure the overlay is hidden
      setTimeout(() => {
        window.location.href = href;
      }, 300); // Adjust the delay as needed
    });
  });
});