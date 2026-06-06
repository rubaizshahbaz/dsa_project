/* =========================================================
   STACK VISUALIZER  (LIFO - Last In, First Out)
   We only add / remove from the TOP of the stack.
   The stack is stored as an array; the last item is the top.
   ========================================================= */

let stack = [];

function getValue() {
  const input = document.getElementById("valueInput");
  const value = parseInt(input.value);
  if (isNaN(value)) {
    showMessage("Please type a number first.");
    return null;
  }
  input.value = "";
  return value;
}

function showMessage(text) {
  document.getElementById("message").textContent = text;
}

// PUSH: add a new value on top of the stack.
function push() {
  const value = getValue();
  if (value === null) return;
  stack.push(value);
  draw(true);                 // animate the newest (top) item
  showMessage("Pushed " + value + " onto the stack.");
}

// POP: remove and return the top value.
function pop() {
  if (stack.length === 0) {
    showMessage("Stack is empty, nothing to pop.");
    return;
  }
  const removed = stack.pop();
  draw();
  showMessage("Popped " + removed + " from the top.");
}

// PEEK: look at the top value without removing it.
function peek() {
  if (stack.length === 0) {
    showMessage("Stack is empty, nothing to peek.");
    return;
  }
  draw();
  // Highlight the top node briefly.
  const nodes = document.querySelectorAll("#stackArea .node");
  const top = nodes[nodes.length - 1];
  if (top) {
    top.classList.add("highlight");
    setTimeout(() => top.classList.remove("highlight"), 800);
  }
  showMessage("Top of the stack is " + stack[stack.length - 1] + ".");
}

function clearStack() {
  stack = [];
  draw();
  showMessage("Stack cleared.");
}

// Redraw the stack. animateTop = play pop animation on the top node.
function draw(animateTop = false) {
  const area = document.getElementById("stackArea");
  area.innerHTML = "";

  if (stack.length === 0) {
    area.innerHTML = "<i style='color:#9ca3af'>empty</i>";
    return;
  }

  stack.forEach((value, i) => {
    const node = document.createElement("div");
    const isTop = i === stack.length - 1;
    node.className = "node" + (isTop && animateTop ? " new" : "");
    node.textContent = value + (isTop ? "  ← top" : "");
    area.appendChild(node);
  });
}

draw();
