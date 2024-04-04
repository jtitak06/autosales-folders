document.addEventListener('DOMContentLoaded', function () {
    const mileageInput = document.getElementById('mileage');
    const zipCodeInput = document.getElementById('zipCode');
    const emailInput = document.getElementById('email');
    const submitButton = document.getElementById('submit-button');
  
    submitButton.addEventListener('click', function (event) {
      event.preventDefault();
      const mileage = parseInt(mileageInput.value.replace(/\D/g, ''), 10);
      const zipCode = parseInt(zipCodeInput.value.replace(/\D/g, ''), 10);
      const email = emailInput.value;
  
    });
  });
  