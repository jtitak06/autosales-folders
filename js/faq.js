document.addEventListener('DOMContentLoaded', function() {
    const accordionElement = document.getElementById('accordion');
  
    const FaqQuestions = [
      {
        "id": 0,
        "question": "Does the car come with a warranty?",
        "answer": "New cars come with a manufacture warranty which cover certain repairs for a certain length of time. A pre-driven vehicle may come with the remainder of the factory warranty if the time and mileage limitations have not been met. Additionally, a service contract which is an agreement that provides coverage for certain repairs and services for your vehicle, are often available for purchase from a dealer or third-party warranty company.",
        "toggled": false // Add toggled property to indicate the initial state
      },
      {
        "id": 1,
        "question": "Where can I find more information about a vehicle on Drive Chicago?",
        "answer": "Drive Chicago has a wealth of information about a vehicle on the vehicle's information page. You can also visit the information page on the dealer's website or call the dealership to learn more about a vehicle that interests you.",
        "toggled": false // Add toggled property to indicate the initial state
      },
      {
        "id": 2,
        "question": "How often are listings updated?",
        "answer": "The frequency of inventory updates can vary depending on the practices of individual sellers or dealerships. However, Drive Chicago strives to maintain up-to-date inventories which provides accurate information to potential buyers.",
        "toggled": false // Add toggled property to indicate the initial state
      },
      {
        "id": 3,
        "question": "What role does Drive Chicago have in the purchase of my vehicle?",
        "answer": "Drive Chicago plays a crucial role in the process of purchasing a vehicle, providing a platform for buyers and sellers to connect and facilitate transactions. By serving as a centralized platform for vehicle transactions, Drive Chicago may help to streamline the buying and selling process, provide transparency, access to information, and tools to enhance the overall experience for both parties involved.",
        "toggled": false // Add toggled property to indicate the initial state
    },
    {
        "id": 4,
        "question": "Do I pay Drive Chicago anything once I find the right vehicle?",
        "answer": "Drive Chicago will never ask you to pay a fee for the purchase your vehicle.",
        "toggled": false // Add toggled property to indicate the initial state
    },
    {
        "id": 5,
        "question": "What is the difference between leasing and buying?",
        "answer": "When you lease a car, you’re essentially renting it for a specific period of time, typically a few years. You make monthly lease payments and return the car at the end of the lease term. On the other hand, when you buy a car, you own it outright after making all of the payments. This means you can keep the car as long as you want or sell it whenever you choose. The decision between leasing and buying depends on factors like your budget, driving habits, and long-term plans for your vehicle.",
        "toggled": false // Add toggled property to indicate the initial state
    },
    {
        "id": 6,
        "question": "What are the benefits of leasing a car?",
        "answer": "Leasing a car can have several benefits. Some advantages of leasing include lower monthly payments compared to buying, as you’re only paying for the depreciation of the car during the lease term. Leasing also allows you to drive a new car every few years, avoiding the hassle of selling or trading in a vehicle. Additionally, lease terms often include warranty coverage, which can help with maintenance costs. However, it’s important to consider your specific needs and financial situation before deciding whether leasing is the right choice for you.",
        "toggled": false // Add toggled property to indicate the initial state
    },
    {
        "id": 7,
        "question": "What finance options are available for purchasing a car?",
        "answer": "You can explore various financing options to purchase a car, such as getting a loan from a bank or credit union, using dealership financing, or considering lease options. It’s important to compare interest rates, loan terms, and any additional fees or charges associated with each option. You can also check if you qualify for any special financing offers or incentives. Remember to consider your budget and financial situation in making a decision.",
        "toggled": false // Add toggled property to indicate the initial state
    }
    ];
  
    function renderAccordion(items) {
      accordionElement.innerHTML = ''; // Clear previous content
      items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('accordion-dropdown-list-item');
  
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('accordion-dropdown');
        buttonElement.textContent = item.question;
  
        const iconElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        iconElement.setAttribute("class", "accordion-dropdown-icon");
        iconElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        iconElement.setAttribute("viewBox", "0 0 448 512");
        iconElement.innerHTML = item.toggled 
        ? '<path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>' 
        : '<path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>';
  
        buttonElement.appendChild(iconElement);
        buttonElement.addEventListener('click', function() {
          toggleAccordion(itemElement, iconElement);
        });
  
        const answerWrapper = document.createElement('div');
        answerWrapper.classList.add('accordion-answer-wrapper');
        if (item.toggled) {
          answerWrapper.classList.add('active');
        }
  
        const answerText = document.createElement('p');
        answerText.classList.add('accordion-answer-text');
        answerText.textContent = item.answer;
        answerWrapper.appendChild(answerText);
  
        itemElement.appendChild(buttonElement);
        itemElement.appendChild(answerWrapper);
        accordionElement.appendChild(itemElement);
      });
    }
  
    function toggleAccordion(itemElement, iconElement) {
      const answerWrapper = itemElement.querySelector('.accordion-answer-wrapper');
      
      // Toggle the visibility of the answer
      answerWrapper.classList.toggle('active');
    
      // Toggle the arrow icon based on answer visibility
      if (answerWrapper.classList.contains('active')) {
        iconElement.innerHTML = '<path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>';
      } else {
        iconElement.innerHTML = '<path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>';
      }
    }
  
    renderAccordion(FaqQuestions);
  });
  