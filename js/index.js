// Function to fetch data from API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function populateDropdown(selectElement, options, defaultValue, defaultText) {
  // Clear existing options
  selectElement.innerHTML = "";

  // Add default option
  const defaultOption = document.createElement("option");
  defaultOption.textContent = defaultText;
  defaultOption.disabled = true; // Disable the default option
  selectElement.appendChild(defaultOption);

  // Add dynamic options
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    selectElement.appendChild(optionElement);
  });

  // Set default value
  if (defaultValue || defaultValue === "") {
    selectElement.value = defaultValue;
  } else {
    selectElement.value = ""; // Set default value to empty string if defaultValue is not provided
  }
}

document.addEventListener("DOMContentLoaded", async function () {
    const yearFromSelect = document.getElementById("yearFrom");
    const yearToSelect = document.getElementById("yearTo");
    const currentMakeSelect = document.getElementById("currentMake");
    const currentModelSelect = document.getElementById("currentModel");

  // Set default values programmatically
  const defaultYearValue = "Select Year";
  const defaultMakeValue = "Select Make";
  const defaultModelValue = "Select Model";

  let years = [];

  try {
    const data = await fetchData(
      "https://api.drivechicago.cloud/lookup/yearMakeModels?apiKey=69d85981-1856-436e-a3be-99c6bc4e83b4"
    );

    const yearsSet = new Set(data.map((item) => item.year));
    const makesSet = new Set(data.map((item) => item.make));

    years = Array.from(yearsSet).sort((a, b) => b - a);
    const makes = Array.from(makesSet).sort();

    // Populate dropdowns with dynamic data
    populateDropdown(yearFromSelect, years, defaultYearValue, "Select Year"); // Set default text for Years
    populateDropdown(yearToSelect, years, defaultYearValue, "Select Year"); // Set default text for Years
    populateDropdown(currentMakeSelect, makes, defaultMakeValue, "Select Make"); // Set default text for Makes
    populateDropdown(
      currentModelSelect, [], defaultModelValue, defaultModelValue
    ); // Set default text for Models and initialize with empty options

    // Set default values for select elements from HTML
    yearFromSelect.value = defaultYearValue;
    yearToSelect.value = defaultYearValue;
    currentMakeSelect.value = defaultMakeValue;
    currentModelSelect.value = defaultModelValue;

    // Ensure "Select" is selected after populating the dropdowns
    yearFromSelect.value = "Select Year";
    yearToSelect.value = "Select Year";
    currentMakeSelect.value = "Select Make";
    currentModelSelect.value = "Select Model";

    // Store selected yearFrom and yearTo values
    let selectedYearFrom = defaultYearValue;
    let selectedYearTo = defaultYearValue;

    // Event listener to update yearTo options based on selected yearFrom
    yearFromSelect.addEventListener("change", function () {
      selectedYearFrom = yearFromSelect.value;
      const availableYearsTo = years.filter(
        (year) => year >= selectedYearFrom || year === ""
      );
      populateDropdown(yearToSelect, availableYearsTo, "", "Select Year"); // Add "Select Year" option
      yearToSelect.value = selectedYearTo; // Restore selected yearTo value
    });

    // Event listener to update yearFrom options based on selected yearTo
    yearToSelect.addEventListener("change", function () {
      selectedYearTo = yearToSelect.value;
      const availableYearsFrom = years.filter(
        (year) => year <= selectedYearTo || year === ""
      );
      populateDropdown(yearFromSelect, availableYearsFrom, "", "Select Year"); // Add "Select Year" option
      yearFromSelect.value = selectedYearFrom; // Restore selected yearFrom value
    });

    // Event listener to update model options based on selected make
    currentMakeSelect.addEventListener("change", async function () {
      const selectedMake = currentMakeSelect.value;
      const modelsForMake = data.filter((item) => item.make === selectedMake).map((item) => item.model);
      populateDropdown(currentModelSelect, modelsForMake, defaultModelValue, "Select Model");
    });

  } catch (error) {
    console.error("Error fetching and populating data:", error);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;

  prevBtn.addEventListener('click', function() {
      const cardWidth = carousel.children[0].offsetWidth;
      const cardMargin = parseInt(window.getComputedStyle(carousel.children[0]).marginRight);

      // Calculate translation value to shift one card width to the right
      const shift = -(cardWidth + cardMargin);

      // Shift each card to the right
      Array.from(carousel.children).forEach((card, index) => {
          const newPosition = parseInt(card.style.left || 0) + shift;
          card.style.left = newPosition + 'px';
      });

      // Update currentIndex
      currentIndex = Math.max(currentIndex - 1, 0);
  });

  nextBtn.addEventListener('click', function() {
      const cardWidth = carousel.children[0].offsetWidth;
      const cardMargin = parseInt(window.getComputedStyle(carousel.children[0]).marginRight);

      // Calculate translation value to shift one card width to the left
      const shift = cardWidth + cardMargin;

      // Shift each card to the left
      Array.from(carousel.children).forEach((card, index) => {
          const newPosition = parseInt(card.style.left || 0) + shift;
          card.style.left = newPosition + 'px';
      });

      // Update currentIndex
      currentIndex = Math.min(currentIndex + 1, carousel.children.length - 1);
  });
});


