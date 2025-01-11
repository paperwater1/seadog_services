// Function to initialize the contact form
function loadContactForm() {
    const contactSection = document.getElementById('contact-section');
    if (!contactSection) return;
    
    // Initialize form functionality
    populateServiceDropdown();
    initializeFormHandling();
}

// Function to initialize form handling
function initializeFormHandling() {
    const forms = document.querySelectorAll('form[action^="https://formspree.io"]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    const contactSection = document.querySelector('.contact-form-section');
                    if (contactSection) {
                        contactSection.innerHTML = `
                            <div class="container">
                                <div class="thank-you-message">
                                    <h2>Thank you for reaching out!</h2>
                                    <p>We'll be in touch soon.</p>
                                </div>
                            </div>`;
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again.');
            });
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// All available services
const ALL_SERVICES = {
    maritime: [
        'Corporate Training',
        'Safety Advisory',
        'Pollution Prevention',
        'Operations Optimization'
    ],
    community: [
        'Election Inspector Services',
        'Association Consulting',
        'Notary Services',
        'Community Engagement'
    ]
};

// Function to populate service dropdown
function populateServiceDropdown() {
    const serviceSelect = document.querySelector('#service');
    if (!serviceSelect) return;

    // Clear existing options
    serviceSelect.innerHTML = '<option value="">Select a Service</option>';

    // Add Maritime Services
    const maritimeGroup = document.createElement('optgroup');
    maritimeGroup.label = 'Maritime Services';
    ALL_SERVICES.maritime.forEach(service => {
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        maritimeGroup.appendChild(option);
    });
    serviceSelect.appendChild(maritimeGroup);

    // Add Community Services
    const communityGroup = document.createElement('optgroup');
    communityGroup.label = 'Community Services';
    ALL_SERVICES.community.forEach(service => {
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        communityGroup.appendChild(option);
    });
    serviceSelect.appendChild(communityGroup);
}

// Function to pre-fill form and scroll to contact section
function selectService(serviceName) {
    // Get form elements
    const serviceSelect = document.querySelector('#service');
    const messageArea = document.querySelector('#inquiry');
    
    // Set the service in dropdown
    if (serviceSelect) {
        serviceSelect.value = serviceName;
    }
    
    // Set the message
    if (messageArea) {
        messageArea.value = `Hello! I am interested in ${serviceName} services.`;
    }
    
    // Scroll to contact section
    document.querySelector('#contact-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load the contact form
    loadContactForm();
    
    // Other initializations will happen after form is loaded
});

// Simple form validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        const service = this.querySelector('select[name="service"]').value;
        
        if (!name || !email || !message || !service) {
            e.preventDefault();
            alert('Please fill in all required fields');
        }
    });
}
