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

  // Functionality specific to the homepage
  const homepageElement = document.querySelector('.homepage-specific-element');
  const catImage = document.querySelector('img.cat-image'); // Select the cat image

  if (catImage) {
    // Remove previous event listeners if they exist
    catImage.onmousedown = null;
  
    let initialX, initialY, offsetX, offsetY;
    let isDragging = false;
  
    const handleMouseDown = (event) => {
      isDragging = true;
      initialX = event.clientX;
      initialY = event.clientY;
      offsetX = parseFloat(window.getComputedStyle(catImage)['left']);
      offsetY = parseFloat(window.getComputedStyle(catImage)['top']);
  
      // Add mousemove and mouseup listeners to the document
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
  
    const handleMouseMove = (event) => {
      if (!isDragging) return;
  
      const dx = event.clientX - initialX;
      const dy = event.clientY - initialY;
      const newLeft = offsetX + dx;
      const newTop = offsetY + dy;
  
      // Constrain the drag within the viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const imageWidth = catImage.offsetWidth;
      const imageHeight = catImage.offsetHeight;
  
      const constrainedLeft = Math.max(0, Math.min(newLeft, viewportWidth - imageWidth));
      const constrainedTop = Math.max(0, Math.min(newTop, viewportHeight - imageHeight));
  
      catImage.style.left = `${constrainedLeft}px`;
      catImage.style.top = `${constrainedTop}px`;
    };
  
    const handleMouseUp = (event) => {
      isDragging = false;
      // Remove mousemove and mouseup listeners from the document
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  
    catImage.addEventListener('mousedown', handleMouseDown);
    catImage.ondragstart = () => false;
  }
// Assuming you have a reference to the cat element, e.g.,
const cat = document.querySelector('.cat-image');

// Initialize Draggable on the cat element
Draggable.create(cat, {
  type: "x,y", // Allow dragging in both x and y directions
  edgeResistance: 0.65, // Optional: Add some resistance when dragging near the edges
  bounds: "body", // Optional: Restrict dragging within the body
  inertia: true // Optional: Add inertia to the dragging
});




});