// Get form and result elements
const form = document.getElementById('userForm');
const errorDiv = document.getElementById('formError');
const resultContainer = document.getElementById('resultContainer');

// Utility function to sanitize HTML to prevent XSS
function sanitize(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Validation Functions
function validateAge(age) {
    const num = Number(age);
    return !isNaN(num) && num >= 1 && num <= 150;
}

function validateTelephone(telephone) {
    // Must be 7-15 digits only
    const telPattern = /^[0-9]{7,15}$/;
    return telPattern.test(telephone);
}

function validateEmail(email) {
    // Basic email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Reset Button Handler
form.addEventListener('reset', function () {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';

    // Hide the result container
    resultContainer.style.display = 'none';
});

// Submit Button Handler
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous error
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';

    // Collect form data
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const age = form.age.value.trim();
    const telephone = form.telephone.value.trim();
    const country = form.country.value;
    const gender = form.gender.value;

    // Collect all checked tech stack values
    const techStackElements = form.querySelectorAll('input[name="techStack"]:checked');
    const techStack = Array.from(techStackElements).map(cb => cb.value);

    const address = form.address.value.trim();

    // Check if all fields are filled
    if (!name) {
        showError('Please enter your name.');
        return;
    }

    if (!email) {
        showError('Please enter your email address.');
        return;
    }

    if (!age) {
        showError('Please enter your age.');
        return;
    }

    if (!telephone) {
        showError('Please enter your phone number.');
        return;
    }

    if (!country) {
        showError('Please select a country.');
        return;
    }

    if (!gender) {
        showError('Please select your gender.');
        return;
    }

    if (techStack.length === 0) {
        showError('Please select at least one technology from Tech Stack.');
        return;
    }

    if (!address) {
        showError('Please enter your address.');
        return;
    }

    // Validate data types
    if (!validateAge(age)) {
        showError('Please enter a valid age between 1 and 150.');
        return;
    }

    if (!validateTelephone(telephone)) {
        showError('Please enter a valid phone number (7-15 digits only).');
        return;
    }

    if (!validateEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }

    // All validations passed - Display data in table
    displayDataInTable({
        name,
        email,
        age,
        telephone,
        country,
        gender,
        techStack,
        address
    });

    // Clear all form fields after successful submission
    form.name.value = "";
    form.email.value = "";
    form.age.value = "";
    form.telephone.value = "";
    form.country.value = "";

    form.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.checked = false;
    });

    form.querySelectorAll('input[name="techStack"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    form.address.value = "";
});

// Function to show error message
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.style.color = '#dc2626';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '8px';
}

// Function to display submitted data in table format
function displayDataInTable(data) {
    // Update each table cell with sanitized data
    document.getElementById('result-name').textContent = data.name;
    document.getElementById('result-email').textContent = data.email;
    document.getElementById('result-age').textContent = data.age;
    document.getElementById('result-telephone').textContent = data.telephone;
    document.getElementById('result-country').textContent = data.country;
    document.getElementById('result-gender').textContent = data.gender;
    document.getElementById('result-techstack').textContent = data.techStack.join(', ');
    document.getElementById('result-address').textContent = data.address;

    // Show the result container
    resultContainer.style.display = 'block';
}