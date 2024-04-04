document.addEventListener('DOMContentLoaded', function() {
  const hamburgerButton = document.querySelector(".mobile-menu-button");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const closeButton = document.querySelector(".mobile-menu__close");
  const mobileHeaderSearch = document.querySelector('.mobile-header-search');
  const mobileIndicatorButton = document.getElementById('search-button');

  function toggleMobileOverlay() {
    mobileOverlay.classList.toggle("active");
  }

  function toggleMobileHeaderSearch() {
    if (window.innerWidth >= 750 || !mobileIndicatorButton.classList.contains('active')) {
      mobileHeaderSearch.style.display = 'none';
    } else {
      mobileHeaderSearch.style.display = 'flex';
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
  });
});
