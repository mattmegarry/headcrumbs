let showCrumbUrls = true;

const toggleCrumbUrls = () => {
    const crumbUrls = document.getElementsByClassName('crumb-url-container');
    if (showCrumbUrls) {
        Array.from(crumbUrls).forEach((crumbUrl) => {
            crumbUrl.style.display = 'none';
        });
    }
    if (showCrumbUrls === false) {
        Array.from(crumbUrls).forEach((crumbUrl) => {
            crumbUrl.style.display = 'flex';
        });
    }
    showCrumbUrls = !showCrumbUrls;
    const toggleButton = document.getElementById('toggle-crumb-urls');
    toggleButton.innerText = showCrumbUrls ? 'Hide URLs' : 'Show URLs';
}