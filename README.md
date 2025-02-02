# WhatsApp Chat Web Redirector

Welcome to the WhatsApp Chat Web Redirector extension. This extension ensures that when you click the "Continue to Chat" button on api.whatsapp.com, you are redirected to WhatsApp Web instead of launching the app automatically.

## Features

- **URL Modification:** Automatically updates the URL parameters to prevent the WhatsApp app from launching.
- **Script Blocking:** Overrides `window.open` to block any scripts trying to force the app to open.
- **Dynamic Button Handling:** Uses a MutationObserver to apply redirection even if the button is added after the initial page load.

## Installation

1. Clone or download this repository.
2. Load the extension into your browser (Chrome, Firefox, etc.) in developer mode.
3. Navigate to any page on api.whatsapp.com to see the redirection in action.

## Usage

Once installed, the extension will automatically monitor for the "Continue to Chat" button and redirect you to the modified URL with the required parameter adjustments. No additional user action is needed.

## Privacy Disclaimer

This extension is designed with your privacy in mind. It operates entirely within your browser and does not collect, store, or transmit any personal data or browsing information to external servers. All URL modifications and interactions occur locally on your device.

**Key Points:**

- **Local Processing:** All actions are performed locally; no personal data is shared externally.
- **No Tracking:** The extension does not have any tracking or analytics features.
- **User Responsibility:** While we have taken precautions to ensure your privacy, we encourage you to review the source code to understand its behavior fully.
- **Transparency:** The extension is open-source, so you may inspect the code to verify that it does not compromise your data security.

By using this extension, you acknowledge its behavior regarding privacy. If you have any questions or concerns, please review the source code or contact the developer.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
