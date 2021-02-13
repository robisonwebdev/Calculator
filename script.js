let displayValue = '';
let storeCurrent = '';
let storedValues = [];

// Math Operator Functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiple(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return (`Cant divide by zero!`);
    } else {
        return num1 / num2;
    }
}

function plusNegative(num) {
    return (-1 * num);
}

function percentage(num) {
    return (num/100);
}

// Function to determine which math operator to call
function operate(num1, operator, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiple(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

//Function to loop over storedValue array and calculate numbers until array.length = 1
function calculate() {
    let newArrayValue;

    while (storedValues.length != 1) {
        if (storedValues.findIndex(element => element == '*') != -1) {
            let arrayPos = storedValues.findIndex(element => element == '*');        
            newArrayValue = operate(parseFloat(storedValues[arrayPos - 1]), '*', parseFloat(storedValues[arrayPos + 1]));
    
            storedValues.splice(arrayPos - 1, 3, `${newArrayValue}`);
        } else if (storedValues.findIndex(element => element == '/') != -1) {
            let arrayPos = storedValues.findIndex(element => element == '/');        
            newArrayValue = operate(parseFloat(storedValues[arrayPos - 1]), '/', parseFloat(storedValues[arrayPos + 1]));
    
            storedValues.splice(arrayPos - 1, 3, `${newArrayValue}`);
        } else if (storedValues.findIndex(element => element == '+') != -1) {
            let arrayPos = storedValues.findIndex(element => element == '+');        
            newArrayValue = operate(parseFloat(storedValues[arrayPos - 1]), '+', parseFloat(storedValues[arrayPos + 1]));
    
            storedValues.splice(arrayPos - 1, 3, `${newArrayValue}`);
        } else if (storedValues.findIndex(element => element == '-') != -1) {
            let arrayPos = storedValues.findIndex(element => element == '-');        
            newArrayValue = operate(parseFloat(storedValues[arrayPos - 1]), '-', parseFloat(storedValues[arrayPos + 1]));
    
            storedValues.splice(arrayPos - 1, 3, `${newArrayValue}`);
        }
    }
}

// Calculator Display
function display(value) {
    const display = document.querySelector('#display');
    const total = document.querySelector('#total');
    
    total.textContent = value;

    display.appendChild(total);
}

// Function to clear all values
function clear() {
    displayValue = '';
    storeCurrent = '';
    storedValues = [];
    display('');
}

// Main eventlisteners
const numBtns = document.querySelectorAll('.numBtns');
const decimalBtn = document.querySelector('#decimalBtn');
const operatorBtns = document.querySelectorAll('.operatorBtns');
const equalBtn = document.querySelector('#equalBtn');
const clearBtn = document.querySelector('#clearBtn');
const percentBtn = document.querySelector('#percentBtn');
const plusNegativeBtn = document.querySelector('#plusNegativeBtn');
let decimalClicked = false;

numBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        displayValue += btn.value;
        storeCurrent += btn.value;
        display(displayValue);
    })
})

decimalBtn.addEventListener('click', () => {
    
})

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        storedValues.push(storeCurrent);
        storedValues.push(btn.value);
        storeCurrent = '';
        displayValue += btn.value;
        display(displayValue);
    })
})

plusNegativeBtn.addEventListener('click', () => {
    let tempHold = storeCurrent;
    let newDisplayValue;

    tempHold = plusNegative(tempHold);
    newDisplayValue = displayValue.replace(storeCurrent, tempHold);     // Works, but not perfect
    storeCurrent = tempHold;
    displayValue = newDisplayValue;
    display(displayValue);
})

percentBtn.addEventListener('click', () => {
    let tempHold = storeCurrent;
    let newDisplayValue;

    tempHold = percentage(tempHold);
    newDisplayValue = displayValue.replace(storeCurrent, tempHold);     // Works, but not perfect
    storeCurrent = tempHold;
    displayValue = newDisplayValue;
    display(displayValue);
})

equalBtn.addEventListener('click', () => {
    if (storeCurrent != '') {
        storedValues.push(storeCurrent);
        storeCurrent = '';

        if (storedValues.length  % 2 == 1) {
            calculate();
            display(storedValues);
            displayValue = storedValues[0];
            storeCurrent = storedValues[0];
            storedValues = [];
        }
    }
})

clearBtn.addEventListener('click', () => {
    clear();
})