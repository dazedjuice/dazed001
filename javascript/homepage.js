// homepage.js
document.addEventListener('DOMContentLoaded', function() {
    const catImage = document.querySelector('img.cat-image');

    if (catImage) {
      catImage.onmousedown = null;

      let initialX, initialY, offsetX, offsetY;
      let isDragging = false;

      const handleMouseDown = (event) => {
        isDragging = true;
        initialX = event.clientX;
        initialY = event.clientY;
        offsetX = parseFloat(window.getComputedStyle(catImage)['left']);
        offsetY = parseFloat(window.getComputedStyle(catImage)['top']);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };

      const handleMouseMove = (event) => {
        if (!isDragging) return;

        const dx = event.clientX - initialX;
        const dy = event.clientY - initialY;
        const newLeft = offsetX + dx;
        const newTop = offsetY + dy;

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
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      catImage.addEventListener('mousedown', handleMouseDown);
      catImage.ondragstart = () => false;
    }
    const cat = document.querySelector('.cat-image');

    // Initialize Draggable on the cat element
    Draggable.create(cat, {
      type: "x,y", // Allow dragging in both x and y directions
      edgeResistance: 0.65, // Optional: Add some resistance when dragging near the edges
      bounds: "body", // Optional: Restrict dragging within the body
      inertia: true // Optional: Add inertia to the dragging
    });

    const gallery = document.querySelector('.gif.gallery');
    const videos = Array.from(gallery.querySelectorAll('video'));
    videos.forEach(video => {
      video.addEventListener('mouseover', () => {
        video.play().catch(error => {
          console.error('Error attempting to play', error);
        });
      });
      video.addEventListener('mouseout', () => {
        video.pause();
      });
    });
  });