chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        if (request.crumbContent) {
            const { crumbContent } = request;
            const { crumbText, crumbUrl } = crumbContent;

            const cookies = await getCookies("https://www.google.com/", "SSID");
            console.log(cookies);
            console.log(crumbContent);

            const url = "https://api.chucknorris.io/jokes/random";
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const { value } = data;
                    return value
                }).then((joke) => {
                    sendResponse({ saveSuccess: true, joke: joke });
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