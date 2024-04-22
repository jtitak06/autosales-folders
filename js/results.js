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

document.addEventListener("DOMContentLoaded", async function () {
    const yearFromSelect = document.getElementById("yearFrom");
    const yearToSelect = document.getElementById("yearTo");
    const makeDropdownList = document.querySelector('.results-dropdown-list');
    const modelDropdownList = document.querySelectorAll('.results-dropdown-list');

    // Set default values programmatically
    const defaultYearValue = "Select Year";

    let years = [];

    try {
        const data = await fetchData(
            "https://api.drivechicago.cloud/lookup/yearMakeModels?apiKey=69d85981-1856-436e-a3be-99c6bc4e83b4"
        );

        const yearsSet = new Set(data.map((item) => item.year));
        const makesSet = new Set(data.map((item) => item.make));

        years = Array.from(yearsSet).sort((a, b) => b - a);
        const makes = Array.from(makesSet).sort();

        // Populate yearFrom and yearTo dropdowns with dynamic data
        populateDropdown(yearFromSelect, years, defaultYearValue, "Select Year");
        populateDropdown(yearToSelect, years, defaultYearValue, "Select Year");

        // Ensure "Select" is selected after populating the dropdowns
        yearFromSelect.value = defaultYearValue;
        yearToSelect.value = defaultYearValue;

        // Store selected yearFrom and yearTo values
        let selectedYearFrom = defaultYearValue;
        let selectedYearTo = defaultYearValue;

        // Event listener to update yearTo options based on selected yearFrom
        yearFromSelect.addEventListener("change", function () {
            selectedYearFrom = yearFromSelect.value;
            const availableYearsTo = years.filter(
                (year) => year >= selectedYearFrom || year === ""
            );
            populateDropdown(yearToSelect, availableYearsTo, yearToSelect.value, "Select Year");
        });

        // Event listener to update yearFrom options based on selected yearTo
        yearToSelect.addEventListener("change", function () {
            selectedYearTo = yearToSelect.value;
            const availableYearsFrom = years.filter(
                (year) => year <= selectedYearTo || year === ""
            );
            populateDropdown(yearFromSelect, availableYearsFrom, yearFromSelect.value, "Select Year");
        });

        // Populate make dropdown list with dynamic data
        makes.forEach((make, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('results-dropdown-list-item');
            listItem.key = index;

            const button = document.createElement('button');
            button.classList.add('results-dropdown-list-button');
            button.textContent = make;

            // Attach event listener to handle click event
            button.addEventListener('click', () => {
                // Handle make selection
                addSelectedMake(make); // Call function to add selected make to the selected list
            });

            listItem.appendChild(button);
            makeDropdownList.appendChild(listItem);
        });

        // Populate allModelOptions with model data
        data.forEach((item) => {
            allModelOptions.push(`${item.make}_${item.model}`);
        });
    } catch (error) {
        console.error("Error fetching and populating data:", error);
    }
});

// Function to add selected make to the selected list
async function addSelectedMake(make) {
    const selectedList = document.querySelector('.results-dropdown-selected-list');
    const listItem = document.createElement('li');
    listItem.classList.add('results-dropdown-selected-list-item');
    listItem.textContent = make;

    const closeButton = document.createElement('button');
    closeButton.classList.add('results-dropdown-selected-close-button');
    closeButton.innerHTML = '<svg class="results-dropdown-selected-close-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>';
    closeButton.addEventListener('click', async function() {
        selectedList.removeChild(listItem);
        console.log('Make deleted:', make); // Log the deleted make
        await clearModelDropdown(make); // Clear model dropdown options for the deleted make
    });

    listItem.appendChild(closeButton);
    listItem.dataset.make = make; // Store make as data attribute
    selectedList.appendChild(listItem);

    // Populate model dropdown based on selected make
    await populateModelDropdown(make);
}

// Global variable to store all model options
let allModelOptions = [];

console.log("All model options:", allModelOptions);

// Populates model dropdown list
async function populateModelDropdown() {
    console.log("Populating model dropdown...");

    const selectedMakesList = document.querySelectorAll('.results-dropdown-selected-list-item');
    const selectedModels = [];

    selectedMakesList.forEach((selectedMake) => {
        const make = selectedMake.textContent.trim();
        selectedModels.push(...allModelOptions.filter(option => option.startsWith(make + '_')).map(option => option.split('_')[1]));
    });

    // Remove duplicates from the selectedModels array
    const uniqueModels = [...new Set(selectedModels)];

    // Sort the unique models alphabetically
    uniqueModels.sort((a, b) => a.localeCompare(b));

    console.log("Unique models:", uniqueModels);

    // Now populate the model dropdown with unique models
    const selectedSection = document.querySelector('.results-section.model');
    const modelDropdown = selectedSection.querySelector('.results-dropdown-list');

    // Clear existing model dropdown options
    modelDropdown.innerHTML = "";

    uniqueModels.forEach((model) => {
        const listItem = document.createElement('li');
        listItem.classList.add('results-dropdown-list-item');
        const button = document.createElement('button');
        button.classList.add('results-dropdown-list-button');
        button.textContent = model;
        button.addEventListener('click', () => {
            // Handle model selection
        });
        listItem.appendChild(button);
        modelDropdown.appendChild(listItem);
    });
}

// Function to remove model options for a specific make from allModelOptions array
function removeModelOptionsForMake(make) {
    allModelOptions = allModelOptions.filter(model => !model.startsWith(make + '_'));
}

// Function to clear model dropdown list for a specific make
function clearModelDropdown(deletedMake) {
    console.log("Deleted make:", deletedMake);
    const modelDropdowns = document.querySelectorAll('.results-section.model .results-dropdown-list');
    modelDropdowns.forEach(modelDropdown => {
        console.log("Model dropdown:", modelDropdown);
        const modelItems = modelDropdown.querySelectorAll('.results-dropdown-list-item');
        console.log("Model items:", modelItems);
        modelItems.forEach(modelItem => {
            // Check if the model item's id starts with the deleted make
            console.log("Model item id:", modelItem.id);
            console.log("Deleted make + '_':", deletedMake + '_');
            if (modelItem.id.startsWith(deletedMake + '_')) {
                console.log("Removing model:", modelItem.id);
                modelItem.remove(); // Remove the model item from the DOM
                // Remove the model option from the global array
                allModelOptions = allModelOptions.filter(option => !option.startsWith(deletedMake + '_'));
                console.log("All model options:", allModelOptions);
            }
        });
    });
}
