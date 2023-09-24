const tooltipHtmlString = `
        <template id="verticalIndicatorTemplate">
            <div class="vertical-indicator" style="background-color: red; z-index: 9999; width: 5px; position: absolute;"></div>
        </template>
        <div id="headcrumbs-tooltip">
            <select id="trails-select" class="tooltip-element">
                <option value=""></option>
            </select>
            <button id="saveSelectedBtn" class="tooltip-button tooltip-element">
                <svg viewBox="187.9315 171.5395 88.3089 115.8999" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
                    <path d="M 209.759 268.745 H 284.362 L 284.362 252.245 L 314.362 277.245 L 284.362 302.245 L 284.362 285.745 H 209.759 V 268.745 Z" style="fill: rgb(255, 255, 255); stroke: rgb(255, 255, 255);" transform="matrix(0.4077779948711395, -0.9130810499191284, 0.9130810499191284, 0.4077779948711395, -127.92376708984375, 355.71759033203125)" bx:shape="arrow 209.759 252.245 104.603 50 17 30 0 1@053f64a8"/>
                </svg>
            </button>
            <button id="saveAndCloseTabBtn" class="tooltip-button tooltip-element">
                <svg viewBox="187.9315 171.5395 88.3089 115.8999" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
                    <path d="M 209.759 268.745 H 284.362 L 284.362 252.245 L 314.362 277.245 L 284.362 302.245 L 284.362 285.745 H 209.759 V 268.745 Z" style="stroke: rgb(255, 255, 255); fill: rgb(255, 255, 255);" transform="matrix(0.4077779948711395, -0.9130810499191284, 0.9130810499191284, 0.4077779948711395, -127.92376708984375, 355.71759033203125)" bx:shape="arrow 209.759 252.245 104.603 50 17 30 0 1@053f64a8"/>
                    <path d="M 146.309 174.324 H 155.758 V 193.224 H 174.659 V 202.673 H 155.758 V 221.574 H 146.309 V 202.673 H 127.409 V 193.224 H 146.309 Z" style="fill: rgb(255, 255, 255); paint-order: fill; stroke: rgb(0, 0, 0); stroke-width: 2px; transform-origin: 151.034px 197.949px;" transform="matrix(0.354649066925, 0.934999108315, -0.934999108315, 0.354649066925, 79.166974866732, 35.589926523147)" bx:shape="cross 127.409 174.324 47.25 47.25 9.449 9.449 0.5 1@3143f1b5"/>
                </svg>
            </button>
        </div>
`;

const notificationHtmlString = `
        <div id="headcrumbs-activated" class="headcrumbs-notification">
            <p>Headcrumbs <span id="headcrumbs-mode" style="color: palegreen;">Activated</span></p>
        </div>
        <div id="headcrumbs-deactivated" class="headcrumbs-notification">
            <p>Headcrumbs <span id="headcrumbs-mode" style="color: purple;">Deactivated</span></p>
        </div>
`;

const styledTooltip = ({ display = "none", left = 0, top = 0 }) => `
    #headcrumbs-tooltip {
        align-items: center;
        background-color: black;
        border-radius: 5px;
        border: none;
        z-index: 9999;
        display: ${display};
        justify-content: center;
        left: ${left}px;
        padding: 5px 10px;
        position: fixed;
        top: ${top}px;
    }
    #trails-select {
        width: 100px;
        color: palegreen;
        border: solid 2px purple;
        border-radius: 5px;
        background-color: transparent;
    }
    .tooltip-element {
        border: none;
        margin-right: 20px;
    }
    .tooltip-element:last-child {
        margin-right: 0;
    } 
    .tooltip-button {
        cursor: pointer;
        width: 40px;
        background-color: transparent;
    }
    .text-marker {
        fill: white;
    }
    .text-marker:hover {
        fill: red;
    }
`;

const styledNotification = ({ display = "none" }) => `
    .headcrumbs-notification {
        font-family: sans-serif;
        color: white;
        align-items: center;
        background-color: black;
        border-radius: 5px;
        border: none;
        z-index: 9999;
        display: ${display};
        justify-content: center;
        left: 20px;
        padding: 5px 10px;
        position: fixed;
        bottom: 20px;
    }
    .headcrumbs-notification p {
        font-weight: bolder; 
        text-decoration: underline white;
        text-underline-offset: 8px; 
        text-decoration-thickness: 2px;
        margin-top: 8px;
    }
`;

const tooltipContainer = document.createElement("div");
const tooltipFragment = document.createRange().createContextualFragment(tooltipHtmlString);
tooltipContainer.attachShadow({ mode: "open" });
const style = document.createElement("style");
style.textContent = styledTooltip({});
tooltipContainer.shadowRoot.appendChild(style);
tooltipContainer.shadowRoot.appendChild(tooltipFragment);
document.body.appendChild(tooltipContainer);

const notificationContainer = document.createElement("div");
const notificationFragment = document.createRange().createContextualFragment(notificationHtmlString);
notificationContainer.attachShadow({ mode: "open" });
const notificationStyle = document.createElement("style");
notificationStyle.textContent = styledNotification({});
notificationContainer.shadowRoot.appendChild(notificationStyle);
notificationContainer.shadowRoot.appendChild(notificationFragment);
document.body.appendChild(notificationContainer);

console.log('HeadCrumbs is active - Trace your steps, cement your knowledge');

const tooltipDisplay = (newStyles) => {
    const styleElement = tooltipContainer.shadowRoot.querySelector("style");
    styleElement.textContent = styledTooltip(newStyles);
}

const showNotification = (elementId) => {
    const notification = notificationContainer.shadowRoot.getElementById(elementId);
    notification.style.display = "flex";
    setTimeout(() => {
        notification.style.display = "none";
    }, 750);
}

