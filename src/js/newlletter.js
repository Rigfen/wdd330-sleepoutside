// Newsletter sign up functionality
const newsletterForm = document.getElementById('newsletter-form');
const successMessage = document.getElementById('success-message');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email-input').value;

        // Show success message
        successMessage.style.display = 'block';
        newsletterForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });
}
