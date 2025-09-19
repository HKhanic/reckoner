// #region setSizes()
function setSizes() {
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

window.addEventListener("load", setSizes);
window.addEventListener("resize", setSizes);
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
    const operator = /^[+\-/*]$/.test(inp.value);

    if(inp.value == "=" && firstOperand != null && lastOperator != null && secondOperand != null) {
        firstOperand = updateDisplay(operation(firstOperand, lastOperator, secondOperand));
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
    else if(operator) {
        if(firstOperand != null && lastOperator != null && secondOperand != null) {
            firstOperand = updateDisplay(operation(firstOperand, lastOperator, secondOperand));
            lastOperator = inp.value;
        }
        else {
            lastOperator = inp.value;
        }
    }
    else if(inp.value == "C") {
        firstOperand = null;
        lastOperator = null;
        secondOperand = null;
        updateDisplay(firstOperand);
    }
    else if(inp.value == "B") {
        if(lastOperator === null) {
            firstOperand = updateDisplay(firstOperand.slice(0, -1));
        }
    }

    console.log(inp.value)
}

function operation(operand1, operator, operand2) {
    secondOperand = null;
    console.log(`${operand1} ${operator} ${operand2}`);
    switch(operator){
        case "+":
            return (+operand1 + +operand2).toString();
        case "-":
            return (+operand1 - +operand2).toString();
        case "*":
            return (+operand1 * +operand2).toString();
        case "/":
            return (+((+operand1 / +operand2).toFixed(2))).toString();
    }
}

function updateDisplay(toDisplay) {
    const display = document.querySelector("#display-text");

    let modified = null;

    if((+toDisplay) < 0) {
        modified = toDisplay.slice(1) + toDisplay[0];
    }

    display.textContent = modified ?? toDisplay;

    return toDisplay;
}