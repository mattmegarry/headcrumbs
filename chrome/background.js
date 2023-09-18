const baseUrl = "http://localhost:8000/";

const apiRequest = async (path, method, data) => {
    const sessionid = await getCookies(baseUrl, "sessionid");
    const csrftoken = await getCookies(baseUrl, "csrftoken");

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Cookie': `csrftoken=${csrftoken}`,
            'Cookie': `sessionid=${sessionid}`
        },
    };

    if (method === "POST" && data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(baseUrl + path, options);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

chrome.runtime.onMessage.addListener((contentScriptRequest, sender, sendResponse) => {
    const { path, method, data } = contentScriptRequest;
    apiRequest(path, method, data)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return null;
            }
        })
        .then(data => {
            if (data) {
                return sendResponse({ success: true, data: data, errorMessage: "" });
            } else {
                return sendResponse({ success: false, data: null, errorMessage: "An API error occurred" });
            }
        }).catch(error => {
            return sendResponse({ success: false, data: null, errorMessage: "A client error occurred" });
        });
    return true;
}
);

chrome.runtime.onMessage.addListener(message => {
    if (message.closeCurrentTab) {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.remove(tabs[0].id);
        });
    }
});

async function getCookies(domain, name) {
    const cookie = await chrome.cookies.get({ url: domain, name: name });
    return cookie.value;
}