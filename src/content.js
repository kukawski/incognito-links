const getLink = (node) => {
    while (node) {
        if (node.tagName && node.tagName.toUpperCase() === 'A') {
            return node;
        }

        node = node.parentNode;
    }

    return null;
}

const isExternalLink = (link) => {
    return link.host.toLowerCase() !== location.host.toLowerCase();
};

const isIncognitoWindow = () => {
    try {
        return browser.extension.inIncognitoContext;
    } catch (err) {
        return false;
    }
}

const insertCss = (css) => {
    const style = document.createElement('style');
    style.textContent = css;
    document.querySelector('head').appendChild(style);
}

document.addEventListener('click', function (event) {
    const link = getLink(event.target);

    if (!link || !isExternalLink(link) || isIncognitoWindow()) {
        return;
    }

    // if right click, ignore, cause it will offer a context menu
    // event.button: 0 - left click, 1 - middle click, 2 - right click
    // for left-handed people the codes are reverse
    if (event.button >= 2) {
        return;
    }

    // if ALT is pressed, assume user wants to disable extension
    // todo: check if doesn't conflict with built-in browser features
    // or cause weird behaviour
    if (event.altKey) {
        return;
    }

    event.preventDefault();

    browser.runtime.sendMessage({
        url: link.href
    });
}, true);

// todo: make it configurable
if (!isIncognitoWindow()) {
    insertCss(`
        a[href^="http://"]:not([href^="${location.protocol}//${location.host}"]),
        a[href^="https://"]:not([href^="${location.protocol}//${location.host}"]) {
            outline: 3px solid lightblue !important;
        }
    `);
}
