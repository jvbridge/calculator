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
    calculator.updateDisplay();
  });
});

/**
 * Main Class for the calculator
 */
class Calculator {
  // sets up the elements we need to update and remember
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.currOpElement = currentOperandTextElement;
    this.prevOpElement = previousOperandTextElement;
    this.clear();
  }

  clear() {
    this.currOp = "";
    this.prevOp = "";
    this.operation = undefined;
  }

  delete() {}
  appendNumber(num) {}
  choose(operation) {}
  eval() {}
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
