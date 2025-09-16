
// #region setDivideButtonWidth()
function setDivideButtonWidth() {
    const divideButton = document.querySelector("#divide");
    const multiplyButton = document.querySelector("#multiply");

    console.log(divideButton.style.width);
    console.log(multiplyButton.style.width);

    const computedMultiply = getComputedStyle(multiplyButton).width;

    divideButton.style.maxWidth = computedMultiply;
}

window.addEventListener("load", setDivideButtonWidth);
window.addEventListener("resize", setDivideButtonWidth);
// #endregion



function operation(operand1, operator, operand2) {
    switch(operator){
        case "+":
            return +operand1 + +operand2;
        case "-":
            return +operand1 - +operand2;
        case "*":
            return +operand1 * +operand2;
        case "%":
            return +((+operand1 / +operand2).toFixed(2));
    }
}