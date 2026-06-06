/* =========================================================
   LINKED LIST VISUALIZER
   A node has a value and a "next" pointer to the next node.
   We keep a simple array of values to represent the list and
   redraw it after every operation.
   ========================================================= */

// The list is stored as a plain array (front = head).
let list = [];

// Helper: get the number typed in the value box.
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

// Show a message to the user.
function showMessage(text) {
  document.getElementById("message").textContent = text;
}

// Insert a new node at the head (front) of the list.
function insertHead() {
  const value = getValue();
  if (value === null) return;
  list.unshift(value);          // add to the front
  draw(0);                      // highlight the new node at index 0
  showMessage("Inserted " + value + " at the head.");
}

// Insert a new node at the tail (end) of the list.
function insertTail() {
  const value = getValue();
  if (value === null) return;
  list.push(value);             // add to the end
  draw(list.length - 1);
  showMessage("Inserted " + value + " at the tail.");
}

// Insert at a specific position (0 = head).
function insertAt() {
  const value = getValue();
  if (value === null) return;
  let pos = parseInt(document.getElementById("posInput").value);
  if (isNaN(pos) || pos < 0) pos = 0;
  if (pos > list.length) pos = list.length;   // clamp to the end
  list.splice(pos, 0, value);
  document.getElementById("posInput").value = "";
  draw(pos);
  showMessage("Inserted " + value + " at position " + pos + ".");
}

// Delete the first node that matches the typed value.
function deleteValue() {
  const value = getValue();
  if (value === null) return;
  const index = list.indexOf(value);
  if (index === -1) {
    showMessage("Value " + value + " was not found, nothing deleted.");
    return;
  }
  list.splice(index, 1);
  draw();
  showMessage("Deleted " + value + " from the list.");
}

// Search for a value, highlighting each node as we check it.
function searchValue() {
  const value = getValue();
  if (value === null) return;
  draw();                       // start from a clean drawing
  let step = 0;

  // Visit one node every 600ms so the user can follow along.
  const timer = setInterval(() => {
    // Remove previous highlight.
    const nodes = document.querySelectorAll("#listArea .node");
    if (step > 0 && nodes[step - 1]) nodes[step - 1].classList.remove("highlight");

    if (step >= list.length) {
      clearInterval(timer);
      showMessage("Value " + value + " was not found.");
      return;
    }

    nodes[step].classList.add("highlight");

    if (list[step] === value) {
      nodes[step].classList.remove("highlight");
      nodes[step].classList.add("found");
      clearInterval(timer);
      showMessage("Found " + value + " at position " + step + ".");
      return;
    }
    step++;
  }, 600);
}

// Empty the whole list.
function clearList() {
  list = [];
  draw();
  showMessage("List cleared.");
}

// Redraw the entire list on screen.
// newIndex (optional) = index of a node to play the "pop" animation on.
function draw(newIndex = -1) {
  const area = document.getElementById("listArea");
  area.innerHTML = "";

  if (list.length === 0) {
    area.innerHTML = "<i style='color:#9ca3af'>List is empty (head → null)</i>";
    return;
  }

  list.forEach((value, i) => {
    const node = document.createElement("div");
    node.className = "node" + (i === newIndex ? " new" : "");
    node.textContent = value;
    area.appendChild(node);

    // Add an arrow after every node except the last one.
    if (i < list.length - 1) {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "→";
      area.appendChild(arrow);
    }
  });

  // Show "null" at the end to make the structure clear.
  const nullSpan = document.createElement("span");
  nullSpan.className = "arrow";
  nullSpan.textContent = "→ null";
  area.appendChild(nullSpan);
}

// Draw the empty list when the page loads.
draw();
