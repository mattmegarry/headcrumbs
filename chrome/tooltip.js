const tooltipHtmlString = `
        <template id="verticalIndicatorTemplate">
            <div class="vertical-indicator" style="background-color: red; z-index: 9999; width: 5px; position: absolute;"></div>
        </template>
        <div id="headcrumbs-tooltip">
            <p>Hello</p>
            <button id="saveSelectedBtn">
                <svg class="text-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512"><path d="M0 479.98L99.92 512l35.45-35.45-67.04-67.04L0 479.98zm124.61-240.01a36.592 36.592 0 0 0-10.79 38.1l13.05 42.83-50.93 50.94 96.23 96.23 50.86-50.86 42.74 13.08c13.73 4.2 28.65-.01 38.15-10.78l35.55-41.64-173.34-173.34-41.52 35.44zm403.31-160.7l-63.2-63.2c-20.49-20.49-53.38-21.52-75.12-2.35L190.55 183.68l169.77 169.78L530.27 154.4c19.18-21.74 18.15-54.63-2.35-75.13z"></path></svg>
            </button>
            <button id="saveAndCloseTabBtn">Save & Close tab</button>
        </div>
`;

const styled = ({ display = "none", left = 0, top = 0 }) => `
  #saveSelectedBtn {
    align-items: center;
    background-color: black;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    display: ${display};
    justify-content: center;
    left: ${left}px;
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    width: 40px;
    z-index: 9999;
  }
  .text-marker {
    fill: white;
  }
  .text-marker:hover {
    fill: red;
  }
`;

const tooltipContainer = document.createElement("div");
const tooltipFragment = document.createRange().createContextualFragment(tooltipHtmlString);
tooltipContainer.attachShadow({ mode: "open" });
const style = document.createElement("style");
style.textContent = styled({});
tooltipContainer.shadowRoot.appendChild(style);
tooltipContainer.shadowRoot.appendChild(tooltipFragment);
document.body.appendChild(tooltipContainer);

console.log('HeadCrumbs is active - Trace your steps, cement your knowledge');

const tooltipDisplay = (newStyles) => {
    const styleElement = tooltipContainer.shadowRoot.querySelector("style");
    styleElement.textContent = styled(newStyles);
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

document.addEventListener("click", () => {
    if (getSelectedText().length > 0) {
        tooltipDisplay(getTooltipShowStyles());
        setTooltipSaveText(getSelectedText());
    }
});

document.addEventListener("selectionchange", () => {
    if (getSelectedText().length === 0) {
        tooltipDisplay({ display: "none" });
        setTooltipSaveText("");
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
        chrome.runtime.sendMessage({ path: "api/crumbs/", method: "POST", data: { text: saveText, url: url } }, function (response) {
            const { saveSuccess, data, errorMessage } = response;
            if (saveSuccess) {
                console.log("Saved!");
            } else {
                console.error(errorMessage);
            }
        });
        placeSavedSelectionIndicator();
    },
}

tooltipContainer.shadowRoot.getElementById("saveSelectedBtn").addEventListener("click", apiRequests.saveCrumb)