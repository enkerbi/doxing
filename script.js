const images = document.querySelectorAll('.hover-img');

images.forEach(image => {
    image.addEventListener('mouseover', () => {
        // Get the data-targets attribute
        const targetIds = image.dataset.targets.split(',');

        // Loop over each target ID
        targetIds.forEach(targetId => {
            const targetText = document.getElementById(targetId);

            if (targetText) {
                // Scroll to the text smoothly
                targetText.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Highlight the text
                targetText.classList.add('highlight');
            }
        });
    });

    image.addEventListener('mouseout', () => {
        // Remove highlight from all associated texts
        const targetIds = image.dataset.targets.split(',');
        targetIds.forEach(targetId => {
            const targetText = document.getElementById(targetId);
            if (targetText) {
                targetText.classList.remove('highlight');
            }
        });
    });
});
function startCountingLoop(targetNumber, interval) {
  const counterElement = document.getElementById('counter');
  const imagesContainer = document.getElementById('images');
  let currentNumber = targetNumber;
  let direction = -1; // -1 for countdown, 1 for count up

  // Function to format numbers with commas
  function formatNumber(num) {
      return num.toLocaleString('en-US');
  }

  // Function to add an image
  function addImage(isCounterImage = false) {
      const img = document.createElement('img');
      img.src = 'tugrik.jpg'; // Placeholder image (replace with your own)
      img.alt = 'Image for count';

      // Apply unique styling if it's the counter image
      if (isCounterImage) {
          img.classList.add('counter-image');
      }

      imagesContainer.appendChild(img);
  }

  // Update the counter text
  counterElement.textContent = formatNumber(currentNumber);

  // Start interval
  const intervalId = setInterval(() => {
      // Update current number
      currentNumber += direction;

      // Add an image during countdown
      if (direction === -1) {
          const isSpecialImage = currentNumber % 5 === 0; // Add special image every 5 counts
          addImage(isSpecialImage);
      }

      // Switch direction at boundaries
      if (currentNumber <= 0) {
          direction = 1; // Start counting up
      } else if (currentNumber >= targetNumber && direction === 1) {
          direction = -1; // Switch to countdown
          currentNumber = targetNumber; // Reset to the starting value
          imagesContainer.innerHTML = ''; // Clear images on reset
      }

      // Update counter display
      counterElement.textContent = formatNumber(currentNumber);
  }, interval);
}

// Start the function:
// - Target number: 12 trillion
// - Interval: 100ms
startCountingLoop(12_000_000_000_000, 100);