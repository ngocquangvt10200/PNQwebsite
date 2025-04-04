// Modal interaction for projects
document.querySelectorAll('.work-item .btn').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const [title, process, description] = item.getAttribute('data-details').split('|');
        const imageSrc = item.querySelector('img').src;
        const modal = document.getElementById('modal');
        modal.querySelector('.modal-image').src = imageSrc;
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-process').textContent = process;
        modal.querySelector('.modal-description').textContent = description;
        modal.style.display = 'block';
    });
});

document.querySelector('#modal .modal-close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

// Modal interaction for hobby images
document.querySelectorAll('.hobby-img').forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.getElementById('hobby-modal');
        if (modal) {
            modal.querySelector('.modal-image').src = image.src;
            modal.style.display = 'block';
        }
    });
});

document.querySelector('#hobby-modal .modal-close')?.addEventListener('click', () => {
    document.getElementById('hobby-modal').style.display = 'none';
});