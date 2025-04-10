document.addEventListener('DOMContentLoaded', function() {
    // Initialize Dropzone for image uploads
    Dropzone.autoDiscover = false;
    const dropzone = new Dropzone("#productImagesDropzone", {
        url: "/upload", // Replace with your upload endpoint
        paramName: "file",
        maxFilesize: 5, // MB
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 10,
        dictDefaultMessage: "",
        dictFileTooBig: "File is too big ({{filesize}}MB). Max filesize: {{maxFilesize}}MB.",
        dictInvalidFileType: "You can't upload files of this type.",
        dictResponseError: "Server responded with {{statusCode}} code.",
        dictCancelUpload: "Cancel upload",
        dictUploadCanceled: "Upload canceled.",
        dictRemoveFile: "Remove file",
        init: function() {
            this.on("addedfile", function(file) {
                // Create preview
                const previewItem = document.createElement('div');
                previewItem.className = 'image-preview-item';
                
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.alt = file.name;
                
                const removeBtn = document.createElement('span');
                removeBtn.className = 'remove-image';
                removeBtn.innerHTML = '&times;';
                removeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropzone.removeFile(file);
                    previewItem.remove();
                    updateImageCount();
                });
                
                previewItem.appendChild(img);
                previewItem.appendChild(removeBtn);
                document.getElementById('imagePreview').appendChild(previewItem);
                
                updateImageCount();
            });
            
            this.on("removedfile", function(file) {
                updateImageCount();
            });
        }
    });
    
    function updateImageCount() {
        const count = document.getElementById('imagePreview').children.length;
        document.getElementById('reviewImageCount').textContent = count;
    }
    
    // Form step navigation
    const steps = document.querySelectorAll('.registration-step');
    const stepButtons = document.querySelectorAll('.step');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const submitBtn = document.querySelector('.btn-submit');
    let currentStep = 0;
    
    // Show current step
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        // Update progress steps
        stepButtons.forEach((button, index) => {
            button.classList.toggle('active', index <= stepIndex);
        });
        
        // Update navigation buttons
        prevBtn.disabled = stepIndex === 0;
        nextBtn.style.display = stepIndex === steps.length - 1 ? 'none' : 'block';
        submitBtn.style.display = stepIndex === steps.length - 1 ? 'block' : 'none';
        
        // Update review section on last step
        if (stepIndex === steps.length - 1) {
            updateReviewSection();
        }
    }
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentStep--;
        showStep(currentStep);
    });
    
    // Validate current step
    function validateStep(stepIndex) {
        let isValid = true;
        const currentStep = steps[stepIndex];
        const requiredInputs = currentStep.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            if (!input.value) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            currentStep.querySelector('.is-invalid').focus();
            currentStep.classList.add('animate__animated', 'animate__shakeX');
            setTimeout(() => {
                currentStep.classList.remove('animate__animated', 'animate__shakeX');
            }, 1000);
        }
        
        return isValid;
    }
    
    // Update review section with form data
    function updateReviewSection() {
        document.getElementById('reviewProductName').textContent = document.getElementById('productName').value;
        document.getElementById('reviewCategory').textContent = document.getElementById('productCategory').options[document.getElementById('productCategory').selectedIndex].text;
        document.getElementById('reviewBrand').textContent = document.getElementById('productBrand').value || 'Not specified';
        document.getElementById('reviewPrice').textContent = 'Rs. ' + document.getElementById('productPrice').value;
        document.getElementById('reviewComparePrice').textContent = document.getElementById('productComparePrice').value ? 'Rs. ' + document.getElementById('productComparePrice').value : 'Not specified';
        document.getElementById('reviewTax').textContent = document.getElementById('productTax').value + '%';
        document.getElementById('reviewSKU').textContent = document.getElementById('productSKU').value || 'Not specified';
        document.getElementById('reviewQuantity').textContent = document.getElementById('productQuantity').value;
        document.getElementById('reviewInventoryPolicy').textContent = document.getElementById('inventoryPolicy').options[document.getElementById('inventoryPolicy').selectedIndex].text;
    }
    
    // Form submission
    document.getElementById('productRegistrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep) && document.getElementById('agreeTerms').checked) {
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Process Dropzone files first if any
                if (dropzone.files.length > 0) {
                    dropzone.processQueue();
                }
                
                // Show success message
                alert('Product successfully registered!');
                
                // Reset form (in a real app, you might redirect instead)
                this.reset();
                document.getElementById('imagePreview').innerHTML = '';
                currentStep = 0;
                showStep(currentStep);
                submitBtn.innerHTML = '<i class="fas fa-check-circle me-2"></i> Submit Product';
                submitBtn.disabled = false;
            }, 2000);
        } else if (!document.getElementById('agreeTerms').checked) {
            document.getElementById('agreeTerms').classList.add('is-invalid');
        }
    });
    
    // Initialize first step
    showStep(currentStep);
});