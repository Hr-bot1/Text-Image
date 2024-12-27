document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Show loading overlay
    document.getElementById('loadingOverlay').style.display = 'flex';

    const imageText = document.getElementById('imageText').value;

    // Simulate image generation process with progress circle
    let progress = 0;
    const progressInterval = setInterval(function() {
        progress += 10;
        document.getElementById('progressText').textContent = `${progress}%`;
        document.getElementById('progressCircle').style.background = `conic-gradient(#ff0000 ${progress}% 0%, #444 0% 100%)`;

        if (progress === 100) {
            clearInterval(progressInterval);
            // Hide loading overlay
            document.getElementById('loadingOverlay').style.display = 'none';
            generateImages(imageText); // Call the image generation function
        }
    }, 500); // Progress increases every 0.5 seconds
});

// Function to generate 4 images using Craiyon (formerly DALL·E Mini)
async function generateImages(prompt) {
    const apiUrl = `https://backend.craiyon.com/generate`;

    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Clear any previous images

    try {
        // Send request to Craiyon API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();

        if (data.images) {
            // Create 4 images based on the response from Craiyon
            for (let i = 0; i < 4; i++) {
                const generatedImage = document.createElement('img');
                generatedImage.src = data.images[i]; // Craiyon returns an array of image URLs
                generatedImage.alt = `Generated Image ${i + 1}`;
                generatedImage.style.maxWidth = '45%';
                generatedImage.style.margin = '10px';
                generatedImage.style.border = '2px solid #ff0000';
                generatedImage.style.borderRadius = '8px';
                imageContainer.appendChild(generatedImage);
            }
        } else {
            console.error("Error generating images:", data);
        }
    } catch (error) {
        console.error("Error with API request:", error);
    }
}
