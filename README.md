# Adobe Analytics Tag Tracking

## Overview
This project includes two JavaScript files that detect elements in the HTML, create an analytics object, and send it to `window.digitalDataLayer` for Adobe Analytics.

- **`tag.js`** - Extracts data from specific HTML attributes and pushes it to Adobe Analytics.
- **`observer.js`** - Monitors the DOM for dynamically added elements with specific attributes and triggers event tracking.

## File Structure
```
/project-root
│── index.html
│── tag.js
│── observer.js
```

## Installation and Usage
### 1️⃣ Add Scripts to HTML
Include the following lines in your `index.html` before `</body>`:
```html
<script src="observer.js"></script>
<script src="tag.js"></script>
```
### 2️⃣ Add Attributes to HTML Elements
Add attributes to track elements dynamically:
```html
<button a-tag-handler="click-me" a-tag-category="signup" a-tag-custom-event="clickMeButtonCustomEvent">Click Me</button>
```

## How It Works
### **🔍 `observer.js`**
- Uses `MutationObserver` to detect newly added elements with defined attributes.
- Calls the callback function whenever a matching element is added to the DOM.

### **📊 `tag.js`**
- Extracts attribute values from elements (`a-tag-handler`, `a-tag-category`, etc.).
- Collects page and environment details.
- Formats data into an object and pushes it to `window.digitalDataLayer`.
- Listens for clicks on elements with `a-tag-handler` and triggers data collection.

## Sample Analytics Object
When an element is clicked, the following object is created and pushed to `window.digitalDataLayer`:
```json
[
    {
        "event": "click",
        "data": {
            "environment": {
                "applicationVersion": "1.0",
                "applicationName": "application-name",
                "environmentName": "localhost",
                "siteName": "localhost",
                "statusCode": 200
            },
            "location": {
                "languageCode": "en"
            },
            "page": {
                "pageName": "",
                "pageURL": "http://localhost:8080/",
                "pageSiteSection": "",
                "pageType": "page type",
                "pagePreviousURL": "",
                "customEvents": [
                    "clickMeButtonCustomEvent"
                ]
            },
            "ctaInfo": {
                "name": "clickMeButton",
                "url": "http://localhost:8080/",
                "action": "en",
                "type": "click-me-button"
            }
        }
    }
]
```

## Troubleshooting
1. **Events not tracking?**
  - Ensure elements have the required attributes (`a-tag-handler`, `a-tag-category`, etc.).
  - Confirm that `window.digitalDataLayer` is initialized in your HTML.
  - Check console errors for missing script files.

2. **Observer not working?**
  - Ensure `observer.js` is loaded **before** `tag.js` in the HTML.

## Conclusion
This script simplifies event tracking by automatically detecting and tracking elements with predefined attributes. It is designed to work seamlessly with Adobe Analytics for better insights into user interactions. You just need to connect a snippet from analytics.

🚀 **Now you're ready to track events dynamically!**


