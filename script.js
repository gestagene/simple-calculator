let current = "";
let previous = "";
let operation = null;

const prevEl = document.querySelector("[data-previous-operand]");
const currEl = document.querySelector("[data-current-operand]");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");

function updateDisplay() {
  currEl.innerText = formatNumber(current);
  prevEl.innerText = operation ? `${formatNumber(previous)} ${operation}` : "";
}

function appendNumber(num) {
  if (num === "." && current.includes(".")) return;
  current += num;
  updateDisplay();
}

function chooseOperation(op) {
  if (!current) return;
  if (previous) compute();
  operation = op;
  previous = current;
  current = "";
  updateDisplay();
}

function compute() {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operation) {
    case "+":
      current = prev + curr;
      break;
    case "-":
      current = prev - curr;
      break;
    case "*":
      current = prev * curr;
      break;
    case "÷":
      current = prev / curr;
      break;
    default:
      return;
  }

  operation = null;
  previous = "";
  updateDisplay();
}

function clearAll() {
  current = "";
  previous = "";
  operation = null;
  updateDisplay();
}

function deleteLast() {
  current = current.slice(0, -1);
  updateDisplay();
}

function formatNumber(num) {
  const [intPart, decPart] = num.toString().split(".");
  const intDisplay = isNaN(parseFloat(intPart))
    ? ""
    : parseFloat(intPart).toLocaleString("en", { maximumFractionDigits: 0 });
  return decPart != null ? `${intDisplay}.${decPart}` : intDisplay;
}

numberButtons.forEach((btn) =>
  btn.addEventListener("click", () => appendNumber(btn.innerText))
);
operationButtons.forEach((btn) =>
  btn.addEventListener("click", () => chooseOperation(btn.innerText))
);
equalsButton.addEventListener("click", compute);
allClearButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", deleteLast);

updateDisplay();
