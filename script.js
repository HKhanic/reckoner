function setDivideButtonWidth() {
    const divideButton = document.querySelector("#divide");
    const multiplyButton = document.querySelector("#multiply");

    console.log(divideButton.style.width);
    console.log(multiplyButton.style.width);

    const computedMultiply = getComputedStyle(multiplyButton).width;

    divideButton.style.maxWidth = computedMultiply;
}

// Run once when the page loads
window.addEventListener("load", setDivideButtonWidth);

// Run again when window is resized (keeps it synced)
window.addEventListener("resize", setDivideButtonWidth);
