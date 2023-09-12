chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        if (request.text && request.url) {
            const { text, url } = request;

            const sessionid = await getCookies("http://localhost:8000/", "sessionid");
            const csrftoken = await getCookies("http://localhost:8000/", "csrftoken");


            const baseUrl = "http://localhost:8000/api/crumbs/";
            fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                    'Cookie': `csrftoken=${csrftoken}`,
                    'Cookie': `sessionid=${sessionid}`
                },
                body: JSON.stringify({
                    text: text,
                    url: url
                })
            })
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    sendResponse({ saveSuccess: true });
                }).catch((error) => {
                    sendResponse({ saveSuccess: false, errorMessage: "An API error occurred" });
                });
        } else {
            sendResponse({ saveSuccess: false, errorMessage: "A client-side error occurred" });
        }
        return true;
    }
);

async function getCookies(domain, name) {
    const cookie = await chrome.cookies.get({ url: domain, name: name });
    return cookie.value;
}