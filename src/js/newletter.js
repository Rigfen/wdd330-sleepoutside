const newsletterForm = document.getElementById('newsletter-form');
const successMessage = document.getElementById('success-message');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        successMessage.style.display = 'block';
        newsletterForm.reset();
        setTimeout(() => successMessage.style.display = 'none', 5000);
    });
}
