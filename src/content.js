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

    event.preventDefault();

    browser.runtime.sendMessage({
        url: link.href
    });
}, true);
