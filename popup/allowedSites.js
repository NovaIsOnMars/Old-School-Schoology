// Controls which sites the extension is run on and which ones it isn't

document.getElementById('addWebsite').addEventListener('click', function() {
    let websiteInput = document.getElementById('websiteInput').value;
    if (websiteInput) {
        chrome.storage.sync.get({ allowedWebsites: [] }, function(data) {
            let websites = data.allowedWebsites;
            websites.push(websiteInput);
            chrome.storage.sync.set({ allowedWebsites: websites }, function() {
                console.log('Website added:', websiteInput);
                displayWebsites(websites);
            });
        });
        document.getElementById('websiteInput').value = "";
    }
});

// Load websites as list in popup window, including remove buttons
function displayWebsites(websites) {
    let list = document.getElementById('websiteList');
    list.innerHTML = '';

    websites.forEach((site, index) => {
        let li = document.createElement('li');
        li.textContent = site;
        li.id = 'site';

        // Remove buttons
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.id = 'remove';
        removeBtn.addEventListener('click', function() {
            removeWebsite(index);
        });

        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}

// When popup is opened, run the previous function
chrome.storage.sync.get('allowedWebsites', function(data) {
    displayWebsites(data.allowedWebsites || []);
});

// Removes a website when the remove button is pressed
function removeWebsite(index) {
    chrome.storage.sync.get('allowedWebsites', function(data) {
        let websites = data.allowedWebsites || [];
        if (index > -1) {
            websites.splice(index, 1);
            chrome.storage.sync.set({ allowedWebsites: websites }, function() {
                console.log('Website removed!');
                displayWebsites(websites);
            });
        }
    });
}