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
}