document.addEventListener('DOMContentLoaded', function() {
  const hamburgerButton = document.querySelector(".mobile-menu-button");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const closeButton = document.querySelector(".mobile-menu__close");
  const mobileHeaderSearch = document.querySelector(".mobile-header-search");
  const mobileIndicatorButton = document.getElementById("search-button");
  const mobileSearchMenu = document.querySelector(".mobile-search-menu");
  const closeSearchMenu = document.querySelectorAll(".mobile-search-menu-close");

  function toggleMobileOverlay() {
    mobileOverlay.classList.toggle("active");
  }

  function toggleMobileHeaderSearch() {
    if (window.innerWidth >= 750) {
      mobileHeaderSearch.style.display = 'flex';
      mobileSearchMenu.classList.remove('active'); // Remove 'active' class from mobileSearchMenu
    } else {
      mobileHeaderSearch.style.display = 'none';
    }
  }

  toggleMobileHeaderSearch(); // Call the function initially to set the display based on initial viewport width

  window.addEventListener('resize', function () {
    toggleMobileHeaderSearch(); // Call the function whenever the viewport is resized
  });

  hamburgerButton.addEventListener('click', function() {
    toggleMobileOverlay();
  });
  
  closeButton.addEventListener('click', function() {
    toggleMobileOverlay();
  });

  mobileIndicatorButton.addEventListener('click', function() {
    mobileIndicatorButton.classList.toggle('active');
    toggleMobileHeaderSearch();
    mobileSearchMenu.classList.toggle('active'); // Toggle mobileSearchMenu visibility
  });

  // Add event listener to each closeSearchMenu element
  closeSearchMenu.forEach(function(menuCloseButton) {
    menuCloseButton.addEventListener('click', function() {
      mobileSearchMenu.classList.remove('active'); // Close mobileSearchMenu
    });
  });
});
