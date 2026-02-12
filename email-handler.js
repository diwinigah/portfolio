// =====================================================
// EMAILJS INITIALIZATION & CONFIGURATION
// =====================================================

// Initialize EmailJS with your Public Key
// Sign up at https://www.emailjs.com/ to get your credentials
emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY", // Replace with your EmailJS public key
    // You can also set it per service like this:
    // serviceID: "service_xxxxxxxxx",
    // templateID: "template_xxxxxxxxx"
});

// =====================================================
// CONTACT FORM HANDLING WITH EMAILJS
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                nom: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                sujet: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Validate form data
            if (!formData.nom || !formData.email || !formData.sujet || !formData.message) {
                showAlert('error', 'Veuillez remplir tous les champs du formulaire');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showAlert('error', 'Veuillez entrer une adresse email valide');
                return;
            }

            // Get submit button
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            const originalClass = submitBtn.className;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;

            // Send email using EmailJS
            emailjs.send(
                'service_xxxxxxxxxxxx', // Replace with your Service ID
                'template_xxxxxxxxxxxx', // Replace with your Template ID
                {
                    from_name: formData.nom,
                    from_email: formData.email,
                    subject: formData.sujet,
                    message: formData.message,
                    to_email: 'winidorc1@gmail.com' // Your email address
                }
            )
            .then(function(response) {
                // Success
                console.log('Message envoyé avec succès!', response);
                
                // Reset form
                contactForm.reset();

                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé avec succès!';
                submitBtn.className = originalClass + ' btn-success';
                submitBtn.style.background = '#10b981';

                // Show alert
                showAlert('success', 'Votre message a été envoyé avec succès!');

                // Restore button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.className = originalClass;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(function(error) {
                // Error
                console.error('Erreur lors de l\'envoi du message:', error);

                // Show error message
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur!';
                submitBtn.className = originalClass + ' btn-error';
                submitBtn.style.background = '#ef4444';

                // Show alert
                showAlert('error', 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');

                // Restore button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.className = originalClass;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }
});

// =====================================================
// ALERT NOTIFICATION SYSTEM
// =====================================================

function showAlert(type, message) {
    // Create alert div
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
        ">
            ${message}
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 20px;
                margin-left: 10px;
            ">&times;</button>
        </div>
    `;
    
    document.body.appendChild(alert);

    // Auto-remove alert after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.parentElement.removeChild(alert);
        }
    }, 5000);
}

// Add animation styles for alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
