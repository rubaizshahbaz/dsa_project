

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


function push() {
  const value = getValue();
  if (value === null) return;
  stack.push(value);
  draw(true);                 
  showMessage("Pushed " + value + " onto the stack.");
}


function pop() {
  if (stack.length === 0) {
    showMessage("Stack is empty, nothing to pop.");
    return;
  }
  const removed = stack.pop();
  draw();
  showMessage("Popped " + removed + " from the top.");
}


function peek() {
  if (stack.length === 0) {
    showMessage("Stack is empty, nothing to peek.");
    return;
  }
  draw();
  
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
