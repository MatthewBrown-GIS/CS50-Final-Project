browser.tabs.onActivated.addListener(function(activeInfo) {
  // Retrieve dark mode state from storage
  browser.storage.local.get('darkModeEnabled').then(function(data) {
    if (data.darkModeEnabled) {
      // Send message to the content script of the activated tab to apply dark mode
      browser.tabs.sendMessage(activeInfo.tabId, { toggleDarkMode: true }).then(function(response) {
        console.log('Dark mode toggled in new tab:', response);
      }).catch(function(error) {
        console.error('Error toggling dark mode in new tab:', error);
      });
    }
  }).catch(function(error) {
    console.error('Error getting dark mode state in new tab:', error);
  });
});



chrome.runtime.onInstalled.addListener(() => {
  console.log('Embers installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle messages from the extension
  console.log('Message received:', message);
});

