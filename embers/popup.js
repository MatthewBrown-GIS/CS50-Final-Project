// popup.js
console.log('Popup script loaded');

document.addEventListener('DOMContentLoaded', function () {
  const darkModeSwitch = document.getElementById('darkModeSwitch');

  // Get the current dark mode state from storage
  browser.storage.sync.get('darkModeEnabled').then(function(data) {
    // Set the checkbox state based on the stored dark mode state
    darkModeSwitch.checked = data.darkModeEnabled;

    // Send a message to the content script to apply dark mode if it's enabled
    if (data.darkModeEnabled) {
      browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { toggleDarkMode: true }).then(function(response) {
          console.log('Dark mode toggled:', response);
        }).catch(function(error) {
          console.error('Error toggling dark mode:', error);
        });
      });
    }
  }).catch(function(error) {
    console.error('Error getting dark mode state:', error);
  });

  darkModeSwitch.addEventListener('change', function () {
    // Save the current dark mode state to storage
    browser.storage.sync.set({ darkModeEnabled: darkModeSwitch.checked }).then(function() {
      console.log('Dark mode state saved:', darkModeSwitch.checked);

      // Send a message to the content script to toggle dark mode
      browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { toggleDarkMode: darkModeSwitch.checked }).then(function(response) {
          console.log('Dark mode toggled:', response);
        }).catch(function(error) {
          console.error('Error toggling dark mode:', error);
        });
      });
    }).catch(function(error) {
      console.error('Error saving dark mode state:', error);
    });
  });
});
