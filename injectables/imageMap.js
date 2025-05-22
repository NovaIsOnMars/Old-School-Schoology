// Contains functions which do not run until called by content.js

// Identifies the specific icons by certain classes
const iconIdentifier = "span.item-icon, span.inline-icon:not(.clickable.mini), span.mini-icon"
const allignMap = [ // List of item identifiers to be used when deciding which icon fits which item ("eee" is a placeholder with no actual effect)
    "folder-color-blue",
    "assignment-icon",
    "assessment-icon",
    "discussion-icon",
    "eee",
    "media-album-icon",
    "page-icon",
    "image-icon",
    "pdf-icon",
    "ppt-icon",
    "xls-icon",
    "zip-icon",
    "doc-icon",
    "ai-icon",
    "psd-icon",
    "ind-icon",
    "link-icon",
    "music-icon",
    "video-icon",
    "file-icon",
    "txt-icon",
    "embed-icon",
    "eee",
    "eee",
    "eee",
    "eee",
    "eee",
    "eee",
    "collection-icon",
    "eee",
    "eee",
    "eee",
    "eee",
    "resources-app-icon",
    "eee",
    "web-add-icon",
    "scorm-add-icon",
    "content-app-file-icon",
    "eee",
    "content-app-link-icon",
    "eee",
    "content-app-embed-icon",
    "eee",
    "course-icon",
    "question-icon",
    "random-icon",
    "folder-color-red",
    "folder-color-orange",
    "folder-color-yellow",
    "folder-color-pink",
    "folder-color-purple",
    "folder-color-green",
    "folder-color-black",
    "folder-color-gray",
    "eee",
    "common-assessment-icon",
    "eee",
    "eee"
]

// Import imagemap (.clickable.mini is from the arrow used to open folders and the calendar icon above the upcoming tab. These aren't replaced.)
// This is accomplished by injecting the following CSS into the head of the document.
function importImagemap() {
    const iconCSS = document.createElement("style");
    iconCSS.innerHTML = `
    ${iconIdentifier} {
        background-image: url('${chrome.runtime.getURL("images/imageMap.png")}') !important;
        background-size: cover !important;
    }`;
    document.head.appendChild(iconCSS);
} window.importImagemap = importImagemap;

// Alligns the imagemap to it's position on the grid while scaling images' y position on the map relative to their size
// This is so the small icons still show up correctly
function allignImagemap() {
    const images = document.querySelectorAll(iconIdentifier);
    images.forEach(image => {
        const id = image.className;
        const bgWidth = window.getComputedStyle(image).width.replace("px", "");
        
        if (id.includes("grade-item-icon")) { // These are special cases that have multiple ID's for the same positon/icon
            image.setAttribute('style', `background-position-y:${-40 * (bgWidth / 32)}px !important`);
        }
        else if (id.includes("default-icon")) {
            image.setAttribute('style', `background-position-y:${-760 * (bgWidth / 32)}px !important`);
        }
        else if (id.includes("common-assessment-icon")) {
            image.setAttribute('style', `background-position-y:${-2199 * (bgWidth / 32)}px !important`);
        }
        else { // These are the regular cases
            const ids = id.split(" ");
            const newWords = ids.filter(word => allignMap.includes(word));
            const type = newWords.join();
            image.setAttribute('style', `background-position-y:${(allignMap.indexOf(type) * -40) * (bgWidth / 32)}px !important`);
        }
    });
} window.allignImagemap = allignImagemap;