
// #region setDivideButtonWidth()
function setDivideButtonWidth() {
    const divideButton = document.querySelector("#divide");
    const multiplyButton = document.querySelector("#multiply");
    const backspaceImg = document.querySelector("#backspace-img");

    const computedMultiply = getComputedStyle(multiplyButton);

    const loweredHeight = parseInt(computedMultiply.height, 10) * 0.7;
    backspaceImg.style.maxHeight = loweredHeight + "px";
    backspaceImg.style.display = "block";
    

    divideButton.style.maxWidth = computedMultiply.width;
}

window.addEventListener("load", setDivideButtonWidth);
window.addEventListener("resize", setDivideButtonWidth);
// #endregion

let firstOperand;
let lastOperator;
let secondOperand;

const reckoner = document.querySelector("#reckoner");

reckoner.addEventListener("click", (e) => input(e));

function input(e) {
    const inp = e.target.closest("button");
    if(!inp) return;
    console.log(inp.value)
}

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