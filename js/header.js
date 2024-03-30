document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.querySelector(".mobile-menu-button");
    const mobileOverlay = document.querySelector(".mobile-overlay");
    const closeButton = document.querySelector(".mobile-menu__close");

    function toggleMobileOverlay() {
      mobileOverlay.classList.toggle("active");
    }
  
    hamburgerButton.addEventListener('click', function() {
      toggleMobileOverlay();
    });
    
    closeButton.addEventListener('click', function() {
      toggleMobileOverlay();
    });
  });
  