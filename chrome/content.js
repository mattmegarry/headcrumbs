console.log('HeadCrumbs is active - Trace your steps, cement your knowledge');

const tooltip = document.createElement("save-selected-tooltip");
document.body.appendChild(tooltip);

const setTooltipPosition = (tooltipPosition) =>
    tooltip.setAttribute(
        "tooltipPosition",
        JSON.stringify(tooltipPosition)
    );

const setTooltipSaveText = (saveText) => {
    return tooltip.setAttribute(
        "tooltipSaveText",
        saveText
    );
};

const getSelectedText = () => window.getSelection().toString();

document.addEventListener("click", () => {
    if (getSelectedText().length > 0) {
        setTooltipPosition(getTooltipPosition());
        setTooltipSaveText(getSelectedText());
    }
    console.log(tooltip["tooltipPosition"]);
});

document.addEventListener("selectionchange", () => {
    if (getSelectedText().length === 0) {
        setTooltipPosition({ display: "none" });
    }
});

function getTooltipPosition() {
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

