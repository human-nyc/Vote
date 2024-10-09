let currentImage = 1;
const totalImages = 11; // Updated to include PostCard11
const imgElement = document.getElementById('postcard');
const exploreBtn = document.getElementById('explore-btn');
const exploreContainer = document.getElementById('explore-container');
const slideshow = document.querySelector('.slideshow'); // Get the slideshow container

// Create the popup container
const popup = document.createElement('div');
popup.classList.add('popup');
const popupImg = document.createElement('img');
popup.appendChild(popupImg);
document.body.appendChild(popup);

// Instagram links for each postcard
const instagramLinks = [
    "https://www.instagram.com/jeffreysincich/?hl=en", // Postcard 1
    "https://www.instagram.com/billrebholz/?hl=en", // Postcard 2
    "https://www.instagram.com/zachpollakoff/?hl=en", // Postcard 3
    "https://www.instagram.com/rachaelyaeger/?hl=en", // Postcard 4
    "https://www.instagram.com/michaelcorrey/?hl=en", // Postcard 5
    "https://www.instagram.com/wylie_garcia/?hl=en", // Postcard 6
    "https://www.instagram.com/neildmaclean/?hl=en", // Postcard 7
    "https://www.instagram.com/clayhickson/?hl=en", // Postcard 8
    "https://www.instagram.com/teshietesh/?hl=en", // Postcard 9
    "https://www.instagram.com/clayhickson/?hl=en", // Postcard 10
    "https://www.instagram.com/adigoodrich/?hl=en"  // Postcard 11
];

// Function to change the image
function changeImage() {
    currentImage = (currentImage % totalImages) + 1;  // Increment image, reset to 1 after 11
    imgElement.src = `PostCard${currentImage}.jpg`;
}

// Automatically change image every 1 second
let autoSlide = setInterval(changeImage, 1000);

// Remove the click event listener to stop changing the image on click
// imgElement.addEventListener('click', () => { changeImage(); }); // Remove this line

// Function to show all images in a grid format
function showExplore() {
    // Hide the slideshow
    slideshow.style.display = 'none';

    // Show the explore container and display the grid
    exploreContainer.style.display = 'grid';
    exploreContainer.innerHTML = ''; // Clear any existing content

    // Create and add images to the container
    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        img.src = `PostCard${i}.jpg`;
        img.alt = `Postcard ${i}`;
        img.classList.add('explore-img');
        exploreContainer.appendChild(img);

        // Add event listener to each image to open the popup
        img.addEventListener('click', () => openPopup(`PostCard${i}.jpg`));
    }

    // Change the button text to "Back"
    exploreBtn.textContent = 'Back';
    exploreBtn.removeEventListener('click', showExplore);
    exploreBtn.addEventListener('click', goBack); // Add event listener to go back
}

// Function to open the popup with the larger image
function openPopup(imageSrc) {
    popupImg.src = imageSrc; // Set the source of the larger image
    popup.style.display = 'flex'; // Show the popup
}

// Function to go back to the slideshow view
function goBack() {
    // Hide the explore container
    exploreContainer.style.display = 'none';

    // Show the slideshow again
    slideshow.style.display = 'flex';

    // Change the button text back to "All"
    exploreBtn.textContent = 'All';
    exploreBtn.removeEventListener('click', goBack);
    exploreBtn.addEventListener('click', showExplore); // Add event listener to show the grid again
}

// Add event listener to close the popup when clicked outside the image
popup.addEventListener('click', (e) => {
    if (e.target === popup) {  // Check if the click is outside the image (inside the popup background)
        popup.style.display = 'none';  // Close the popup
    }
});

// Add event listener for explore button to show the grid initially
exploreBtn.addEventListener('click', showExplore);

// Stop the slideshow when the user hovers over the image
imgElement.addEventListener('mouseover', () => {
    clearInterval(autoSlide); // Stop the slideshow
});

// Restart the slideshow when the user stops hovering over the image
imgElement.addEventListener('mouseout', () => {
    autoSlide = setInterval(changeImage, 1000); // Restart the slideshow
});

// Add event listener to the main image in the slideshow to open Instagram link
imgElement.addEventListener('click', () => {
    const instagramUrl = instagramLinks[currentImage - 1]; // Get the corresponding Instagram link
    window.open(instagramUrl, '_blank'); // Open the Instagram link in a new tab
});
