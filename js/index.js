document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch data from API
    async function fetchData(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    }
  
    // Function to populate dropdown options
    function populateDropdown(selectElement, options) {
      selectElement.innerHTML = ''; // Clear existing options
      options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
      });
    }
  
    // Fetch years, makes, and models data from the same API endpoint
    fetchData('https://example.com/data')
      .then(data => {
        const yearFromSelect = document.getElementById('yearFrom');
        const yearToSelect = document.getElementById('yearTo');
        const currentMakeSelect = document.getElementById('currentMake');
        const currentModelSelect = document.getElementById('currentModel');
  
        // Extract years, makes, and models from the data
        const years = data.years;
        const makes = data.makes;
        const models = data.models;
  
        // Populate dropdowns with the fetched data
        populateDropdown(yearFromSelect, years);
        populateDropdown(yearToSelect, years);
        populateDropdown(currentMakeSelect, makes.sort());
        populateDropdown(currentModelSelect, models.sort());
      });
  
    // Add event listeners or any other necessary JavaScript logic here
  });
  

document.addEventListener('DOMContentLoaded', function() {
    const years = [/* array of years */];
    const makes = [/* array of makes */];
    const models = [/* array of models */];
    const yearFromSelect = document.getElementById('yearFrom');
    const yearToSelect = document.getElementById('yearTo');
    const zipCodeInput = document.getElementById('zipCode');
    const currentMakeSelect = document.getElementById('currentMake');
    const currentModelSelect = document.getElementById('currentModel');
    const typeSelect = document.getElementById('type');
    const certifiedCheckbox = document.getElementById('certified');
  
    years.slice().reverse().forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearFromSelect.appendChild(option);
      yearToSelect.appendChild(option.cloneNode(true));
    });
  
    makes.sort().forEach(make => {
      const option = document.createElement('option');
      option.value = make;
      option.textContent = make;
      currentMakeSelect.appendChild(option);
    });
  
    models.sort().forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      currentModelSelect.appendChild(option);
    });
  
    // Add event listeners or any other necessary JavaScript logic here
  });
  