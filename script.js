// #region setSizes()
function setSizes() {
    const divideButton = document.querySelector("#divide");
    const multiplyButton = document.querySelector("#multiply");
    const display = document.querySelector("#display");
    const buttons = document.querySelector("#buttons");
    //const images = document.querySelectorAll(".img");

    const computedMultiply = getComputedStyle(multiplyButton);
    const computedButtons = getComputedStyle(buttons);

    const loweredHeight = parseInt(computedMultiply.height, 10) * 0.7;
    
    divideButton.style.maxWidth = computedMultiply.width;

    display.style.maxWidth = computedButtons.width;
}

window.addEventListener("load", setSizes);
window.addEventListener("resize", setSizes);
// #endregion

const calc = {
    firstOperand: null,
    operator: null,
    secondOperand: null,
}


let display = null; 

const reckoner = document.querySelector("#reckoner");

reckoner.addEventListener("click", (e) => input(e));

function input(e) {
    const inp = e.target.closest("button");
    if(!inp) return;

    const value = inp.value;

    if(/^[0-9]$/.test(value)) {
        handleDigit(value);
    } else if(/^[+\-/*]$/.test(value)) {
        handleOperator(e, value);
    } else {
        switch(value) {
            case "=":
                handleEquals();
                break;
            case "C":
                handleClear();
                break;
            case "B":
                handleBackspace();
                break;
            case "+-":
                handleSignToggle();
                break;
            case ".":
                handleDecimal();
                break;
        }
    }
    
}

// #region calc functions

function handleDigit(value) {
    if (calc.operator === null) {
        calc.firstOperand = (calc.firstOperand ?? "") + value;
        updateDisplay(calc.firstOperand);
    } else {
        calc.secondOperand = (calc.secondOperand ?? "") + value;
        updateDisplay(calc.secondOperand);
    }
}

function handleOperator(e, value) {
    if (calc.firstOperand !== null && calc.operator !== null && calc.secondOperand !== null) {
        calc.firstOperand = updateDisplay(operation(calc.firstOperand, calc.operator, calc.secondOperand));
        calc.operator = value;
    } else if(calc.firstOperand === null){
        return;
    } else {
        calc.operator = value;
    }
    highlightActiveOperator();
}

function highlightActiveOperator() {
    const operators = document.querySelectorAll(".operator");

    operators.forEach( item => {
        if(item.value === calc.operator) {
            item.classList.add("highlight");
        } else {
            item.classList.remove("highlight");
        }
    });
}

function handleEquals() {
    if(calc.firstOperand !== null && calc.operator !== null && calc.secondOperand !== null) {
        calc.firstOperand = updateDisplay(operation(calc.firstOperand, calc.operator, calc.secondOperand));
    }
}

function handleClear() {
    calc.firstOperand = null;
    calc.operator = null;
    calc.secondOperand = null;
    updateDisplay("");
    highlightActiveOperator();
}

function handleBackspace() {
    if(calc.operator === null || calc.secondOperand === null) {
        calc.firstOperand = updateDisplay(calc.firstOperand.slice(0, -1));
    } else {
        calc.secondOperand = updateDisplay(calc.secondOperand.slice(0, -1));
    }
}

function handleSignToggle() {
    if(calc.operator === null || calc.secondOperand === null) {
        calc.firstOperand = updateDisplay((-calc.firstOperand).toString());
    }
    else if(calc.secondOperand != null) {
        calc.secondOperand = updateDisplay((-calc.secondOperand).toString());
    }
}

function handleDecimal() {
    if(calc.firstOperand.includes(".") && (calc.operator === null || calc.secondOperand === null)) {

    } else if(!calc.firstOperand.includes(".")) {
        calc.firstOperand = updateDisplay(calc.firstOperand + ".");
    }

    if(calc.secondOperand != null && calc.secondOperand.includes(".") ) {

    } else if(calc.secondOperand !== null){
        calc.secondOperand = updateDisplay(calc.secondOperand + ".");
    }
}

// #endregion

function operation(operand1, operator, operand2) {
    calc.secondOperand = null;
    calc.operator = null;
    highlightActiveOperator();

    if(operator == "/" && operand2 == "0") {
        calc.firstOperand = null;
        updateDisplay("NO DIVIDES ET ZERO");
        return;
    }

    switch(operator){
        case "+":
            return (+((+operand1 + +operand2).toFixed(2))).toString();
        case "-":
            return (+((+operand1 - +operand2).toFixed(2))).toString();
        case "*":
            return (+((+operand1 * +operand2).toFixed(2))).toString();
        case "/":
            return (+((+operand1 / +operand2).toFixed(2))).toString();
    }
}

function updateDisplay(toDisplay) {

    if (toDisplay == null) { // covers both null and undefined
        console.log("updateDisplay called with null/undefined — ignored");
        return; // bail out
    }

     if (updateDisplay._busy) {
    console.warn("updateDisplay re-entrant call ignored", toDisplay);
    return;
    }
    updateDisplay._busy = true;

    try {
    const display = document.querySelector("#display-text");
    const str = String(toDisplay);

    let modified = null;
    const n = Number(str);
    if (!Number.isNaN(n) && n < 0) {
      modified = str.slice(1) + str[0];
    } else if (str.at(-1) === ".") {
      modified = str.at(-1) + str.slice(0, -1);
    }

    display.textContent = modified ?? str;
    return str;
    } finally {
        updateDisplay._busy = false;
    }
}