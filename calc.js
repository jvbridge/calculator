// get a list of all the number buttons
const numberButtons = document.querySelectorAll("[data-number]");
// get a list of all the operators
const operationButtons = document.querySelectorAll("[data-operation]");
// special buttons
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
// previous value
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
// current value
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// getting references for memory buttons
const memoryPlus = document.querySelector("[data-memory-plus]");
const memoryRecall = document.querySelector("[data-memory-recall]");
const memoryClear = document.querySelector("[data-memory-clear]");
const memoryMinus = document.querySelector("[data-memory-minus]");

// make listeners for all the number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
  });
});

// make listeners for the operators
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// listener for the equals button
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

// listener for the "Del" button
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// listener for the "AC" button
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

// Memory button listeners
memoryPlus.addEventListener("click", () => {
  calculator.addMemory();
});

memoryRecall.addEventListener("click", () => {
  calculator.recallMemory();
});

memoryClear.addEventListener("click", () => {
  calculator.clearMemory();
});

memoryMinus.addEventListener("click", () => {
  calculator.subMemory();
});

// set up event listener for key presses lets us use the numpad and regular keys
document.addEventListener("keydown", (event) => {
  // test if it's a number, uses a regular expression
  let numberPattern = /[0-9]/g;
  // same thing for operators
  let opPattern = /[+\-*\/]/g;

  // check if we have have a number or decimal
  if (event.key.match(numberPattern) || event.key === ".") {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
    return;
  }

  // check if we have an operator
  if (event.key.match(opPattern)) {
    event.preventDefault();
    calculator.chooseOperation(event.key);
    calculator.updateDisplay();
    return;
  }

  // check if we are asking for enter
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
    return;
  }

  // backspace just deletes one character
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
    return;
  }

  // delete clears the whole thing
  if (event.key == "Delete") {
    calculator.clear();
    calculator.updateDisplay();
  }
});

class Calculator {
  /**
   * Sets up references for the display elements
   */
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.currOpElement = currentOperandTextElement;
    this.prevOpElement = previousOperandTextElement;
    this.clear();
  }

  /**
   * Variable for memory
   */
  Memory = 0.0;

  // memory operations
  /**
   * clears the memory function of the calculator
   */
  clearMemory() {
    this.Memory = 0.0;
  }

  /**
   * Adds the current value to the memory variable
   */
  addMemory() {
    let tmp = this.Memory;
    this.Memory = tmp + parseFloat(this.currOp);
  }

  /**
   * subtracts current value from the memory
   */
  subMemory() {
    let tmp = this.Memory;
    this.Memory = tmp - this.getDisplayNumber(this.currOp);
  }

  recallMemory() {
    this.currOp = this.Memory.toString();
    this.updateDisplay();
  }

  /**
   * Sets the inner values to empty, will cause display to be empty
   */
  clear() {
    this.currOp = "";
    this.prevOp = "";
    this.operation = undefined;
    this.clearMemory();
  }

  /**
   * Removes the las character of the current operation string
   */
  delete() {
    this.currOp = this.currOp.toString().slice(0, -1);
  }

  /**
   * Appends current number pressed to display string
   * @param {String} num number to append
   * @returns void
   */
  appendNumber(num) {
    if (num === "." && this.currOp.includes(".")) return;
    this.currOp = this.currOp.toString() + num.toString();
    calculator.updateDisplay();
  }

  /**
   * Executes when you click +, -, / and * will set the current p[eratopm]
   * @param {String} operand The operation to execute
   * @returns void
   */
  chooseOperation(operand) {
    if (this.currOp === "") return;
    if (this.prevOp !== "") this.compute();
    this.operation = operand;
    this.prevOp = this.currOp;
    this.currOp = "";
  }
  /**
   * Evaluates the current variables in the calculator
   * @returns Float
   */
  compute() {
    let ret; // returning value
    // get strings of values, make them floats, do the operations
    const prev = parseFloat(this.prevOp);
    const curr = parseFloat(this.currOp);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        ret = prev + curr;
        break;
      case "-":
        ret = prev - curr;
        break;
      case "*":
        ret = prev * curr;
        break;
      case "/":
        ret = prev / curr;
        break;
      default:
        console.log("error: hit end of compute switch");
        return;
    }
    // set the current value equal to the computed value, and clear the rest
    this.currOp = ret;
    this.operation = undefined;
    this.prevOp = "";
  }

  /**
   * Updates the display to reflect the current state of the calc object
   * variables
   */
  updateDisplay() {
    this.currOpElement.innerText = this.getDisplayNumber(this.currOp);
    if (this.operation != null) {
      this.prevOpElement.innerText = `${this.getDisplayNumber(this.prevOp)} ${
        this.operation
      }`;
    } else {
      this.prevOpElement.innerText = "";
    }
  }
  /**
   * Helper function for updating the display
   * @param {Float} Number to display
   * @returns a string to display, properly formatted
   */
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
}

// enough has been defined to set up the calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
