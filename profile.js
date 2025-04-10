document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Toggle sidebar on mobile
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
    
    sidebarToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    });

    // Avatar upload simulation
    const avatarEditBtn = document.querySelector('.avatar-edit-btn');
    const avatar = document.querySelector('.avatar');
    
    if (avatarEditBtn) {
        avatarEditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real app, this would open a file picker
            // For demo, we'll just simulate a change
            const newAvatar = confirm("Would you like to change your profile picture?");
            
            if (newAvatar) {
                avatar.classList.add('animate__animated', 'animate__rubberBand');
                
                // Simulate loading
                setTimeout(() => {
                    avatar.src = "images/user-avatar-new.jpg";
                    avatar.classList.remove('animate__rubberBand');
                    avatar.classList.add('animate__fadeIn');
                    
                    setTimeout(() => {
                        avatar.classList.remove('animate__fadeIn');
                    }, 1000);
                }, 1000);
            }
        });
    }

    // Form switch animation
    const twoFactorSwitch = document.getElementById('twoFactorSwitch');
    
    if (twoFactorSwitch) {
        twoFactorSwitch.addEventListener('change', function() {
            const securityItem = this.closest('.security-item');
            
            if (this.checked) {
                securityItem.classList.add('animate__animated', 'animate__pulse');
                
                setTimeout(() => {
                    securityItem.classList.remove('animate__pulse');
                }, 1000);
            }
        });
    }

    // Activity item hover effects
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__fadeInLeft');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('animate__fadeInLeft');
        });
    });

    // Save button animation
    const saveBtn = document.querySelector('.btn-primary');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status"></span> Saving...';
            this.disabled = true;
            
            // Simulate save action
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check me-1"></i> Saved!';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-save me-1"></i> Save Changes';
                    this.disabled = false;
                }, 1500);
            }, 2000);
        });
    }

    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            sidebar.classList.remove('active');
        }
    });
});