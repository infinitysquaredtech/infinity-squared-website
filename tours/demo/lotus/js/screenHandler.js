window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const sky = document.getElementById('panorama-sky');
    if (!loader || !sky) return;
    const hide = () => loader.style.display = 'none';
    sky.addEventListener('materialtextureloaded', hide, { once: true });
    sky.addEventListener('error', () => loader.textContent = 'Failed to load panorama', { once: true });
    
    // Fullscreen button functionality
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    fullscreenBtn.addEventListener('click', () => {
      const elem = document.documentElement;
      if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
        fullscreenBtn.querySelector('svg path').setAttribute('d', 'M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z');
        fullscreenBtn.title = 'Exit Fullscreen';
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        fullscreenBtn.querySelector('svg path').setAttribute('d', 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z');
        fullscreenBtn.title = 'Enter Fullscreen'
      }
    });
    
    // Update button icon when fullscreen changes externally
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        fullscreenBtn.querySelector('svg path').setAttribute('d', 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z');
        fullscreenBtn.title = 'Enter Fullscreen';
      }
    });

    // Panorama navigation functionality
    const panoramaBtns = document.querySelectorAll('.panorama-btn');
    const hotspotsContainer = document.getElementById('hotspots-container');

    panoramaBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const panoramaId = btn.getAttribute('data-panorama');
        const rotation = btn.getAttribute('data-rotation');
        const hotspotsRotation = btn.getAttribute('data-hotspots-rotation');
        const showHotspots = btn.getAttribute('data-show-hotspots') === 'true';

        // Remove active class from all buttons
        panoramaBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Start smooth transition
        smoothPanoramaTransition(panoramaId, rotation, hotspotsRotation, showHotspots);
      });
    });

    // Smooth panorama transition function
    function smoothPanoramaTransition(panoramaId, rotation, hotspotsRotation, showHotspots) {
      // Show loader during transition
      loader.style.display = 'flex';

      // Fade out current panorama
      if (sky.object3D && sky.object3D.material) {
        sky.object3D.material.transparent = true;
        sky.object3D.material.opacity = 1;

        // Animate fade out
        const fadeOut = () => {
          const currentOpacity = sky.object3D.material.opacity;
          if (currentOpacity > 0) {
            sky.object3D.material.opacity = Math.max(0, currentOpacity - 0.05);
            requestAnimationFrame(fadeOut);
          } else {
            // Switch panorama when faded out
            switchPanorama(panoramaId, rotation, hotspotsRotation, showHotspots);
          }
        };
        fadeOut();
      } else {
        // If no material, switch immediately
        switchPanorama(panoramaId, rotation, hotspotsRotation, showHotspots);
      }
    }

    function switchPanorama(panoramaId, rotation, hotspotsRotation, showHotspots) {
      // Change the panorama source and rotation
      sky.setAttribute('src', `#${panoramaId}`);
      if (rotation) {
        sky.setAttribute('rotation', rotation);
      }

      // Update hotspots container rotation if specified
      if (hotspotsRotation && hotspotsContainer) {
        hotspotsContainer.setAttribute('rotation', hotspotsRotation);
      }

      // Show or hide hotspots based on data-show-hotspots attribute
      if (hotspotsContainer) {
        hotspotsContainer.setAttribute('visible', showHotspots);
      }

      // Fade in new panorama when loaded
      const fadeInNewPanorama = () => {
        if (sky.object3D && sky.object3D.material) {
          sky.object3D.material.transparent = true;
          sky.object3D.material.opacity = 0;

          // Animate fade in
          const fadeIn = () => {
            const currentOpacity = sky.object3D.material.opacity;
            if (currentOpacity < 1) {
              sky.object3D.material.opacity = Math.min(1, currentOpacity + 0.05);
              requestAnimationFrame(fadeIn);
            } else {
              // Hide loader when fully visible
              loader.style.display = 'none';
            }
          };
          fadeIn();
        } else {
          // Fallback: hide loader immediately
          loader.style.display = 'none';
        }
      };

      sky.addEventListener('materialtextureloaded', fadeInNewPanorama, { once: true });
    }
});