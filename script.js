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

function operate(aStr, bStr, operatorStr) {
    const a = Number(aStr);
    const b = Number(bStr);
    const operator = operatorStr;
    let result = null;

    switch (operator) {
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
    if (e.target.classList[0] === "digit" && operatorStr === '') {
        if (e.target.innerText === '.' && aStr.includes('.')) {
            return;
        }

        aStr += e.target.innerText;
    }
    else if (e.target.classList[0] === "operator" && aStr !== '' && bStr === '') {
        operatorStr += e.target.innerText;
    }
    else if (e.target.classList[0] === "digit" && operatorStr !== '') {
        if (e.target.innerText === '.' && bStr.includes('.')) {
            return;
        }

        bStr += e.target.innerText;
    }

    let result = aStr + operatorStr + bStr;

    if (e.target.id === "action-equals" && bStr !== '') {
        result = operate(aStr, bStr, operatorStr)
        aStr = result;
        bStr = '';
        operatorStr = '';
    }
    else if (e.target.classList[0] === "operator" && bStr !== '') {
        result = operate(aStr, bStr, operatorStr);
        aStr = result;
        bStr = '';
        operatorStr = '';
        operatorStr += e.target.innerText;
    }
    else if (e.target.id === "action-back") {
        if (bStr !== '') bStr = bStr.slice(0, -1);
        else if (operatorStr !== '') operatorStr = operatorStr.slice(0, -1);
        else if (aStr !== '') aStr = aStr.slice(0, -1);
        result = aStr + operatorStr + bStr;
    }
    else if (e.target.id === "action-percent") {
        if (bStr !== '') bStr = bStr/100;
        else if (aStr !== '') aStr = aStr/100;
        result = aStr + operatorStr + bStr;
    }
    else if (e.target.id === "action-plusminus") {
        if (bStr !== '') bStr *= -1;
        else if (aStr !== '') aStr *= -1;

        result = aStr + operatorStr + bStr;
    }
    else if (e.target.id === "action-clear") {
        aStr = '';
        bStr = '';
        operatorStr = '';
        result = aStr + operatorStr + bStr;
    }

    updateDisplay(result);
}

function updateDisplay(inputStr) {
    const userInput = document.querySelector('#user-input');
    userInput.value = inputStr;
}

let aStr = '';
let bStr = '';
let operatorStr = '';

const inputButtons = document.querySelectorAll('button');
inputButtons.forEach(inputButton => {
    inputButton.addEventListener('click', setupExpression);
});