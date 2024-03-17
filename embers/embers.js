// embers.js

// Log that the content script is loaded
console.log('Content script loaded');

// Function to inject CSS styles for dark mode
function injectDarkModeStyles() {
  // Check if styles have already been injected
  if (!document.getElementById('dark-mode-styles')) {
    // Create a <style> element
    const styleElement = document.createElement('style');
    styleElement.id = 'dark-mode-styles';
    styleElement.textContent = `
      /* Dark mode styles */
      body {
        background-color: #222;
        color: #ddd;
      }
      a {
        color: #58a6ff; /* Links color */
      }
      button {
        background-color: #555; /* Button background color */
        color: #fff; /* Button text color */
      }
      /* Navbar dark mode styles */
      .navbar-nav {
        background-color: #333; /* Navbar background color */
      }
      .navbar-nav .nav-link {
        color: #ddd !important; /* Navbar link color */
      }
      .navbar-toggler-icon {
        background-color: #fff; /* Navbar toggler icon color */
      }
      /* Add more dark mode styles for Bootstrap components here */
    `;
    // Append the <style> element to the <head> of the document
    document.head.appendChild(styleElement);
    // Log that dark mode styles have been injected
    console.log('Dark mode styles injected');
  }
}

// Function to remove injected CSS styles
function removeDarkModeStyles() {
  // Check if styles have been injected
  const styleElement = document.getElementById('dark-mode-styles');
  if (styleElement) {
    // Remove the <style> element from the <head> of the document
    styleElement.parentNode.removeChild(styleElement);
    // Log that dark mode styles have been removed
    console.log('Dark mode styles removed');
  }
}

// Add a listener for messages from the popup script
browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Log the received message
  console.log('Message received:', message);

  // Check if the message indicates that dark mode should be toggled
  if (message.toggleDarkMode) {
    // Log that dark mode toggle is requested
    console.log('Toggle dark mode requested');

    // Toggle dark mode class on the body element of the webpage
    document.body.classList.toggle('dark-mode');

    // Check if dark mode class is now true
    if (document.body.classList.contains('dark-mode')) {
      // Inject dark mode styles
      injectDarkModeStyles();
    } else {
      // Remove dark mode styles
      removeDarkModeStyles();
    }

    // Log the current state of the dark mode class on the body element
    console.log('Dark mode class toggled:', document.body.classList.contains('dark-mode'));

    // Send a response indicating that dark mode has been toggled
    sendResponse({ toggled: true });
  }
});
