let keys = document.querySelectorAll(".inner-button");
let operators = ["÷", "x", "-", "+"];
let decimalAdded = false;
let memory = [];
let finish;

for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = function (event) {
        let display = document.querySelector("#inner-text");
        let phrase = display.innerText;
        let btnValue = this.innerText;
        let equation = phrase;
        if (finish == true) {
            display.innerText = "";
        }
        finish = false;
        if (btnValue == "C") {
            display.innerText = "";
            decimalAdded = false;
        } else if (btnValue == "=") {
            let lastChar = equation[equation.length - 1];

            equation = equation.replace(/x/g, "*").replace(/÷/g, "/");

            if (operators.indexOf(lastChar) > -1 || lastChar == ".")
                equation = equation.replace(/.$/, "");

            if (equation) display.innerText = eval(equation);

            decimalAdded = false;
            return (finish = true);
        } else if (operators.indexOf(btnValue) > -1) {
            let lastChar = phrase[phrase.length - 1];

            if (phrase != "" && operators.indexOf(lastChar) == -1)
                display.innerText += btnValue;
            else if (phrase == "" && btnValue == "+")
                display.innerText += btnValue;

            if (operators.indexOf(lastChar) > -1 && phrase.length > 1) {
                display.innerText = phrase.replace(/.$/, btnValue);
            }
            decimalAdded = false;
        } else if (btnValue == ".") {
            if (!decimalAdded) {
                display.innerText = `0${display.innerText + btnValue}`;
                decimalAdded = true;
            }
        } else if (btnValue == "M+") {
            memory.push(equation);
        } else if (btnValue == "M-") {
            memory.pop();
        } else if (btnValue == "MS") {
            let lastElement = memory[memory.length - 1];
            display.innerText = lastElement;
        } else {
            display.innerText += btnValue;
        }
        event.preventDefault();
    };
}
