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

function populateDropdown(selectElement, options, defaultValue) {
  selectElement.innerHTML = ''; // Clear existing options

  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    if (option === defaultValue) {
      optionElement.setAttribute('selected', 'selected'); // Set the selected attribute
    }
    selectElement.appendChild(optionElement);
  });
}

document.addEventListener('DOMContentLoaded', async function() {
  const yearFromSelect = document.getElementById('yearFrom');
  const yearToSelect = document.getElementById('yearTo');
  const currentMakeSelect = document.getElementById('currentMake');
  const currentModelSelect = document.getElementById('currentModel');

  // Store default values from HTML
  const defaultYearFrom = yearFromSelect.getAttribute('value');
  const defaultYearTo = yearToSelect.getAttribute('value');
  const defaultMake = currentMakeSelect.getAttribute('value');
  const defaultModel = currentModelSelect.getAttribute('value');

  let years = [];

  try {
    const data = await fetchData('https://api.drivechicago.cloud/lookup/yearMakeModels?apiKey=69d85981-1856-436e-a3be-99c6bc4e83b4');

    const yearsSet = new Set(data.map(item => item.year));
    const makesSet = new Set(data.map(item => item.make));
    const modelsSet = new Set(data.map(item => item.model));

    years = Array.from(yearsSet).sort((a, b) => b - a);
    const makes = Array.from(makesSet).sort();
    const models = Array.from(modelsSet).sort();

    populateDropdown(yearFromSelect, years, defaultYearFrom);
    populateDropdown(yearToSelect, years, defaultYearTo);
    populateDropdown(currentMakeSelect, makes, defaultMake);
    populateDropdown(currentModelSelect, models, defaultModel);

    // Set default values for select elements from HTML
    yearFromSelect.value = defaultYearFrom;
    yearToSelect.value = defaultYearTo;
    currentMakeSelect.value = defaultMake;
    currentModelSelect.value = defaultModel;

    // Store selected yearFrom and yearTo values
    let selectedYearFrom = defaultYearFrom;
    let selectedYearTo = defaultYearTo;

    // Event listener to update yearTo options based on selected yearFrom
    yearFromSelect.addEventListener('change', function() {
      selectedYearFrom = yearFromSelect.value;
      const availableYearsTo = years.filter(year => year >= selectedYearFrom || year === '');
      populateDropdown(yearToSelect, availableYearsTo);
      yearToSelect.value = selectedYearTo; // Restore selected yearTo value
    });

    // Event listener to update yearFrom options based on selected yearTo
    yearToSelect.addEventListener('change', function() {
      selectedYearTo = yearToSelect.value;
      const availableYearsFrom = years.filter(year => year <= selectedYearTo || year === '');
      populateDropdown(yearFromSelect, availableYearsFrom);
      yearFromSelect.value = selectedYearFrom; // Restore selected yearFrom value
    });
  } catch (error) {
    console.error('Error fetching and populating data:', error);
  }
});

fetch('https://sheetdb.io/api/v1/gfqcm38bwhrl4')
  .then(response => response.json())
  .then(data => {
    const carousel = document.getElementById('carousel');

    // Iterate through each item in the data and create a card for it
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'grid-card';

      // Create image element
      const imageWrapper = document.createElement('a');
      imageWrapper.className = 'grid-image-wrapper';
      imageWrapper.href = `/vehicle/${item.vin}`;
      imageWrapper.addEventListener('click', newLink);

      const image = document.createElement('img');
      image.className = 'grid-image';
      image.src = item.imageURL !== '' ? item.imageURL : 'NoImage';
      image.alt = 'grid';
      imageWrapper.appendChild(image);

      // Create info section
      const infoSection = document.createElement('div');
      infoSection.className = 'grid-info-section';

      const title = document.createElement('h4');
      title.className = 'grid-title';
      title.textContent = `${item.make} ${item.model}`;

      const year = document.createElement('p');
      year.className = 'grid-text';
      year.innerHTML = `<span class="grid-text-title">Year: </span>${item.year}`;

      const mileage = document.createElement('p');
      mileage.className = 'grid-text';
      mileage.innerHTML = `<span class="grid-text-title">Mileage: </span>${item.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} miles`;

      // Create list wrapper
      const listWrapper = document.createElement('ul');
      listWrapper.className = 'grid-list-wrapper';

      // Check if item.internetPrice exists before accessing its properties
      if (item.internetPrice) {
        const priceItem = document.createElement('li');
        priceItem.className = 'grid-list-item';

        const price = document.createElement('p');
        price.className = 'grid-price';
        price.textContent = `$${item.internetPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        priceItem.appendChild(price);

        listWrapper.appendChild(priceItem);
      }

      const wishlistItem = document.createElement('li');
      wishlistItem.className = 'grid-list-item';

      const wishlistButton = document.createElement('button');
      wishlistButton.className = 'grid-wishlist';
      wishlistButton.addEventListener('click', () => {
        selected?.wishlist ? removeFromList(item.vin) : addToList(item.vin);
      });

      const wishlistIcon = document.createElement('FontAwesomeIcon');
      wishlistIcon.className = 'grid-wishlist-icon';
      wishlistIcon.icon = 'faHeart';
      wishlistButton.appendChild(wishlistIcon);

      wishlistItem.appendChild(wishlistButton);

      // Append elements
      card.appendChild(imageWrapper);
      card.appendChild(infoSection);
      infoSection.appendChild(title);
      infoSection.appendChild(year);
      infoSection.appendChild(mileage);
      infoSection.appendChild(listWrapper);
      listWrapper.appendChild(wishlistItem);

      carousel.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching data:', error));

// Function for new link
function newLink(event) {
  // Add your new link logic here
}

// Function to add to wishlist
function addToList(vin) {
  // Add to wishlist logic
}

// Function to remove from wishlist
function removeFromList(vin) {
  // Remove from wishlist logic
}


