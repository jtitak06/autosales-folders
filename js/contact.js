document.addEventListener('DOMContentLoaded', function() {
    const accordionElement = document.getElementById('accordion');
  
    const ContactQuestions = [
      {
        "id": 0,
        "question": "How can I find my next vehicle on Drive Chicago?",
        "answer": "Drive Chicago is a convenient and efficient way to find your next vehicle with an inventory of thousands of vehicles in the Chicagoland area.",
        "toggled": false // Add toggled property to indicate the initial state
      },
      {
        "id": 1,
        "question": "What price should I pay for a vehicle?",
        "answer": "The price you should pay for a car depends on various factors like the make, model, age, mileage, condition, features or upgrades, and market value. It’s important to do your research, compare prices, and negotiate to get the best deal possible. Consider using our easy-to-use competitive comparison tool when shopping for a new vehicle.",
        "toggled": false // Add toggled property to indicate the initial state
      },
      {
        "id": 2,
        "question": "What paperwork should I bring with me to purchase a car?",
        "answer": "When you are ready to purchase a vehicle, you should bring your driver's license, proof of automobile insurance, and financing documents if you intend to utilize a loan to purchase your vehicle. If you are financing the purchase of your vehicle, it may be beneficial to get preapproved for a loan.",
        "toggled": false // Add toggled property to indicate the initial state
      },
      {
        "id": 3,
        "question": "How do I pick the right vehicle for my family and I?",
        "answer": "To pick the right vehicle for your family and you, consider factors like your budget, lifestyle, and needs. Think about the size, fuel efficiency, and features you want in a car. Make a list of your priorities and then research different makes and models that align with your criteria. Take test drives that include the family that will most often be traveling with you to get a feel for the vehicles and to see if they meet your expectations and the expectations of your family/spouse. Don’t forget to consider factors like reliability, safety ratings, and maintenance costs. Ultimately, choose a vehicle that fits your needs and brings you joy!",
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
        iconElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>';
      } else {
        iconElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>';
      }
    }
  
    renderAccordion(ContactQuestions);
  });
  