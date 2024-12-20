const bubbleSets = document.querySelectorAll('.bubble-set');
let activeBubble = null; // Track the currently clicked bubble
let animationPaused = false; // To manage animation state
const brandText = document.getElementById('lhs-text');
const brandButton = document.getElementById('view-all-btn');

// Handle bubble click events for each set
bubbleSets.forEach((set) => {
  const bubbles = set.querySelectorAll('.bubble');

  bubbles.forEach((bubble) => {
    bubble.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent body click event from firing

      // If the same bubble is clicked again, reset
      if (bubble === activeBubble) {
        resetAll();
        return;
      }

      // Reset any previously clicked bubble
      resetAll();

      // Highlight the clicked bubble
      activeBubble = bubble;
      bubble.classList.add('clicked');

      // Dim all other bubbles on the screen
      dimAllExcept(bubble);

      // Stop animations for all bubbles
      pauseAnimations();

      // Change the left-hand side text and button
      brandText.textContent = `This is ${bubble.getAttribute('data-brand')}. They sell and they say "Wow, we are amazing!"`;
      brandButton.textContent = 'View This Brand'; // Update button text
    });
  });
});

// Pause animations for all bubbles
function pauseAnimations() {
  // Pause all bubbles in all sets
  document.querySelectorAll('.bubble').forEach((bubble) => {
    bubble.style.animationPlayState = 'paused';
  });
  animationPaused = true;
}

// Resume animations for all bubbles
function resumeAnimations() {
  // Resume all bubbles in all sets
  document.querySelectorAll('.bubble').forEach((bubble) => {
    bubble.style.animationPlayState = 'running';
  });
  animationPaused = false;
}

// Dim all bubbles except the clicked one
function dimAllExcept(clickedBubble) {
  document.querySelectorAll('.bubble').forEach((bubble) => {
    if (bubble !== clickedBubble) {
      bubble.classList.add('dimmed');
    }
  });
}

// Reset all transformations and styles
function resetAll() {
  bubbleSets.forEach((set) => {
    set.querySelectorAll('.bubble').forEach((bubble) => {
      bubble.classList.remove('clicked', 'dimmed');
    });
  });

  activeBubble = null;
  if (animationPaused) {
    resumeAnimations();
  }

  // Reset the brand text and button
  brandText.textContent = 'Select from top brands!!';
  brandButton.textContent = 'View All Brands';
}

// Reset when clicking outside bubbles
document.body.addEventListener('click', () => {
  resetAll();
});