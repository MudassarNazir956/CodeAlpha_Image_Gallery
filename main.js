// script.js

const totalImages = 16; // Number of images to fetch
const displayedImage = document.getElementById('displayed-image');
const thumbnailContainer = document.getElementById('thumbnail-container');
const modal = document.getElementById('image-modal');
const closeModal = document.getElementById('close-modal'); // Close button reference
let images = [];
let currentIndex = 0;

async function fetchImages() {
    for (let i = 0; i < totalImages; i++) {
        const response = await fetch(`https://picsum.photos/1250/550?random=${i}`);
        const imageUrl = response.url;
        images.push(imageUrl);
        createThumbnail(imageUrl);
    }
}

function createThumbnail(imageUrl) {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail';
    thumbnail.innerHTML = `<img src="${imageUrl}" alt="Thumbnail" />`;
    thumbnail.addEventListener('click', () => {
        currentIndex = images.indexOf(imageUrl);
        openModal(imageUrl);
    });
    thumbnailContainer.appendChild(thumbnail);
}

function openModal(imageUrl) {
    displayedImage.src = imageUrl;
    modal.style.display = "block";
    updateActiveThumbnail();
    document.addEventListener('keydown', handleKeyboardNavigation); // Add keyboard navigation

    // Add event listener to close modal when clicking outside the image
    modal.addEventListener('click', handleModalClick);
}

function closeModalFunc() {
    modal.style.display = "none";
    document.removeEventListener('keydown', handleKeyboardNavigation); // Remove keyboard navigation
    modal.removeEventListener('click', handleModalClick); // Remove modal click listener
}

function handleKeyboardNavigation(event) {
    if (event.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        displayedImage.src = images[currentIndex];
    } else if (event.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        displayedImage.src = images[currentIndex];
    } else if (event.key === "Escape") {
        closeModalFunc(); // Close modal when Esc is pressed
    }
}

function handleModalClick(event) {
    // Check if the target of the click is the modal itself
    if (event.target === modal) {
        closeModalFunc(); // Close the modal if clicking outside the image
    }
}

function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
    });
}

// Event listener for previous and next buttons
document.getElementById('prev-button').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    displayedImage.src = images[currentIndex];
});

document.getElementById('next-button').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    displayedImage.src = images[currentIndex];
});

// Close modal when the close button is clicked
closeModal.addEventListener('click', closeModalFunc);

// Initialize the gallery
fetchImages();
