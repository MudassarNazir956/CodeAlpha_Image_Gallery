const totalImages = 16; 
const displayedImage = document.getElementById('displayed-image');
const thumbnailContainer = document.getElementById('thumbnail-container');
const modal = document.getElementById('image-modal');
const closeModal = document.getElementById('close-modal');
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
    document.addEventListener('keydown', handleKeyboardNavigation);

    
    modal.addEventListener('click', handleModalClick);
}

function closeModalFunc() {
    modal.style.display = "none";
    document.removeEventListener('keydown', handleKeyboardNavigation);
    modal.removeEventListener('click', handleModalClick);
}

function handleKeyboardNavigation(event) {
    if (event.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        displayedImage.src = images[currentIndex];
    } else if (event.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        displayedImage.src = images[currentIndex];
    } else if (event.key === "Escape") {
        closeModalFunc();
    }
}

function handleModalClick(event) {
    
    if (event.target === modal) {
        closeModalFunc(); 
    }
}

function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
    });
}


document.getElementById('prev-button').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    displayedImage.src = images[currentIndex];
});

document.getElementById('next-button').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    displayedImage.src = images[currentIndex];
});


closeModal.addEventListener('click', closeModalFunc);


fetchImages();
