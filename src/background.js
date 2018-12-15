browser.runtime.onMessage.addListener(async (msg) => {
    const { url } = msg;

    let incognitoWindows = await browser.windows.getAll({
        windowTypes: ['normal']
    });

    incognitoWindows = incognitoWindows.filter(window => window.incognito);

    if (incognitoWindows.length > 0) {
        browser.tabs.create({
            url,
            windowId: incognitoWindows[0].id
        });

        browser.windows.update(incognitoWindows[0].id, {
            focused: true
        });
    } else {
        browser.windows.create({
            url,
            incognito: true
        });
    }
});