function sum(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a/b;
};

function operate(aStr, bStr, operandStr) {
    const a = Number(aStr);
    const b = Number(bStr);
    const operand = operandStr;
    let result = null;

    switch (operand) {
        case "+": 
            result = sum(a, b);
            break;
        case "-": 
            result = subtract(a, b);
            break;
        case "*": 
            result = multiply(a, b);
            break;
        case "/": 
            result = divide(a, b);
            break;
        default:
            result = 'Error';
    }

    return result;
};

function setupExpression(e) {    
    if (e.target.classList[0] === "digit" && operandStr === '') {
        aStr += e.target.innerText;
        updateDisplay(aStr+operandStr+bStr);
    }
    else if (e.target.classList[0] === "operand") {
        operandStr += e.target.innerText;
        updateDisplay(aStr+operandStr+bStr);
    }
    else if (e.target.classList[0] === "digit" && operandStr !== '') {
        bStr += e.target.innerText;
        updateDisplay(aStr+operandStr+bStr);
    };

    if (e.target.id === "equals") {
        let result = operate(aStr, bStr, operandStr);
        updateDisplay(result);
        aStr = '';
        bStr = '';
        operandStr = '';
    };

    if (e.target.id === "clear") {
        aStr = '';
        bStr = '';
        operandStr = '';
        updateDisplay(aStr+operandStr+bStr);
    };

}

function updateDisplay(inputStr) {
    const userInput = document.querySelector('#user-input');
    userInput.value = inputStr;
}

let aStr = '';
let bStr = '';
let operandStr = '';

const inputButtons = document.querySelectorAll('button');
inputButtons.forEach(inputButton => {
    inputButton.addEventListener('click', setupExpression);
});