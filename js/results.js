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
            await clearModelDropdown(make); // Clear model dropdown options for the deleted make
        });

        listItem.appendChild(closeButton);
        selectedMakeList.appendChild(listItem); // Append to the selectedMakeList
        
        // Ensure populateModelDropdown is called after adding the make
        await populateModelDropdown(); // Wait for populateModelDropdown to complete
    }
};

// Function to add selected model to the selected model list
async function addSelectedModel(model, selectedModelList) {
    console.log('Selected Model List:', selectedModelList); // Log selectedModelList for debugging

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
            console.log('Model deleted:', model); // Log the deleted model
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

// Populate model dropdown list with unique models
async function populateModelDropdown(selectedModelList) {
    const selectedMakesList = document.querySelectorAll('.results-dropdown-selected-list[data-type="selected-make"]');
    const selectedModels = [];

    selectedMakesList.forEach((selectedMake) => {
        const make = selectedMake.textContent.trim();
        selectedModels.push(...allModelOptions.filter(option => option.startsWith(make + '_')).map(option => option.split('_')[1]));
    });

    // Remove duplicates from the selectedModels array
    const uniqueModels = [...new Set(selectedModels)];

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
                addSelectedModel(model, selectedModelList);
            });
            listItem.appendChild(button);
            modelDropdown.appendChild(listItem); // Append to the current model dropdown
        });
    });
}

// Function to remove model options for a specific make from allModelOptions array
function removeModelOptionsForMake(make) {
    allModelOptions = allModelOptions.filter(model => !model.startsWith(make + '_'));
}

// Function to remove models from dropdown after the matching make is deleted
async function clearModelDropdown(deletedMake) {
    const selectedList = document.querySelector('.results-dropdown-selected-list');
    const selectedSections = document.querySelectorAll('.results-section[data-type="model-section"]');

    selectedSections.forEach(selectedSection => {
        const modelDropdown = selectedSection.querySelector('.results-dropdown-list');
        const modelItems = modelDropdown.querySelectorAll('.results-dropdown-list-item');

        modelItems.forEach(modelItem => {
            const modelMake = modelItem.textContent.trim().split('_')[0];
            if (modelMake === deletedMake) {
                modelItem.remove(); // Remove the model item from the DOM
            }
        });

        // Clear model dropdown if no make is selected
        if (selectedList.querySelectorAll('.results-dropdown-selected-list-item').length === 0) {
            modelDropdown.innerHTML = "";
        }
    });
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
