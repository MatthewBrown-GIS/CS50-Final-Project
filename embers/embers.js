// embers.js

/* Citation: OpenAI's ChatGPT was used to help generate various components of this code */

console.log('Embers content script loaded');
// Function to inject CSS styles for dark mode
function injectDarkModeStyles() {
  // Create a <style> element
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Dark mode styles */


    body.dark-mode {
      color: #fff !important; /* Set all text and spans to white */
      background-color: #222 !important;
    }

    body.dark-mode * {
      color: #fff !important; /* Set all text and spans to white */
      background-color: #222 !important;
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

    /* Black background for spans with text */
    body.dark-mode span:not(:empty) {
      background-color: #000 !important;
      color: #fff !important;
      padding: 2px 4px; /* Optional: Add padding to make the background visible */
    }

    /* Dark mode styles for <main> element */s
    body main {
      background-color: #333 !important;
      color: #fff !important;
      padding: 20px; /* Adjust padding as needed */
    }
  `;
  // Append the <style> element to the <head> of the document
  document.head.appendChild(styleElement);
  // Log that dark mode styles have been injected
  console.log('Dark mode styles injected');
}

// Function to toggle dark mode and update storage
function toggleDarkMode() {
  // Toggle dark mode class on the body element of the webpage
  document.body.classList.toggle('dark-mode');

  // Check if dark mode class is now true
  if (document.body.classList.contains('dark-mode')) {
    // Inject dark mode styles
    injectDarkModeStyles();
    // Store the state of dark mode toggle button
    browser.storage.local.set({ darkModeEnabled: true });
  } else {
    // Remove dark mode styles
    document.head.removeChild(document.getElementById('dark-mode-styles'));
    // Log that dark mode styles have been removed
    console.log('Dark mode styles removed');
    // Store the state of dark mode toggle button
    browser.storage.local.set({ darkModeEnabled: false });
  }
}

// Function to apply dark mode based on stored state
function applyDarkModeFromStorage() {
  // Retrieve the stored state of dark mode toggle button
  browser.storage.sync.get('darkModeEnabled').then(function(result) {
    const darkModeEnabled = result.darkModeEnabled;
    if (darkModeEnabled) {
      // Enable dark mode
      document.body.classList.add('dark-mode');
      // Inject dark mode styles
      injectDarkModeStyles();
    }
  }).catch(function(error) {
    console.error('Error retrieving dark mode state:', error);
  });
}

// Apply dark mode based on stored state
applyDarkModeFromStorage();

// Add a listener for messages from the extension
browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Log the received message
  console.log('Message received:', message);

  // Check if the message indicates that dark mode should be toggled
  if (message.toggleDarkMode !== undefined) {
    // Log that dark mode toggle is requested
    console.log('Toggle dark mode requested');
    // Toggle dark mode and update storage
    toggleDarkMode();
    // Log the current state of the dark mode class on the body element
    console.log('Dark mode class toggled:', document.body.classList.contains('dark-mode'));
    // Send a response indicating that dark mode has been toggled
    sendResponse({ toggled: true });
  }
});
