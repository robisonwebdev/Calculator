let displayValue = '';
let storedValues = [];
let lastBtnClicked;

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
    storedValues = [];
    display('');
}

// Main eventlisteners
const numBtns = document.querySelectorAll('.numBtns');
const operatorBtns = document.querySelectorAll('.operatorBtns');
const equalBtn = document.querySelector('#equalBtn');
const clearBtn = document.querySelector('#clearBtn');
let decimalClicked = false;

numBtns.forEach((btn) => {
    btn.addEventListener('click', () => {     
        if (btn.value == '.' && decimalClicked == true) {
            // Do Nothing
        } else if (btn.value == '.' && decimalClicked == false) {
            displayValue += btn.value;
            lastBtnClicked = btn.value;
            decimalClicked = true;
            display(displayValue);
        } else {
            displayValue += btn.value;
            lastBtnClicked = btn.value;
            display(displayValue);
        }

    })
})

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        storedValues.push(displayValue);
        displayValue += ` ${btn.value} `;
        lastBtnClicked = btn.value;
        decimalClicked = false;
        display(displayValue);
    })
})

equalBtn.addEventListener('click', () => {
    if (lastBtnClicked == '/' || lastBtnClicked == '*' || lastBtnClicked == '+' || lastBtnClicked == '-') {
        // Do Nothing
    } else {
        storedValues = displayValue.split(' ');
        calculate();
        display(storedValues);
        displayValue = storedValues[0];
    }
})

clearBtn.addEventListener('click', () => {
    clear();
})