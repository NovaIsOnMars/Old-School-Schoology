// Controls the toggle checkboxes and saving their states

// When popup opened, sets checkboxes to correct state
window.onload = function() {
    chrome.storage.local.get(["revertFavicon"], function(result) {
        document.getElementById("revertFavicon").checked = result.revertFavicon || false;
    });
    chrome.storage.local.get(["revertUI"], function(result) {
        document.getElementById("revertUI").checked = result.revertUI || false;
    });
    chrome.storage.local.get(["revertIcons"], function(result) {
        document.getElementById("revertIcons").checked = result.revertIcons || false;
    });
};

// Saves states
document.getElementById("revertFavicon").addEventListener("change", function() {
    chrome.storage.local.set({ revertFavicon: this.checked });
});

document.getElementById("revertUI").addEventListener("change", function() {
    chrome.storage.local.set({ revertUI: this.checked });
});

document.getElementById("revertIcons").addEventListener("change", function() {
    chrome.storage.local.set({ revertIcons: this.checked });
});