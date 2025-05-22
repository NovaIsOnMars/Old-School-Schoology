// Runs functions from other files, but only if the current site is on the list and the user's prefrences match the functions

chrome.storage.sync.get('allowedWebsites', function(data) {
    let allowedSites = data.allowedWebsites || [];
    let currentURL = window.location.href;
    if (allowedSites.some(site => currentURL.includes(site))) { // Check if current site matches any allowed sites
        console.log('Extension active on:', currentURL);
        // Injection of actual code

        // Updates favicon
        chrome.storage.local.get(["revertFavicon"], function(result) { // Checks if the box to enable it has been checked
            if (result.revertFavicon) {
                window.updateFavicon();
            }
        });

        // Changes misc. UI things
        chrome.storage.local.get(["revertUI"], function(result) { // Checks if the box to enable it has been checked
            if (result.revertUI) {
                window.miscUI();
                window.addEventListener('resize', function() { // Runs on window resize, to make sure icons are still edited after disappearing and reappearing
                    window.headerIcons();
                });
                window.headerIcons();
            }
        });

        // Icon changes (imports image and fits imagemap to icon)
        chrome.storage.local.get(["revertIcons"], function(result) { // Checks if the box to enable it has been checked
            if (result.revertIcons) {
                window.importImagemap();
                window.allignImagemap();
                setInterval(window.allignImagemap, 50); // Runs every 50 milliseconds to keep updating the icons (for instance, when expandable folders are opened)
            }
        });
    } 
    else {
        console.log('Site not in allowed list:', currentURL);
    }
});