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
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

//
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
   * Sets the inner values to empty, will cause display to be empty
   */
  clear() {
    this.currOp = "";
    this.prevOp = "";
    this.operation = undefined;
  }

  /**
   * Removes current value from display buffer
   */
  delete() {}

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
   */
  compute() {}

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
  getDisplayNumber(number) {
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return "";
    return floatNumber.toLocaleString("en");
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