const setTooltipSaveText = (saveText) => {
    const tooltip = tooltipContainer.shadowRoot.getElementById("headcrumbs-tooltip");
    return tooltip.setAttribute(
        "tooltipSaveText",
        saveText
    );
};

const getTooltipShowStyles = () => {
    const rangeBounds = window
        .getSelection()
        .getRangeAt(0)
        .getBoundingClientRect();
    return {
        // Substract width of marker button -> 40px / 2 = 20
        left: rangeBounds.left + rangeBounds.width / 2 - 20,
        top: rangeBounds.top - 30,
        display: "flex",
    };
}

const getSelectedText = () => {
    return window.getSelection().toString();
}

let tooltipActive = true;

document.addEventListener("click", () => {
    if (tooltipActive && getSelectedText().length > 0) {
        tooltipDisplay(getTooltipShowStyles());
        setTooltipSaveText(getSelectedText());
    }
});

document.addEventListener("selectionchange", () => {
    if (tooltipActive && getSelectedText().length === 0) {
        tooltipDisplay({ display: "none" });
        setTooltipSaveText("");
    }
});

let hKeyCount = 0;
let hKeyTimer;

document.addEventListener('keydown', (event) => {
    if (event.key === 'h') {
        hKeyCount++;
        clearTimeout(hKeyTimer);
        hKeyTimer = setTimeout(() => {
            hKeyCount = 0;
        }, 500);
        if (hKeyCount === 3) {
            tooltipActive = !tooltipActive;
            console.log(`HeadCrumbs is ${tooltipActive ? "active" : "inactive"}`);
            if (!tooltipActive) {
                tooltipDisplay({ display: "none" });
                setTooltipSaveText("");
                showNotification('headcrumbs-deactivated');
            }
            if (tooltipActive && getSelectedText().length > 0) {
                tooltipDisplay(getTooltipShowStyles());
                setTooltipSaveText(getSelectedText());
            }
            if (tooltipActive) {
                showNotification('headcrumbs-activated');
            }
        }
    }
});

const placeSavedSelectionIndicator = () => {
    var userSelection = window.getSelection();
    const range = userSelection.getRangeAt(0);
    const { top, left, height } = range.getBoundingClientRect();
    const topInDocument = top + window.scrollY;
    const leftInDocument = left + window.scrollX;
    const verticalIndicatorTemplate = tooltipContainer.shadowRoot.getElementById("verticalIndicatorTemplate");
    const verticalIndicator = verticalIndicatorTemplate.cloneNode(true).content.firstElementChild;
    verticalIndicator.style.top = `${topInDocument}px`;
    verticalIndicator.style.left = `${leftInDocument - 20}px`;
    verticalIndicator.style.height = `${height}px`;
    document.body.appendChild(verticalIndicator);
    window.getSelection().empty();
}

const apiRequests = {
    saveCrumb: () => {
        const saveText = tooltipContainer.shadowRoot.getElementById("headcrumbs-tooltip").getAttribute("tooltipsavetext");
        const url = window.location.href;
        const trailSlug = tooltipContainer.shadowRoot.getElementById("trails-select").value;
        console.log(trailSlug);
        chrome.runtime.sendMessage({ path: "api/crumbs/", method: "POST", data: { text: saveText, url: url } }, function (response) {
            const { success, data, errorMessage } = response;
            if (success) {
                if (trailSlug) {
                    const crumb = data;
                    apiRequests.saveTrailCrumb(crumb.id, trailSlug);
                }
                console.log(data);
                console.log("Saved!");
            } else {
                console.error(errorMessage);
            }
        });
        placeSavedSelectionIndicator();
    },
    saveCrumbCloseTab: () => {
        const saveText = tooltipContainer.shadowRoot.getElementById("headcrumbs-tooltip").getAttribute("tooltipsavetext");
        const url = window.location.href;
        const trailSlug = tooltipContainer.shadowRoot.getElementById("trails-select").value;
        chrome.runtime.sendMessage({ path: "api/crumbs/", method: "POST", data: { text: saveText, url: url } }, function (response) {
            const { success, data, errorMessage } = response;
            if (success) {
                if (trailSlug) {
                    const crumb = data;
                    apiRequests.saveTrailCrumb(crumb.id, trailSlug);
                }
                console.log(data);
                console.log("Saved!");
                chrome.runtime.sendMessage({ closeCurrentTab: true });
            } else {
                console.error(errorMessage);
            }
        });
        placeSavedSelectionIndicator();
    },
    saveTrailCrumb: (crumbId, trailSlug) => {
        chrome.runtime.sendMessage({ path: "api/trailcrumbs/", method: "POST", data: { crumbId: crumbId, slug: trailSlug } }, function (response) {
            const { success, data, errorMessage } = response;
            if (success) {
                console.log(data);
                console.log("TrailCrumb Saved!");
            } else {
                console.error(errorMessage);
            }
        });
    },
    getTrails: () => {
        const url = window.location.href;
        chrome.runtime.sendMessage({ path: "api/trails/", method: "GET", data: { url: url } }, function (response) {
            const { success, data, errorMessage } = response;
            if (success) {
                const select = tooltipContainer.shadowRoot.getElementById("trails-select");
                const options = data;
                options.forEach(option => {
                    const optionText = option.name;
                    const optionValue = option.slug;
                    select.add(new Option(optionText, optionValue));
                });
                console.log("Got them!");
            } else {
                console.error(errorMessage);
            }
        });
    }
}

tooltipContainer.shadowRoot.getElementById("saveSelectedBtn").addEventListener("click", apiRequests.saveCrumb);
tooltipContainer.shadowRoot.getElementById("saveAndCloseTabBtn").addEventListener("click", apiRequests.saveCrumbCloseTab);

apiRequests.getTrails();
