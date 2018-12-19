(async function () {
    document.querySelector('form').addEventListener('change', (event) => {
        browser.storage.local.set({
            highlightExternalLinks: document.getElementById('highlightExternalLinks').checked,
            handleAllExternalLinks: document.getElementById('handleAllExternalLinks').checked
        });
    });

    const defaultSettings = {
        highlightExternalLinks: false,
        handleAllExternalLinks: false
    };

    const userSettings = await browser.storage.local.get(defaultSettings);

    document.getElementById('highlightExternalLinks').checked = userSettings.highlightExternalLinks;
    document.getElementById('handleAllExternalLinks').checked = userSettings.handleAllExternalLinks;
}());
