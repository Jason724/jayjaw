// Initialize EmailJS
emailjs.init("Bi_5ze33JlXvMSm4P"); // Replace with your EmailJS public key

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('form-message');

    function sanitize(input) {
        // Remove HTML tags
        return input.replace(/<[^>]*>?/gm, '');
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formMessage.textContent = '';
            // Honeypot check
            const company = form.querySelector('#company').value;
            if (company) {
                formMessage.textContent = 'Spam detected.';
                return;
            }
            // Basic form validation
            const name = sanitize(form.querySelector('#name').value.trim());
            const email = sanitize(form.querySelector('#email').value.trim());
            const message = sanitize(form.querySelector('#message').value.trim());

            if (!name || !email) {
                formMessage.textContent = 'Please fill in all required fields.';
                form.querySelector('#name').focus();
                return;
            }

            if (!isValidEmail(email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                form.querySelector('#email').focus();
                return;
            }

            // Disable button
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

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
                    formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Contact Us";
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    formMessage.textContent = 'There was an error sending your message. Please try again later.';
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Contact Us";
                });
        });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}