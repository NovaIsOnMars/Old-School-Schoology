// Syncs version, title, and description in the popup menu with the manifest inputs

document.addEventListener("DOMContentLoaded", function () {
    const manifestData = chrome.runtime.getManifest();
    const versionElement = document.getElementById("version");
    const titleElement = document.getElementById("title");
    const descElement = document.getElementById("desc");
    if (versionElement) {
        versionElement.textContent = `v${manifestData.version}`; // Version element (bottom right)
    }
    if (titleElement) {
        titleElement.textContent = manifestData.name; // Title element (top)
    }
    if (descElement) {
        descElement.textContent = manifestData.description; // Description element (beneath title)
    }
});