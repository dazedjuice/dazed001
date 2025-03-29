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

  // Initialize Draggable on the cat element
  const cat = document.querySelector('.cat-image');
  if (cat) {
    Draggable.create(cat, {
      type: "x,y", // Allow dragging in both x and y directions
      edgeResistance: 0.65, // Optional: Add some resistance when dragging near the edges
      bounds: "body", // Optional: Restrict dragging within the body
      inertia: true // Optional: Add inertia to the dragging
    });
  }

  // Back to top button functionality
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    });

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Check if the device is an iOS device
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    // Create a meta tag
    var metaTag = document.createElement('meta');
    // Set the name attribute to 'theme-color'
    metaTag.setAttribute('name', 'theme-color');
    // Set the content attribute to blue color
    metaTag.setAttribute('content', '#2240e0');
    // Append the meta tag to the document head
    document.head.appendChild(metaTag);
  }
// Get references to the popup, poster, and close button elements
const popup = document.querySelector('.popup.window.hidden');
const poster = document.querySelector('.poster');
const closeArea = popup.querySelector('.close-area'); // Close button area


// Add click event listener to the poster
poster.addEventListener('click', () => {
  popup.style.display = 'block';
  popup.classList.remove('hidden');
});
closeArea.addEventListener('click', () => {
  popup.style.display = 'none';
  popup.classList.add('hidden');
});



  // Get all paintings
  const paintings = document.querySelectorAll('.painting');

  // Add click event listener to each painting
  paintings.forEach((painting) => {
    painting.addEventListener('click', () => {
      // Get the popup ID from the data attribute
      const popupId = painting.getAttribute('data-popup-id');
      const popup = document.getElementById(popupId);

      // Get the static and hover images
      const staticImg = painting.querySelector('.static-img');
      const hoverImg = painting.querySelector('.hover-img');

      // Swap the static image with the hover image (GIF)
      if (staticImg && hoverImg) {
        staticImg.style.display = 'none'; // Hide the static image
        hoverImg.style.display = 'block'; // Show the GIF
      }

      // Show the popup
      if (popup) {
        popup.style.display = 'block';
        popup.classList.remove('hidden');
      }
    });
  });

  // Add click event listener to all close buttons
  const closeAreas = document.querySelectorAll('.popup .close-area');
  closeAreas.forEach((closeArea) => {
    closeArea.addEventListener('click', () => {
      const popup = closeArea.closest('.popup');
      if (popup) {
        popup.style.display = 'none'; // Hide the popup
        popup.classList.add('hidden'); // Add the hidden class

        // Reset all paintings to show the static image
        paintings.forEach((painting) => {
          const staticImg = painting.querySelector('.static-img');
          const hoverImg = painting.querySelector('.hover-img');
          if (staticImg && hoverImg) {
            staticImg.style.display = 'block'; // Show the static image
            hoverImg.style.display = 'none'; // Hide the GIF
          }
        });
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  // Get the bathroom video and its popup
  const bathroomVideo = document.querySelector('[data-popup-id="popup-bathroom"]');
  const bathroomPopup = document.getElementById('popup-bathroom');
  const closeArea = bathroomPopup.querySelector('.close-area'); // Select the close-area span

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