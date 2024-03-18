// embers.js

// Function to inject CSS styles for dark mode
function injectDarkModeStyles() {
  // Create a <style> element
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Dark mode styles */
    body.dark-mode {
      background-color: #222 !important;
      color: #ddd !important;
    }

    body.dark-mode * {
      color: #fff !important; /* Set all text and spans to white */
    }

    body.dark-mode a {
      color: #58a6ff !important; /* Links color */
    }

    body.dark-mode button {
      background-color: #555 !important; /* Button background color */
      color: #fff !important; /* Button text color */
    }

    /* Header dark mode styles */
    body.dark-mode header {
      background-color: #333 !important;
      color: #fff !important;
    }

    /* Navbar dark mode styles */
    body.dark-mode nav {
      background-color: #333 !important; /* Navbar background color */
    }

    body.dark-mode nav ul li a {
      color: #ddd !important; /* Navbar link color */
    }

    body.dark-mode .navbar-toggler-icon {
      background-color: #fff !important; /* Navbar toggler icon color */
    }

    /* Table dark mode styles */
    body.dark-mode table {
      background-color: #444 !important; /* Table background color */
      color: #fff !important; /* Table text color */
    }

    body.dark-mode th,
    body.dark-mode td {
      border-color: #666 !important; /* Table border color */
    }

    body.dark-mode th {
      background-color: #333 !important; /* Table header background color */
    }

    body.dark-mode tr:nth-child(even) {
      background-color: #333 !important; /* Alternating row background color */
    }

    body.dark-mode tr:hover {
      background-color: #555 !important; /* Hovered row background color */
    }

    /* Dark mode styles for specific sites */

    /* Black background for spans with text */
    body.dark-mode span:not(:empty) {
      background-color: #000 !important;
      color: #fff !important;
      padding: 2px 4px; /* Optional: Add padding to make the background visible */
    }
  `;
  // Append the <style> element to the <head> of the document
  document.head.appendChild(styleElement);
  // Log that dark mode styles have been injected
  console.log('Dark mode styles injected');
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

// Inject dark mode styles when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Inject dark mode styles
  injectDarkModeStyles();
});

// Add a listener for messages from the extension
browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Log the received message
  console.log('Message received:', message);

  // Check if the message indicates that dark mode should be toggled
  if (message.toggleDarkMode !== undefined) {
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
