document.addEventListener('DOMContentLoaded', function() {
    // Initialize lightGallery
    lightGallery(document.querySelector('.main-image-container'), {
        selector: '.main-image',
        download: false,
        zoom: true,
        counter: false
    });

    // Thumbnail image switcher
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    const mainImageLink = document.querySelector('.main-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Change main image
            const newImageSrc = this.getAttribute('data-image');
            mainImage.src = newImageSrc;
            mainImageLink.href = newImageSrc;
            
            // Add fade animation
            mainImage.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
                mainImage.classList.remove('animate__animated', 'animate__fadeIn');
            }, 500);
        });
    });

    // Color selector
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, you would update product variations here
            const color = this.getAttribute('data-color');
            console.log('Selected color:', color);
        });
    });

    // Quantity selector
    const quantityInput = document.querySelector('.quantity-selector input');
    const incrementBtn = document.querySelector('.quantity-selector .increment');
    const decrementBtn = document.querySelector('.quantity-selector .decrement');
    
    incrementBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value < 10) {
            quantityInput.value = value + 1;
        }
    });
    
    decrementBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    // Rating input for reviews
    const ratingStars = document.querySelectorAll('.rating-input i');
    const ratingValue = document.getElementById('rating-value');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingValue.value = rating;
            
            // Update star display
            ratingStars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('active');
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const hoverRating = this.getAttribute('data-rating');
            
            ratingStars.forEach((s, index) => {
                if (index < hoverRating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const currentRating = ratingValue.value;
            
            ratingStars.forEach((s, index) => {
                if (index < currentRating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });

    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Adding...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check me-1"></i> Added to Cart';
                
                // Update cart count
                const cartCount = document.querySelector('.navbar .badge');
                if (cartCount) {
                    const currentCount = parseInt(cartCount.textContent);
                    cartCount.textContent = currentCount + parseInt(quantityInput.value);
                    cartCount.classList.add('animate__animated', 'animate__bounce');
                    
                    setTimeout(() => {
                        cartCount.classList.remove('animate__animated', 'animate__bounce');
                    }, 1000);
                }
                
                // Reset button after delay
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Add to wishlist button
    const addToWishlistBtn = document.querySelector('.add-to-wishlist');
    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.innerHTML = '<i class="fas fa-heart me-2"></i> Wishlist';
            } else {
                this.classList.add('active');
                this.innerHTML = '<i class="fas fa-heart me-2"></i> Added to Wishlist';
            }
        });
    }

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});