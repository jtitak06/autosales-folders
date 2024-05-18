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

// Function to toggle the side menu
function toggleSideMenu() {
    const sideMenuOverlay = document.querySelector(".side-menu-overlay");
    sideMenuOverlay.classList.toggle("show");
}

// Event listener for the close button
document.querySelector(".mobile-side-menu-close").addEventListener("click", function() {
    toggleSideMenu(); // Call the toggleSideMenu function when the close button is clicked
});

// Function to toggle active class on results-side-menu-dropdown
function toggleDropdown() {
    const dropdownList = this.nextElementSibling.nextElementSibling; // Get the next sibling element, which is the dropdown list
    dropdownList.classList.toggle('active');

    // Get the SVG element
    const svgIcon = this.querySelector('.results-side-menu-icon');

    // Toggle the SVG icon based on the presence of the 'active' class
    if (dropdownList.classList.contains('active')) {
        // Dropdown is active, change the SVG icon
        svgIcon.setAttribute('viewBox', '0 0 448 512');
        svgIcon.innerHTML = '<path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>'; // SVG path for active state
    } else {
        // Dropdown is inactive, change the SVG icon
        svgIcon.setAttribute('viewBox', '0 0 448 512');
        svgIcon.innerHTML = '<path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>'; // SVG path for inactive state
    }
}

// Event listener to toggle active class on click of results-side-menu-dropdown
document.querySelectorAll('.results-side-menu-dropdown').forEach(button => {
    button.addEventListener('click', toggleDropdown);
    button.addEventListener('blur', () => {
        const dropdownList = button.nextElementSibling;
        dropdownList.classList.remove('active');
    });
});

// Handle form submission
/* document.querySelectorAll('[data-type="search-button"]').forEach(button => {
    button.addEventListener('click', async () => {
        const make = document.getElementById('make').value;
        const model = document.getElementById('model').value;
        
        const requestData = {
          make,
          model
        };
      
        try {
          const response = await fetchSearchResults(requestData);
          const searchResultsDiv = document.getElementById('search-results');
          searchResultsDiv.innerHTML = renderSearchResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
    });
  });

  async function handleClickSearch() {
    const searchParams = {
      zip: "your_zip_value",
      distance: "your_distance_value",
      type: "your_type_value",
      certified: "your_certified_value",
      yearFrom: "your_yearFrom_value",
      yearTo: "your_yearTo_value",
      makeArray: ["make1", "make2"], // Example: ["Toyota", "Honda"]
      modelArray: ["model1", "model2"], // Example: ["Camry", "Accord"]
      colorsArray: ["color1", "color2"], // Example: ["Red", "Blue"]
      bodyArray: ["body1", "body2"], // Example: ["Sedan", "SUV"]
      mileageArray: [{ value: "mileage1" }, { value: "mileage2" }], // Example: [{ value: "Under 50,000" }, { value: "50,000 - 100,000" }]
      priceArray: [{ value: "price1" }, { value: "price2" }], // Example: [{ value: "$10,000 - $20,000" }, { value: "$20,000 - $30,000" }]
      engineArray: ["engine1", "engine2"], // Example: ["4-Cylinder", "6-Cylinder"]
      transmissionArray: ["transmission1", "transmission2"], // Example: ["Automatic", "Manual"]
      trainArray: ["train1", "train2"], // Example: ["Front-Wheel Drive", "All-Wheel Drive"]
    };
  
    const queryParams = {
      zip: searchParams.zip,
      distance: searchParams.distance,
      type: searchParams.type,
      certified: searchParams.certified,
      yearFrom: searchParams.yearFrom,
      yearTo: searchParams.yearTo,
      makes: searchParams.makeArray.join(","),
      models: searchParams.modelArray.join(","),
      colors: searchParams.colorsArray.join(","),
      bodyStyles: searchParams.bodyArray.join(","),
      mileage: searchParams.mileageArray.length > 0 ? searchParams.mileageArray.map((item) => item.value).join(",") : "",
      price: searchParams.priceArray.length > 0 ? searchParams.priceArray.map((price) => price.value).join(",") : "",
      engines: searchParams.engineArray.join(","),
      transmissions: searchParams.transmissionArray.join(","),
      driveTrains: searchParams.trainArray.join(","),    
      rows: 10
    };
  
    try {
      // Simulate fetching search results
      const searchResults = await fetchSearchResults(queryParams);
      console.log("Search results:", searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }
  
  // Function to fetch search results (simulated for now)
  async function fetchSearchResults(queryParams) {
    // Simulated search results
    const simulatedResults = [
      { make: "Toyota", model: "Camry" },
      { make: "Honda", model: "Accord" },
      // Add more simulated results as needed
    ];
    return simulatedResults;
  }
  
  // Call the function to handle search
  handleClickSearch();  
  
  // Function to render search results
  function renderSearchResults(results) {
    let html = '';
    results.forEach(result => {
      html += `<div>${result.make} ${result.model}</div>`;
    });
    return html;
  } */

