console.log('Popup script loaded');
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');

  toggleButton.addEventListener('click', function () {
    console.log('Toggle button clicked');
    // Send message to content script
    browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
      browser.tabs.sendMessage(tabs[0].id, { toggleDarkMode: true }).then(function(response) {
        console.log('Dark mode toggled:', response);
      }).catch(function(error) {
        console.error('Error toggling dark mode:', error);
      });
    });
  });
});
