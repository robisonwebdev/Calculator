let displayValue = '';
let storedValues;

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
        return `Can't divide by 0`;
    } else {
        return num1 / num2;
    }
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
            newArrayValue = operate(parseInt(storedValues[arrayPos - 1]), '*', parseInt(storedValues[arrayPos + 1]));
    
            storedValues.splice(arrayPos - 1, 3, `${newArrayValue}`);
        } else if (storedValues.findIndex(element => element == '/') != -1) {
            let arrayPos = storedValues.findIndex(element => element == '/');        
            newArrayValue = operate(parseInt(storedValues[arrayPos - 1]), '/', parseInt(storedValues[arrayPos + 1]));
    
            storedValues.splice(arrayPos - 1, 3, `${newArrayValue}`);
        } else if (storedValues.findIndex(element => element == '+') != -1) {
            let arrayPos = storedValues.findIndex(element => element == '+');        
            newArrayValue = operate(parseInt(storedValues[arrayPos - 1]), '+', parseInt(storedValues[arrayPos + 1]));
    
            storedValues.splice(arrayPos - 1, 3, `${newArrayValue}`);
        } else if (storedValues.findIndex(element => element == '-') != -1) {
            let arrayPos = storedValues.findIndex(element => element == '-');        
            newArrayValue = operate(parseInt(storedValues[arrayPos - 1]), '-', parseInt(storedValues[arrayPos + 1]));
    
            storedValues.splice(arrayPos - 1, 3, `${newArrayValue}`);
        }
    }

    display(storedValues[0]);
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
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.value >= 0 && button.value <= 9) {
            displayValue += button.value;
            display(displayValue);
        } else if (button.value == '/' || button.value == '*' || button.value == '+' || button.value == '-') {
            displayValue += ` ${button.value} `;
            display(displayValue);
        } else if (button.value == '=') {
            storedValues = displayValue.split(' ');
            calculate();
            display(storedValues);
            displayValue = storedValues[0];
        } else if (button.value == 'clear') {
            clear();
        }
    })
})