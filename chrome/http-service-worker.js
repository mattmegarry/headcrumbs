const baseUrl = "http://localhost:8000/";

const apiRequest = async (path, method, data) => {
    const sessionid = await getCookies(baseUrl, "sessionid");
    const csrftoken = await getCookies(baseUrl, "csrftoken");

    try {
        const response = await fetch(baseUrl + path, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Cookie': `csrftoken=${csrftoken}`,
                'Cookie': `sessionid=${sessionid}`
            },
            body: JSON.stringify(data)
        });
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
                return sendResponse({ saveSuccess: true, data: data, errorMessage: "" });
            } else {
                return sendResponse({ saveSuccess: false, data: null, errorMessage: "An API error occurred" });
            }
        }).catch(error => {
            return sendResponse({ saveSuccess: false, data: null, errorMessage: "A client error occurred" });
        });
    return true;
}
);

async function getCookies(domain, name) {
    const cookie = await chrome.cookies.get({ url: domain, name: name });
    return cookie.value;
}