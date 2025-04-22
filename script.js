// Initialize EmailJS
emailjs.init("Bi_5ze33JlXvMSm4P"); // Replace with your EmailJS public key

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const message = form.querySelector('#message').value.trim();
            
            if (!name || !email) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Prepare email parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message
            };

            // Send email using EmailJS
            emailjs.send("service_h7e5z1n", "template_6mcpzcw", templateParams)
                .then((response) => {
                    console.log('Email sent successfully:', response);
                    alert('Thank you for your message! We will get back to you soon.');
                    form.reset();
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    alert('There was an error sending your message. Please try again later.');
                });
        });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 