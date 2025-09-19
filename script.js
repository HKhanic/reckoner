// #region setDivideButtonWidth()
function setDivideButtonWidth() {
    const divideButton = document.querySelector("#divide");
    const multiplyButton = document.querySelector("#multiply");
    const backspaceImg = document.querySelector("#backspace-img");
    const display = document.querySelector("#display");
    const buttons = document.querySelector("#buttons");

    const computedMultiply = getComputedStyle(multiplyButton);
    const computedButtons = getComputedStyle(buttons);

    const loweredHeight = parseInt(computedMultiply.height, 10) * 0.7;
    backspaceImg.style.maxHeight = loweredHeight + "px";
    backspaceImg.style.display = "block";
    
    divideButton.style.maxWidth = computedMultiply.width;

    display.style.maxWidth = computedButtons.width;
}

window.addEventListener("load", setDivideButtonWidth);
window.addEventListener("resize", setDivideButtonWidth);
// #endregion

let firstOperand = null;
let lastOperator = null;
let secondOperand = null;
let display = null; 

const reckoner = document.querySelector("#reckoner");

reckoner.addEventListener("click", (e) => input(e));

function input(e) {
    const inp = e.target.closest("button");
    if(!inp) return;

    const digit = /^[0-9]$/.test(+(inp.value));

    if(inp == "=" && firstOperand != null && lastOperator != null && secondOperand != null) {
        updateDisplay(operation(firstOperand, lastOperator, secondOperand));
    }
    else if(digit){
        if(firstOperand == null) {
            firstOperand = inp.value;
        }
        else if(lastOperator == null) {
            firstOperand += inp.value;
        }
        else if (lastOperator != null) {
            if(secondOperand == null) {
                secondOperand = inp.value;
            } else {
                secondOperand += inp.value;
            }
        }
        else {
            console.log("szar van a digit levesbe");
        }

        if(lastOperator == null) {
            updateDisplay(firstOperand);
        }
        else {
            updateDisplay(secondOperand);
        }
    }

    console.log(inp.value)
}

function operation(operand1, operator, operand2) {
    firstOperand = null;
    secondOperand = null;
    lastOperator = null;
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

function updateDisplay(toDisplay) {
    const display = document.querySelector("#display-text");

    display.textContent = toDisplay;
}