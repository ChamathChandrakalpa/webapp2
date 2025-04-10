document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    const signinBtn = document.querySelector('.signin-btn');
    
    // Form submission
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        const formInputs = this.querySelectorAll('input[required]');
        
        formInputs.forEach(input => {
            if (!input.value) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const btnText = signinBtn.querySelector('.btn-text');
            const spinner = signinBtn.querySelector('.spinner-border');
            
            btnText.textContent = 'Signing In...';
            spinner.classList.remove('d-none');
            signinBtn.disabled = true;
            
            // In a real app, you would send data to your server here
            setTimeout(function() {
                // Simulate success after 2 seconds
                btnText.textContent = 'Success! Redirecting...';
                
                // Redirect to dashboard after a short delay
                setTimeout(function() {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }, 2000);
        } else {
            // Add shake animation to invalid fields
            const invalidFields = this.querySelectorAll('.is-invalid');
            invalidFields.forEach(field => {
                field.classList.add('animate__animated', 'animate__shakeX');
                field.addEventListener('animationend', function() {
                    field.classList.remove('animate__animated', 'animate__shakeX');
                });
            });
        }
    });
    
    // Add focus effects to form inputs
    const formInputs = signinForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
    });
    
    // Add hover effects to social buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('animate__pulse');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('animate__pulse');
        });
    });
    
    // Add animation to benefit items on hover
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('animate__pulse');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('animate__pulse');
        });
    });
    
    // Add animation to forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('mouseenter', function() {
            this.classList.add('animate__rubberBand');
        });
        
        forgotPasswordLink.addEventListener('mouseleave', function() {
            this.classList.remove('animate__rubberBand');
        });
    }
});