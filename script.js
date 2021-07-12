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

function captureShiftKey(e) {
    if (e.code.includes('Shift')) {
        shiftKeyDown = true;
    }
}

function mapKeyPress(e) {
    if (shiftKeyDown) {
        switch(e.code) {
            case 'Digit8':
                document.getElementById('operator-mult').click();
                break;    
            case 'Equal':
                document.getElementById('operator-sum').click();
                break;
            case 'Backspace':
                document.getElementById('action-clear').click();
                break;
        }
    }
    else {
        switch(e.code) {
            case 'Numpad0':
            case 'Digit0':
                document.getElementById('digit-0').click();
                break;
            case 'Numpad1':
            case 'Digit1':
                document.getElementById('digit-1').click();
                break;
            case 'Numpad2':
            case 'Digit2':
                document.getElementById('digit-2').click();
                break;
            case 'Numpad3':
            case 'Digit3':
                document.getElementById('digit-3').click();
                break;
            case 'Numpad4':
            case 'Digit4':
                document.getElementById('digit-4').click();
                break;
            case 'Numpad5':
            case 'Digit5':
                document.getElementById('digit-5').click();
                break;
            case 'Numpad6':
            case 'Digit6':
                document.getElementById('digit-6').click();
                break;
            case 'Numpad7':
            case 'Digit7':
                document.getElementById('digit-7').click();
                break;
            case 'Numpad8':
            case 'Digit8':
                document.getElementById('digit-8').click();
                break;
            case 'Numpad9':
            case 'Digit9':
                document.getElementById('digit-9').click();
                break;
            case 'NumpadDecimal':
            case 'Period':
                document.getElementById('decimal').click();
                break;
            case 'NumpadDivide':
            case 'Slash':
                document.getElementById('operator-div').click();
                break;
            case 'NumpadMultiply':
                document.getElementById('operator-mult').click();
                break;
            case 'NumpadSubtract':
            case 'Minus':
                document.getElementById('operator-sub').click();
                break;
            case 'NumpadAdd':
                document.getElementById('operator-sum').click();
                break;
            case 'NumpadEnter':
            case 'Enter':
            case 'Equal':
                document.getElementById('action-equals').click();
                break;
            case 'Backspace':
                document.getElementById('action-back').click();
                break;
        }    
    }

    if (shiftKeyDown) shiftKeyDown = false;
}

let aStr = '';
let bStr = '';
let operatorStr = '';
let shiftKeyDown = false;

const inputButtons = document.querySelectorAll('button');
inputButtons.forEach(inputButton => {
    inputButton.addEventListener('click', setupExpression);
});

window.addEventListener('keydown', captureShiftKey);
window.addEventListener('keyup', mapKeyPress);