let timeoutId;

function delayedHello() {
  // Clear any existing timeout to prevent multiple logs
  clearTimeout(timeoutId);

  // Set a new timeout to log "Hello" after 3 seconds
  timeoutId = setTimeout(() => {
    console.log("Hello");
  }, 3000);
}

// Attach the delayedHello function to the scroll event
window.addEventListener("scroll", delayedHello);
