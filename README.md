# CS50-Final-Project: Embers for Firefox, a dark-mode add-on
#### Video Demo:  [https://www.youtube.com/watch?v=tlZnKUs3qQM](https://youtu.be/tlZnKUs3qQM?si=4yHxbfiWCbirhBuB)
#### Description: This is an experimental add-on for Firefox web browsers that attempts to convert any page into its dark mode equivalent, such that surfing the web at night is less strenuous on the eyes.


# Requirements for use
1. The downloaded repository
2. The Mozilla Firefox web browser installed on your computer. You can download it from the official website: [Download Firefox](https://www.mozilla.org/en-US/firefox/new/). 

# Installing

From the official [documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension): 
>In Firefox: Open the [about:debugging](https://firefox-source-docs.mozilla.org/devtools-user/about_colon_debugging/index.html) page, click the This Firefox option, click the Load Temporary Add-on button, then select any file in your extension's directory.

>The extension now installs, and remains installed until you restart Firefox.

>Note: By default extensions don't work in private browsing. If you want to test this extension in private browsing open "about:addons", click on the extension, and select the Allow radio button for Run in Private Windows."

You can also just go here: about:debugging#/runtime/this-firefox to load the addon.

# Usage
1. Once installed in the about:debugging page, you can simply click the Embers icon (a picture of a fox starting at a moon) to open the addon popup.
2. Click the slider button to turn dark mode on and off.
3. Your dark mode state should be remembered across tabs, meaning you do not need to constantly turn the addon on again every time you change web pages.


# Description of project
Here is a sketch of the folder directories:

project
|-- LICENSE
|-- README.md
|-- testWebsite
|   |-- index.html
|-- embers
|   |-- background.js
|   |-- embers.js
|   |-- manifest.json
|   |-- popup.html
|   |-- popup.js
|   |-- css
|   |   |-- styles.css
|   |-- icons
|   |   |-- Embers-16.png
|   |   |-- Embers-48.png
|   |   |-- Embers-96.png
|   |-- img
|       |-- moon.png

The file you are reading now is the README.md, which details how the addon works. The LICENSE file is a generic software license containing usage rights/guidelines.

## testWebsite folder
The folder testWebsite contains an index.html file, which when opened in a web browser displays a generic template of a typical website, with a navbar, tables, lists, and various other elements you would find on a typical website. This template is intended as a "playground" of sorts to test the addon with during development, and can reliably be used to show the addons functionality.

## manifest.json

The `manifest.json` file serves as the metadata and configuration for the addon. It defines essential information such as the addon's name, version, description, permissions, background scripts, content scripts, browser actions, etc.

- `name`: Specifies the name of the addon.
- `version`: Specifies the version of the addon.
- `description`: Provides a brief description of the addon.
- `icons`: Defines icons used for the addon.
- `background`: Specifies the background script or service worker for the addon.
- `permissions`: Lists the permissions required by the addon.
- `action`: Defines the browser action, such as popup, icon, etc.
- `content_scripts`: Specifies scripts injected into web pages.

You can modify the `manifest.json` file to customize the behavior and features of the addon according to your requirements.

### `popup.html`

- The popup is the main way that users interact with the addon. It provides a simple on/off switch.
- HTML file defining the structure of the popup.
- Contains elements such as buttons, checkboxes, etc., for user interaction.
- Links to CSS and JavaScript files.

### `popup.js`

- JavaScript file responsible for handling user interactions and events within the popup.
- Retrieves and manipulates data from storage.
- Sends messages to content scripts or background scripts.

### `styles.css`

- CSS file containing styles for the popup.
- Defines the appearance and layout of elements within the popup.

### `embers.js`

- JavaScript file serving as the content script.
- Implements dark mode functionality by manipulating CSS styles on web pages, specifically by "injecting" them into the page.
- Communicates with background scripts or popup scripts using message passing.

### `background.js`

- JavaScript file serving as the background script.
- Listens for events such as addon installation, browser actions, message passing, etc.
- Manages addon functionality that persists across different tabs and windows.