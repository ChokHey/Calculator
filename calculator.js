let runningTotal = 0;
let buffer = "0";
let preOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        // this is a number
        symbolHandler(value);
    } else {
        // not a number
        numberHandler(value);
    }
    screen.innerText = buffer;

}

function symbolHandler(symbol){
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            break;
        case '←':
            buffer = buffer.substr(0, buffer.length - 1);
            if (buffer === ""){
                buffer = '0';
            }
            break;
        case '=':
            if (preOperator == null) {
                return;
            }
            flushOperation(parseInt(buffer));
            preOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '+' :
        case "-" :
        case "×" :
        case "÷" :
            mathHandler(symbol);
            break;
    }
    //buffer = "0";
    //screen.innerText = buffer;
    

}

function mathHandler(symbol) {
    if (buffer === '0') {
        // do nothing
        return;
    }
    const intBuff = parseInt(buffer);
    if (runningTotal == 0) {
        runningTotal = intBuff;
    } else {
        flushOperation(intBuff);
    }

    preOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuff) {
    if (preOperator === "+") {
        runningTotal = runningTotal + intBuff;
    } else if (preOperator === "-") {
        runningTotal = runningTotal - intBuff;
    } else if (preOperator === "×") {
        runningTotal = runningTotal * intBuff;
    } else if (preOperator === "÷") {
        runningTotal = runningTotal / intBuff;
    }

}

function numberHandler(numStr){
    if (buffer === "0") {
        buffer = numStr;
    } else {
        buffer = buffer + numStr;
    }
    //console.log("buffer", buffer);
    //screen.innerText = buffer;

}
    

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function (event) {
            buttonClick(event.target.innerText);
        })

}



init();