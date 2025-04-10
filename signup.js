document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordStrengthBar = document.querySelector('.password-strength .progress-bar');
    const strengthText = document.querySelector('.strength-text');
    const signupBtn = document.querySelector('.signup-btn');
    
    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Character variety checks
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update progress bar
        let width = 0;
        let color = '';
        let text = '';
        
        switch(strength) {
            case 0:
            case 1:
                width = 25;
                color = 'var(--danger-color)';
                text = 'Weak';
                break;
            case 2:
            case 3:
                width = 50;
                color = 'var(--warning-color)';
                text = 'Fair';
                break;
            case 4:
                width = 75;
                color = 'var(--primary-color)';
                text = 'Good';
                break;
            case 5:
                width = 100;
                color = 'var(--success-color)';
                text = 'Strong';
                break;
        }
        
        passwordStrengthBar.style.width = width + '%';
        passwordStrengthBar.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    });
    
    // Password confirmation validation
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
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
        
        // Special validation for passwords
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.classList.add('is-invalid');
            isValid = false;
        }
        
        if (!document.getElementById('terms').checked) {
            document.getElementById('terms').classList.add('is-invalid');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const btnText = signupBtn.querySelector('.btn-text');
            const spinner = signupBtn.querySelector('.spinner-border');
            
            btnText.textContent = 'Creating Account...';
            spinner.classList.remove('d-none');
            signupBtn.disabled = true;
            
            // In a real app, you would send data to your server here
            setTimeout(function() {
                // Simulate success after 2 seconds
                btnText.textContent = 'Account Created!';
                spinner.classList.add('d-none');
                
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
    const formInputs = signupForm.querySelectorAll('.form-control');
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
});