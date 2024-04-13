document.addEventListener('DOMContentLoaded', function() {
    // Function to handle button clicks within each calculator section wrapper
    const handleButtonClicks = (wrapper) => {
        const buttons = wrapper.querySelectorAll('.calculator-section-item-button');

        buttons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default behavior

                // Remove active class from all buttons within the current wrapper
                buttons.forEach(btn => {
                    btn.classList.remove('active');
                });
                // Add active class to the clicked button
                this.classList.add('active');

                // Update disclaimer text when a button is clicked
                updateDisclaimer();
            });
        });
    };

    // Add event listeners for button clicks within each calculator section wrapper
    const wrappers = document.querySelectorAll('.calculator-section-wrapper');
    wrappers.forEach(wrapper => {
        handleButtonClicks(wrapper);
    });

    // Function to handle input changes for displaying entered price, down payment, and trade-in value
    const handleInputChange = (inputField, displayElement) => {
        inputField.addEventListener('input', function() {
            // Remove non-numeric characters from the input value
            const sanitizedValue = this.value.replace(/\D/g, '');
            // Format the sanitized value with commas and prepend a dollar sign
            const formattedValue = '$' + formatNumberWithCommas(sanitizedValue);
            // Update the display element with the formatted value
            displayElement.textContent = formattedValue;

            // Calculate loan amount whenever input changes
            calculateLoanAmount();
        });
        // Prevent non-numeric input
        inputField.addEventListener('keypress', function(event) {
            const charCode = event.which ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
            }
        });
    };

    // Helper function to format number with commas
    const formatNumberWithCommas = (number) => {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Display entered price
    const priceInput = document.getElementById('priceInput');
    const priceText = document.querySelector('.calculator-details-list-item .calculator-details-text:nth-child(2)');
    handleInputChange(priceInput, priceText);

    // Display entered down payment
    const downPaymentInput = document.getElementById('downPaymentInput');
    const downPaymentDisplay = document.getElementById('downPaymentDisplay');
    handleInputChange(downPaymentInput, downPaymentDisplay);

    // Display entered trade-in value
    const tradeInInput = document.getElementById('tradeInInput');
    const tradeInDisplay = document.getElementById('tradeInDisplay');
    handleInputChange(tradeInInput, tradeInDisplay);

    // Function to calculate and display total loan amount
    const calculateLoanAmount = () => {
        const price = parseFloat(priceInput.value.replace(/\D/g, '')) || 0;
        const downPayment = parseFloat(downPaymentInput.value.replace(/\D/g, '')) || 0;
        const tradeIn = parseFloat(tradeInInput.value.replace(/\D/g, '')) || 0;
        let totalLoanAmount = price - downPayment - tradeIn;
        // Ensure totalLoanAmount is not negative
        totalLoanAmount = Math.max(totalLoanAmount, 0);
        // Format the total loan amount with commas and prepend a dollar sign
        const formattedLoanAmount = '$' + formatNumberWithCommas(totalLoanAmount.toFixed(0));
        // Update the total loan amount display
        document.getElementById('totalLoanAmount').textContent = formattedLoanAmount;

        // Update disclaimer text when loan amount changes
        updateDisclaimer();
    };

    // Calculate total loan amount initially and add event listeners to input fields for recalculation
    calculateLoanAmount();
    [priceInput, downPaymentInput, tradeInInput].forEach(input => {
        input.addEventListener('input', calculateLoanAmount);
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Define the credit ratings object
        const creditRatings = {
            "FICO Score (781 - 850)": {
                new: .0561,
                used: .0743
            },
            "FICO Score (661 - 780)": {
                new: .0688,
                used: .0933
            },
            "FICO Score (601 - 660)": {
                new: .0929,
                used: .1353
            },
            "FICO Score (501 - 600)": {
                new: .1186,
                used: .1839
            },
            "FICO Score (300 - 500)": {
                new: .1417,
                used: .2118
            }
        };
    
        // Function to update the interest rate disclaimer based on selected options
        const updateDisclaimer = () => {
            const selectedCarType = document.querySelector('.calculator-section-item-button.active').textContent.trim();
            const selectedCreditRating = document.querySelector('.calculator-section-select').value;
            const interestRate = creditRatings[selectedCreditRating][selectedCarType.toLowerCase()];
            const formattedInterestRate = parseFloat((interestRate * 100).toFixed(2));
            document.querySelector('.calculator-display-disclaimer').textContent = `*Based on ${formattedInterestRate}% APR`;
        };
    
        // Add event listeners for changes in the car type (New or Used)
        const carTypeButtons = document.querySelectorAll('.calculator-section-item-button');
        carTypeButtons.forEach(button => {
            button.addEventListener('click', updateDisclaimer);
        });
    
        // Add event listener for changes in the credit rating
        document.querySelector('.calculator-section-select').addEventListener('change', updateDisclaimer);
    
        // Update the disclaimer initially
        updateDisclaimer();
    });
});
