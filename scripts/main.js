document.addEventListener('DOMContentLoaded', function() {
    // Initialize modal elements
    const modal = document.getElementById('modal');
    const hobbyModal = document.getElementById('hobby-modal');
    
    if (modal) {
        initializeProjectModal();
    }
    
    if (hobbyModal) {
        initializeHobbyModal();
    }
});

// Project Modal Functionality
function initializeProjectModal() {
    const modal = document.getElementById('modal');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalContentText = modal.querySelector('.modal-content-text');
    const modalClose = modal.querySelector('.modal-close');

    // Handle project item clicks
    document.querySelectorAll('.work-item').forEach(workItem => {
        workItem.addEventListener('click', function(event) {
            // Prevent default behavior for any links within work-item
            event.preventDefault();

            const imageSrc = this.querySelector('img').src;
            const imageAlt = this.querySelector('img').alt;
            
            try {
                const dataDetails = JSON.parse(this.getAttribute('data-details'));
                
                // Set modal content
  modalImage.src = imageSrc;
modalImage.alt = imageAlt;
modalTitle.textContent = dataDetails.title || '';

// Xử lý nội dung mô tả và link YouTube nếu có
modalContentText.innerHTML = '';

if (dataDetails.content) {
    const contentParagraphs = dataDetails.content.split('\n').map(p => `<p>${p}</p>`).join('');
    modalContentText.innerHTML += contentParagraphs;
}

if (dataDetails.youtube) {
    modalContentText.innerHTML += `
        <div style="margin-top: 0px; text-align: center;">
            <a href="${dataDetails.youtube}" target="_blank" class="btn btn-secondary">View Channel</a>
        </div>
    `;
}
                // Show modal
                showModal(modal);
            } catch (error) {
                console.error('Error parsing project details:', error);
            }
        });
    });

    // Close modal functionality
    modalClose.addEventListener('click', () => closeModal(modal));

    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}

// Hobby Modal Functionality
function initializeHobbyModal() {
    const hobbyModal = document.getElementById('hobby-modal');
    const hobbyModalImage = hobbyModal.querySelector('.modal-image');
    const hobbyModalClose = hobbyModal.querySelector('.modal-close');

    // Handle hobby image clicks
    document.querySelectorAll('.hobby-img').forEach(image => {
        image.addEventListener('click', function() {
            hobbyModalImage.src = this.src;
            hobbyModalImage.alt = this.alt;
            showModal(hobbyModal);
        });
    });

    // Close hobby modal
    if (hobbyModalClose) {
        hobbyModalClose.addEventListener('click', () => closeModal(hobbyModal));
    }

    // Close hobby modal when clicking outside
    hobbyModal.addEventListener('click', function(event) {
        if (event.target === hobbyModal) {
            closeModal(hobbyModal);
        }
    });
}

// Modal utility functions
function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Reset scroll position
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.scrollTop = 0;
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Clear modal content
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalContentText = modal.querySelector('.modal-content-text');
    
    if (modalImage) modalImage.src = '';
    if (modalTitle) modalTitle.textContent = '';
    if (modalContentText) modalContentText.textContent = '';
}

// Global keyboard event handler
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close any open modals
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => closeModal(modal));
    }
});

// Smooth scrolling for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optional: Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0.5';
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transition = 'opacity 0.3s ease';
            });
        }
    });
});