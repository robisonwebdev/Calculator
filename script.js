let displayValue = '';
let storedValues;

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

function display(value) {
    const display = document.querySelector('#display');
    const total = document.querySelector('#total');
    
    total.textContent = displayValue;

    display.appendChild(total);
}

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
            console.log(storedValues);
        }
    })
})