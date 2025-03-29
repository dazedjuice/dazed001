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
    window.addEventListener('load', function () {
      const loadingScreen = document.getElementById('loading-screen');
      loadingScreen.style.opacity = '0'; // Fade out
      setTimeout(() => {
          loadingScreen.style.display = 'none'; // Hide after fade-out
      }, 500); // Match the transition duration
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
    
    const image = document.querySelector('img#backToTop');
    image.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

     // Popup functionality for the bathroom video
     const bathroomVideo = document.querySelector('[data-popup-id="popup-bathroom"]');
     const bathroomPopup = document.getElementById('popup-bathroom');
     const closeArea = bathroomPopup?.querySelector('.close-area'); // Select the close-area span
 
     // Ensure the video, popup, and close-area exist
     if (bathroomVideo && bathroomPopup && closeArea) {
         // Show the popup when the video is clicked
         bathroomVideo.addEventListener('click', () => {
             bathroomPopup.classList.remove('hidden'); // Show the popup
             bathroomPopup.style.display = 'block'; // Ensure the popup is visible
         });
 
         // Hide the popup when the close-area is clicked
         closeArea.addEventListener('click', () => {
             bathroomPopup.classList.add('hidden'); // Hide the popup
             bathroomPopup.style.display = 'none'; // Ensure the popup is hidden
         });
     } else {
         console.error('Bathroom video, popup, or close-area not found.');
     }
 });