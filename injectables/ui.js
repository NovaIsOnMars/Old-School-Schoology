// Contains functions which do not run until called by content.js

// Change the favicon
function updateFavicon() {
    const faviconLink = document.querySelector("link[rel~='icon']");
    if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        document.head.appendChild(faviconLink);
    }
    faviconLink.href = chrome.runtime.getURL("images/favicon.ico");
} window.updateFavicon = updateFavicon;

// Injects a stylesheet that makes miscellaneous UI changes
function miscUI() {
    let miscUI = document.createElement("link");
    miscUI.rel = "stylesheet";
    miscUI.type = "text/css";
    miscUI.href = chrome.runtime.getURL("injectables/miscUI.css");
    document.head.appendChild(miscUI);
} window.miscUI = miscUI;

// Change the icons of the buttons on the top header bar
function headerIcons() {
    const icons = [
        "Search",
        "Show Apps",
        "Calendar",
        "message",
        "notification"
    ]
    for (let index in icons) {
        const matches = Array.from(document.querySelectorAll('[aria-label]'))
            .filter(el => el.getAttribute('aria-label').includes(icons[index]));

        if (matches.length > 0) {
            for (let index2 in matches) {
                const svgElement = matches[index2].querySelector("svg");

                if (svgElement) {
                    const imgElement = document.createElement("img");

                    imgElement.src = chrome.runtime.getURL(`images/headerIcons/${icons[index].toLowerCase().replace(/\s/g, '')}.png`);
                    imgElement.width = svgElement.clientWidth;
                    imgElement.height = svgElement.clientHeight;

                    if (icons[index] == "Calendar") { // Lowers the calendar icon because for some reason it is higher
                        imgElement.style.position = "relative";
                        imgElement.style.top = "5px";
                    }

                    svgElement.replaceWith(imgElement);
                }
            }
        }
    }

} window.headerIcons = headerIcons;