// Function to populate dropdown options
function populateDropdown(selectElement, options, defaultValue, defaultText) {
    // Clear existing options
    selectElement.innerHTML = "";

    // Add default option if provided
    if (defaultText && defaultValue !== "") {
        const defaultOption = document.createElement("option");
        defaultOption.textContent = defaultText;
        defaultOption.disabled = true; // Disable the default option
        selectElement.appendChild(defaultOption);
    }

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

// Global array to store all selected makes
let selectedMakes = [];

// Function to add selected make to the selected make list
async function addSelectedMake(make, selectedMakeList) {
    // Check if the make is already in the selected list
    const isDuplicate = [...selectedMakeList.querySelectorAll('.results-dropdown-selected-list-item')]
        .some(item => item.textContent.trim() === make.trim());

    // If it's not a duplicate, add it to the list
    if (!isDuplicate) {
        const listItem = document.createElement('li');
        listItem.classList.add('results-dropdown-selected-list-item');
        listItem.textContent = make;

        // Add close button
        const closeButton = document.createElement('button');
        closeButton.classList.add('results-dropdown-selected-close-button');
        closeButton.innerHTML = '<svg class="results-dropdown-selected-close-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>';
        closeButton.addEventListener('click', async function() {
            listItem.remove();
            // Remove the make from the selectedMakes array
            const index = selectedMakes.indexOf(make);
            if (index !== -1) {
                selectedMakes.splice(index, 1);
            }
            await removeSelectedModels(make); // Remove associated models
        });

        listItem.appendChild(closeButton);
        selectedMakeList.appendChild(listItem); // Append to the selectedMakeList
        
        // Add the selected make to the array
        selectedMakes.push(make);

        // Ensure populateModelDropdown is called after adding the make
        await populateModelDropdown(); // Wait for populateModelDropdown to complete

        // Log the model dropdown
        const modelDropdown = document.querySelectorAll('.results-dropdown-list[data-type="model"]');
    }
};

// Function to add selected model to the selected model list
async function addSelectedModel(model, selectedModelList) {
    console.log(model, 'Model being added...')
    // Check if selectedModelList is null or undefined
    if (!selectedModelList) {
        console.error('Selected model list is null or undefined.');
        return;
    }

    // Check if the model is already in the selected list
    const isDuplicate = [...selectedModelList.querySelectorAll('.results-dropdown-selected-list-item')]
        .some(item => item.textContent.trim() === model.trim());

    // If it's not a duplicate, add it to the list
    if (!isDuplicate) {
        const listItem = document.createElement('li');
        listItem.classList.add('results-dropdown-selected-list-item');
        listItem.textContent = model;

        // Add close button
        const closeButton = document.createElement('button');
        closeButton.classList.add('results-dropdown-selected-close-button');
        closeButton.innerHTML = '<svg class="results-dropdown-selected-close-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>';
        closeButton.addEventListener('click', async function() {
            listItem.remove();
            // You can add a function here to handle model deletion if needed
        });

        listItem.appendChild(closeButton);
        selectedModelList.appendChild(listItem); // Append to the selectedModelList
    }
};

document.addEventListener("DOMContentLoaded", async function () {
    // Select the dropdown elements using querySelectorAll to target both desktop and mobile elements
    const yearFromSelect = document.querySelectorAll(".results-side-menu-select[data-type='from']");
    const yearToSelect = document.querySelectorAll(".results-side-menu-select[data-type='to']");
    const makeDropdownLists = document.querySelectorAll('.results-dropdown-list[data-type="make"]');
    const selectedModelLists = document.querySelectorAll('.results-dropdown-selected-list[data-type="selected-model"]');

    // Set default values programmatically
    const defaultYearValue = "Select Year";

    let years = [];

    // Fetch data from API
    try {
        const data = await fetchData(
            "https://api.drivechicago.cloud/lookup/yearMakeModels?apiKey=69d85981-1856-436e-a3be-99c6bc4e83b4"
        );

        const yearsSet = new Set(data.map((item) => item.year));
        const makesSet = new Set(data.map((item) => item.make));

        years = Array.from(yearsSet).sort((a, b) => b - a);
        const makes = Array.from(makesSet).sort();

        // Populate yearFrom and yearTo dropdowns with dynamic data
        yearFromSelect.forEach(select => populateDropdown(select, years, defaultYearValue, "Select Year"));
        yearToSelect.forEach(select => populateDropdown(select, years, defaultYearValue, "Select Year"));

        // Ensure "Select" is selected after populating the dropdowns
        yearFromSelect.forEach(select => select.value = defaultYearValue);
        yearToSelect.forEach(select => select.value = defaultYearValue);

        // Store selected yearFrom and yearTo values
        let selectedYearFrom = defaultYearValue;
        let selectedYearTo = defaultYearValue;

        // Event listener to update yearTo options based on selected yearFrom
        yearFromSelect.forEach(select => {
            select.addEventListener("change", async function () {
                selectedYearFrom = select.value;
                const availableYearsTo = years.filter(
                    (year) => year >= selectedYearFrom || year === ""
                );
                yearToSelect.forEach(select => populateDropdown(select, availableYearsTo, select.value, "Select Year"));
            });
        });

        // Event listener to update yearFrom options based on selected yearTo
        yearToSelect.forEach(select => {
            select.addEventListener("change", async function () {
                selectedYearTo = select.value;
                const availableYearsFrom = years.filter(
                    (year) => year <= selectedYearTo || year === ""
                );
                yearFromSelect.forEach(select => populateDropdown(select, availableYearsFrom, select.value, "Select Year"));
            });
        });

// Populate make dropdown list with dynamic data
makes.forEach((make, index) => {
    makeDropdownLists.forEach(makeDropdownList => {
        const selectedMakeList = makeDropdownList.closest('.results-section').querySelector('.results-dropdown-selected-list');
        const listItem = document.createElement('li');
        listItem.classList.add('results-dropdown-list-item');
        listItem.key = index;

        const button = document.createElement('button');
        button.classList.add('results-dropdown-list-button');
        button.textContent = make;
        const dropdownId = make.replace(/\s+/g, '-').toLowerCase(); // Generate a unique ID based on make name
        button.setAttribute('data-dropdown-id', dropdownId); // Assign the dropdown ID as a data attribute

        // Attach event listener to handle click event
        button.addEventListener('click', () => {
            // Handle make selection
            addSelectedMake(make, selectedMakeList); // Pass selectedMakeList as an argument
        });

        listItem.appendChild(button);
        makeDropdownList.appendChild(listItem);
    });
});

    // Populate allModelOptions with model data
    data.forEach((item) => {
        allModelOptions.push(`${item.make}_${item.model}`);
    });

    } catch (error) {
        console.error("Error fetching and populating data:", error);
    }
});

// Global variable to store all model options
let allModelOptions = [];

// Global variable to store unique models
let uniqueModels = [];

// Populate model dropdown list with unique models
async function populateModelDropdown() {
// Create a set to store unique models
const uniqueModelsSet = new Set();

// Iterate through allModelOptions and extract model options for selected makes
selectedMakes.forEach(make => {
    allModelOptions.forEach(option => {
        if (option.startsWith(make + '_')) {
            const model = option.split('_')[1];
            uniqueModelsSet.add(model); // Add model to the set
        }
    });
});

// Convert the set to an array of unique models
uniqueModels = [...uniqueModelsSet];

    // Sort the unique models alphabetically
    uniqueModels.sort((a, b) => a.localeCompare(b));

    // Clear existing model dropdown options and populate each dropdown individually
    const selectedSections = document.querySelectorAll('.results-section[data-type="model-section"]');
    const modelDropdowns = Array.from(selectedSections).map(section => section.querySelector('.results-dropdown-list'));

    // Clear existing model dropdown options and populate each dropdown individually
    modelDropdowns.forEach(modelDropdown => {
        modelDropdown.innerHTML = ""; // Clear existing options
        uniqueModels.forEach((model) => {
            const listItem = document.createElement('li');
            listItem.classList.add('results-dropdown-list-item');
            const button = document.createElement('button');
            button.classList.add('results-dropdown-list-button');
            button.textContent = model;
            button.addEventListener('click', () => {
                // Handle model selection
                // We need to find the selected model list associated with this dropdown
                const selectedModelList = modelDropdown.closest('.results-section').querySelector('.results-dropdown-selected-list[data-type="selected-model"]');
                console.log(selectedModelList, 'selected model list');
                addSelectedModel(model, selectedModelList);
            });
            listItem.appendChild(button);
            modelDropdown.appendChild(listItem); // Append to the current model dropdown
        });
    });
}

async function clearModelDropdown(deletedMake) {
    const selectedMakesLists = document.querySelectorAll('.results-dropdown-selected-list[data-type="selected-make"]');
    
    // Iterate over selectedMakesLists to find and remove the deleted make
    selectedMakesLists.forEach(selectedMakesList => {
        const makeItems = selectedMakesList.querySelectorAll('.results-dropdown-selected-list-item');
        makeItems.forEach(makeItem => {
            if (makeItem.textContent.trim() === deletedMake) {
                makeItem.remove(); // Remove the make item from the DOM
            }
        });
    });

    // Call populateModelDropdown again to update the model dropdowns
    await populateModelDropdown();
}

async function removeSelectedModels(make) {
    console.log("Removing selected models for make:", make);
    console.log(selectedMakes, 'selected makes');

    // Check if the make is not selected
    if (!selectedMakes.includes(make)) {
        console.log(make, 'make');
        // Find all selected model lists associated with the deleted make
        const selectedModelLists = document.querySelectorAll('.results-dropdown-selected-list[data-type="selected-model"]');
        console.log("Selected model lists:", selectedModelLists);

        // Iterate over selectedModelLists and remove models associated with the deleted make
        selectedModelLists.forEach(selectedModelList => {
            const modelItems = selectedModelList.querySelectorAll('.results-dropdown-selected-list-item');
            console.log("Model items:", modelItems);

            modelItems.forEach(modelItem => {
                console.log(modelItem, 'model item')
                const modelName = modelItem.textContent.trim();
                const modelMake = modelName.split('_')[0];
                if (modelMake === make) {
                    modelItem.remove(); // Remove the model item from the DOM
                }
            });
        });
    } else {
        console.log("Make", make, "is not selected. No models to remove.");
    }
}
