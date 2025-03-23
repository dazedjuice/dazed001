document.addEventListener('DOMContentLoaded', function() {
    // Common functionality for both pages
    const hamburger = document.getElementById('hamburger');
    const overlayMenu = document.querySelector('.overlay-menu');
    const overlayContent = document.querySelector('.overlay-content');
    const body = document.body;
  
    if (hamburger) {
      hamburger.addEventListener('click', function() {
        overlayMenu.classList.toggle('show');
        body.style.overflow = overlayMenu.classList.contains('show') ? 'hidden' : 'auto'; // Toggle scrolling based on overlay state
      });
    }
  
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
  
    // Functionality specific to the contact page
    const emailLink = document.querySelector('.note.email');
    const instagramLink = document.querySelector('.note.instagram');
    const tiktokLink = document.querySelector('.note.tiktok');
  
    if (emailLink && instagramLink && tiktokLink) {
      // Add any specific event listeners or functionality for the contact page
      emailLink.addEventListener('click', function() {
        console.log('Email link clicked');
      });
  
      instagramLink.addEventListener('click', function() {
        console.log('Instagram link clicked');
      });
  
      tiktokLink.addEventListener('click', function() {
        console.log('TikTok link clicked');
      });
    }
    const image = document.querySelector('img#backToTop');
    image.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

});