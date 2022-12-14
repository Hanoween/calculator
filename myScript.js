let buttons = document.querySelectorAll("button");
let screen = document.querySelector("#content");
let equation = [];
let reset = false;
let ans = "";
let getNext = false;
let next = null;
const OPERATIONS = ["+", "−", "×", "÷", "xⁿ"];

buttons.forEach(element => {
    element.addEventListener("click", () => {
        if (screen.innerHTML.length > 16) 
        screen.innerHTML = screen.innerHTML.slice(screen.innerHTML.length - 16);
        if (getNext) next = element.innerHTML;
        if (element.className == "special") return;
        switch (element.innerHTML) {
            case ("="):
                reset = true;
                getNext = true;
                screen.innerHTML = evaluate(equation);
                ans = evaluate(equation);
                break;

            case ("AC"):
                resetScreen();
                break;

            case ("DEL"):
                if (getNext) return;
                screen.innerHTML = screen.innerHTML.slice(0, screen.innerHTML.length - 1)
                equation.pop();
                break;

            default:
                if (reset) {
                    resetScreen();
                    reset = false;
                }
                //operator after equal sign
                if (OPERATIONS.includes(next)) {
                    screen.innerHTML += "ANS";
                    equation.push(ans);
                }
                if (element.innerHTML == "xⁿ") {
                    screen.innerHTML += "^";
                    equation.push(element.innerHTML);
                }

                else if (element.innerHTML == "ANS") {
                    screen.innerHTML += "ANS";
                    equation.push(String(ans));
                }

                else if (element.innerHTML == "+/−") {
                    screen.innerHTML += "-";
                    equation.push("#");
                    break;
                }
                else {
                    screen.innerHTML += element.innerHTML;
                    equation.push(element.innerHTML);
                }
                getNext = false;
                next = null;
                break;
        }

    })
});

function resetScreen() {
    screen.innerHTML = "";
    equation = [];
}

function evaluate(equation = "") {
    console.log(equation);
    eq = reduce(equation);
    console.log(equation);
    //try {
    let div = null;
    for (let i = 0; i < equation.length; i++) {
        if (OPERATIONS.includes(equation[i])) {
            let op = equation[i];
            let d1 = equation[i - 1];
            let d2 = equation[i + 1];
            let div1 = divideBy(d1);
            let div2 = divideBy(d2);
            div1 > div2 ? div = div1 : div = div2;

            //undefined number
            if (d1 === undefined || d2 === undefined) return "ERROR";
            //number is an operation
            else if (OPERATIONS.includes(d1) || OPERATIONS.includes(d2)) return "ERROR"
            //evaluate
            switch (op) {
                case "+":
                    equation[i - 1] = (d1 * div + d2 * div) / div;
                    break;
                case "−":
                    equation[i - 1] = (d1 * div - d2 * div) / div;
                    break;
                case "×":
                    equation[i - 1] = (d1 * div * d2 * div) / (div * div);
                    break;
                case "÷":
                    equation[i - 1] = d1 / d2;
                    break;
                case "xⁿ":
                    equation[i - 1] = Math.pow(d1, d2);
                    break;

            }
            equation.splice(i, 2);
            i--;
        }
    }
    //}
    //catch { return "ERROR"; }
    if (isNaN(equation[0])) {
        return "ERROR";
    }
    else if (equation[0] > 9999999999999999) {
        return "NUMBER TOO BIG";
    }
    else if (equation[0].toString().length > 16) {
        return equation[0] = equation[0].toString().slice(0, 16);
    }
    else return equation[0];
}

function reduce(equation = "") {
    try {
        for (let i = 0; i < equation.length; i++) {
            if (equation[i].includes("#") || !isNaN(equation[i])) {
                if (!isNaN(equation[i + 1]) || equation[i + 1] == ".") {
                    equation[i] += equation[i + 1];
                    equation.splice(i + 1, 1);
                    i--;
                }
                else {
                    if (typeof equation[i] == 'string') {
                        equation[i] = parseFloat(equation[i].replace(/#/g, "-"));
                    }
                }
            }
        }
    }
    catch {
        return;
    }
}

function divideBy(div) {
    try {
        if (div.toString().includes(".")) {
            return Math.pow(10, div.toString().length - div.toString().indexOf(".") - 1);
        }
        else return 1;
    }
    catch { return 1; }
}

function hoverButton() {
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("mouseover", () => {
            button.style.filter = "brightness(80%)";
        });
        button.addEventListener("mouseout", () => {
            button.style.filter = null;
        });
    });

}

function playAudio() {
    let audio = document.querySelector("audio");
    document.body.addEventListener("mousemove", () => {
        audio.play();
    })
}


hoverButton();
playAudio();