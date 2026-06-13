

let queue = [];

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


function enqueue() {
  const value = getValue();
  if (value === null) return;
  queue.push(value);
  draw(queue.length - 1);     
  showMessage("Enqueued " + value + " at the rear.");
}


function dequeue() {
  if (queue.length === 0) {
    showMessage("Queue is empty, nothing to dequeue.");
    return;
  }
  const removed = queue.shift();    
  draw();
  showMessage("Dequeued " + removed + " from the front.");
}


function peek() {
  if (queue.length === 0) {
    showMessage("Queue is empty, nothing to peek.");
    return;
  }
  draw();
  const front = document.querySelector("#queueArea .node");
  if (front) {
    front.classList.add("highlight");
    setTimeout(() => front.classList.remove("highlight"), 800);
  }
  showMessage("Front of the queue is " + queue[0] + ".");
}

function clearQueue() {
  queue = [];
  draw();
  showMessage("Queue cleared.");
}


function draw(newIndex = -1) {
  const area = document.getElementById("queueArea");
  area.innerHTML = "";

  if (queue.length === 0) {
    area.innerHTML = "<i style='color:#9ca3af'>Queue is empty</i>";
    return;
  }

  queue.forEach((value, i) => {
    const wrapper = document.createElement("div");
    wrapper.style.textAlign = "center";

    const node = document.createElement("div");
    node.className = "node" + (i === newIndex ? " new" : "");
    node.textContent = value;
    wrapper.appendChild(node);

    
    const label = document.createElement("div");
    label.style.fontSize = "12px";
    label.style.color = "#6b7280";
    label.style.marginTop = "4px";
    if (i === 0) label.textContent = "front";
    else if (i === queue.length - 1) label.textContent = "rear";
    else label.textContent = " ";  
    wrapper.appendChild(label);

    area.appendChild(wrapper);
  });
}

draw();
