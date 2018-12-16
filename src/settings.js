(async function () {
    document.querySelector('form').addEventListener('change', (event) => {
        browser.storage.local.set({
            highlightExternalLinks: document.getElementById('highlightExternalLinks').checked
        });
    });

    const defaultSettings = {
        highlightExternalLinks: false
    };

    const userSettings = await browser.storage.local.get(defaultSettings);

    document.getElementById('highlightExternalLinks').checked = userSettings.highlightExternalLinks;
}());
