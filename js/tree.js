/* =========================================================
   BINARY SEARCH TREE (BST) VISUALIZER
   Rule: values smaller than a node go LEFT, larger go RIGHT.
   Each node is an object: { value, left, right }.
   ========================================================= */

const SVG_NS = "http://www.w3.org/2000/svg";
let root = null;            // the top node of the tree (null = empty)

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

/* ---------- INSERT ---------- */
function insertNode() {
  const value = getValue();
  if (value === null) return;
  root = insertHelper(root, value);
  draw();
  showMessage("Inserted " + value + " into the tree.");
}

// Recursively find the correct spot and add the new node.
function insertHelper(node, value) {
  if (node === null) {
    return { value: value, left: null, right: null };
  }
  if (value < node.value) {
    node.left = insertHelper(node.left, value);
  } else if (value > node.value) {
    node.right = insertHelper(node.right, value);
  }
  // If value already exists we ignore it (no duplicates).
  return node;
}

/* ---------- DELETE ---------- */
function deleteNode() {
  const value = getValue();
  if (value === null) return;
  if (!contains(root, value)) {
    showMessage("Value " + value + " is not in the tree.");
    return;
  }
  root = deleteHelper(root, value);
  draw();
  showMessage("Deleted " + value + " from the tree.");
}

function deleteHelper(node, value) {
  if (node === null) return null;

  if (value < node.value) {
    node.left = deleteHelper(node.left, value);
  } else if (value > node.value) {
    node.right = deleteHelper(node.right, value);
  } else {
    // Found the node to delete. Three cases:
    if (node.left === null) return node.right;   // only right child / none
    if (node.right === null) return node.left;   // only left child

    // Two children: replace value with the smallest value on the right side.
    let successor = node.right;
    while (successor.left !== null) successor = successor.left;
    node.value = successor.value;
    node.right = deleteHelper(node.right, successor.value);
  }
  return node;
}

// Does the tree contain a value?
function contains(node, value) {
  if (node === null) return false;
  if (value === node.value) return true;
  return value < node.value
    ? contains(node.left, value)
    : contains(node.right, value);
}

/* ---------- SEARCH (animated) ---------- */
function searchNode() {
  const value = getValue();
  if (value === null) return;

  // Build the path of nodes we visit from the root downwards.
  const path = [];
  let current = root;
  while (current !== null) {
    path.push(current.value);
    if (value === current.value) break;
    current = value < current.value ? current.left : current.right;
  }

  draw();
  let step = 0;
  const timer = setInterval(() => {
    if (step > 0) highlightNode(path[step - 1], "");      // un-highlight previous

    if (step >= path.length) {
      clearInterval(timer);
      showMessage("Value " + value + " was not found.");
      return;
    }

    const isMatch = path[step] === value;
    highlightNode(path[step], isMatch ? "found" : "highlight");

    if (isMatch) {
      clearInterval(timer);
      showMessage("Found " + value + " in the tree!");
    }
    step++;
  }, 700);
}

/* ---------- INORDER TRAVERSAL (left, root, right => sorted) ---------- */
function inorder() {
  const order = [];
  collectInorder(root, order);
  if (order.length === 0) {
    showMessage("Tree is empty.");
    return;
  }
  draw();
  let step = 0;
  const timer = setInterval(() => {
    if (step > 0) highlightNode(order[step - 1], "");
    if (step >= order.length) {
      clearInterval(timer);
      showMessage("Inorder (sorted) traversal: " + order.join(", "));
      return;
    }
    highlightNode(order[step], "highlight");
    step++;
  }, 600);
  showMessage("Visiting nodes in sorted order...");
}

function collectInorder(node, order) {
  if (node === null) return;
  collectInorder(node.left, order);
  order.push(node.value);
  collectInorder(node.right, order);
}

function clearTree() {
  root = null;
  draw();
  showMessage("Tree cleared.");
}

/* =========================================================
   DRAWING
   We give every node an (x, y) position:
   - x comes from its order in an inorder walk (keeps left<right).
   - y comes from its depth (level) in the tree.
   ========================================================= */
function draw() {
  const svg = document.getElementById("treeCanvas");
  svg.innerHTML = "";
  if (root === null) {
    addText(svg, "50%", "50%", "Tree is empty", "#9ca3af");
    return;
  }

  // Step 1: walk the tree inorder to give each node an x-slot.
  const positioned = [];
  let counter = { i: 0 };
  assignPositions(root, 0, counter, positioned);

  const width = svg.clientWidth || 900;
  const gapX = width / (positioned.length + 1);
  const gapY = 80;

  // Convert slot/depth into real pixel coordinates.
  positioned.forEach((p) => {
    p.x = gapX * (p.slot + 1);
    p.y = 40 + p.depth * gapY;
  });

  // Step 2: draw edges first (so they sit behind the circles).
  positioned.forEach((p) => {
    if (p.node.left) drawEdge(svg, p, find(positioned, p.node.left));
    if (p.node.right) drawEdge(svg, p, find(positioned, p.node.right));
  });

  // Step 3: draw the circle + value for each node.
  positioned.forEach((p) => {
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("cx", p.x);
    circle.setAttribute("cy", p.y);
    circle.setAttribute("r", 20);
    circle.setAttribute("class", "svg-node-circle");
    circle.dataset.value = p.node.value;
    svg.appendChild(circle);

    addText(svg, p.x, p.y + 5, p.node.value, null, p.node.value);
  });
}

// Recursively assign an inorder slot + depth to every node.
function assignPositions(node, depth, counter, list) {
  if (node === null) return;
  assignPositions(node.left, depth + 1, counter, list);
  list.push({ node: node, slot: counter.i++, depth: depth, x: 0, y: 0 });
  assignPositions(node.right, depth + 1, counter, list);
}

function find(list, node) {
  return list.find((p) => p.node === node);
}

function drawEdge(svg, from, to) {
  const line = document.createElementNS(SVG_NS, "line");
  line.setAttribute("x1", from.x);
  line.setAttribute("y1", from.y);
  line.setAttribute("x2", to.x);
  line.setAttribute("y2", to.y);
  line.setAttribute("class", "svg-edge");
  svg.appendChild(line);
}

function addText(svg, x, y, text, color, dataValue) {
  const t = document.createElementNS(SVG_NS, "text");
  t.setAttribute("x", x);
  t.setAttribute("y", y);
  t.setAttribute("text-anchor", "middle");
  t.setAttribute("class", "svg-node-text");
  if (color) t.setAttribute("fill", color);
  if (dataValue !== undefined) t.dataset.value = dataValue;
  t.textContent = text;
  svg.appendChild(t);
}

// Change the colour class of a node circle by its value.
function highlightNode(value, cls) {
  const circle = document.querySelector(
    '#treeCanvas circle[data-value="' + value + '"]'
  );
  if (circle) circle.setAttribute("class", "svg-node-circle " + cls);
}

draw();
