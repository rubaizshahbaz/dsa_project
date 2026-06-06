/* =========================================================
   GRAPH VISUALIZER
   Nodes are numbered 0, 1, 2, ...
   Edges are stored as an "adjacency list": for each node we
   keep a list of the nodes it connects to (undirected graph).
   ========================================================= */

const SVG_NS = "http://www.w3.org/2000/svg";

let nodeCount = 0;          // how many nodes exist
let adj = {};               // adjacency list: adj[node] = [neighbours]

function showMessage(text) {
  document.getElementById("message").textContent = text;
}

// Add a new node with the next number.
function addNode() {
  adj[nodeCount] = [];
  nodeCount++;
  draw();
  showMessage("Added node " + (nodeCount - 1) + ".");
}

// Connect two existing nodes with an edge (both directions).
function addEdge() {
  const from = parseInt(document.getElementById("fromInput").value);
  const to = parseInt(document.getElementById("toInput").value);

  if (isNaN(from) || isNaN(to)) {
    showMessage("Type both 'from' and 'to' node numbers.");
    return;
  }
  if (!(from in adj) || !(to in adj)) {
    showMessage("Those node numbers do not exist yet.");
    return;
  }
  if (from === to) {
    showMessage("Cannot connect a node to itself here.");
    return;
  }
  // Avoid duplicate edges.
  if (!adj[from].includes(to)) {
    adj[from].push(to);
    adj[to].push(from);
  }
  document.getElementById("fromInput").value = "";
  document.getElementById("toInput").value = "";
  draw();
  showMessage("Connected node " + from + " and node " + to + ".");
}

// Read the start node, defaulting to 0.
function getStart() {
  let start = parseInt(document.getElementById("startInput").value);
  if (isNaN(start)) start = 0;
  if (!(start in adj)) {
    showMessage("Start node " + start + " does not exist.");
    return null;
  }
  return start;
}

/* ---------- BFS: explore level by level using a QUEUE ---------- */
function runBFS() {
  const start = getStart();
  if (start === null) return;

  const visited = new Set();
  const order = [];
  const queue = [start];
  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();         // take from the front
    order.push(node);
    // Visit neighbours in numeric order.
    adj[node].slice().sort((a, b) => a - b).forEach((next) => {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    });
  }
  animateOrder(order, "BFS");
}

/* ---------- DFS: go as deep as possible using a STACK ---------- */
function runDFS() {
  const start = getStart();
  if (start === null) return;

  const visited = new Set();
  const order = [];

  // Recursive helper.
  function visit(node) {
    visited.add(node);
    order.push(node);
    adj[node].slice().sort((a, b) => a - b).forEach((next) => {
      if (!visited.has(next)) visit(next);
    });
  }
  visit(start);
  animateOrder(order, "DFS");
}

// Highlight each visited node one at a time.
function animateOrder(order, name) {
  draw();
  let step = 0;
  const timer = setInterval(() => {
    if (step >= order.length) {
      clearInterval(timer);
      showMessage(name + " visiting order: " + order.join(" → "));
      return;
    }
    highlightNode(order[step], "found");
    step++;
  }, 700);
  showMessage("Running " + name + "...");
}

// A ready-made example graph so users can try traversal quickly.
function loadSample() {
  nodeCount = 0;
  adj = {};
  for (let i = 0; i < 6; i++) { adj[i] = []; nodeCount++; }
  const edges = [[0,1],[0,2],[1,3],[2,3],[2,4],[3,5],[4,5]];
  edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
  draw();
  showMessage("Loaded a sample graph with 6 nodes. Try BFS or DFS from node 0.");
}

function clearGraph() {
  nodeCount = 0;
  adj = {};
  draw();
  showMessage("Graph cleared.");
}

/* =========================================================
   DRAWING - place nodes evenly around a circle.
   ========================================================= */
function draw() {
  const svg = document.getElementById("graphCanvas");
  svg.innerHTML = "";

  if (nodeCount === 0) {
    addText(svg, "50%", "50%", "No nodes yet", "#9ca3af");
    return;
  }

  const width = svg.clientWidth || 900;
  const height = 360;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(cx, cy) - 50;

  // Work out each node's position on the circle.
  const pos = {};
  for (let i = 0; i < nodeCount; i++) {
    const angle = (2 * Math.PI * i) / nodeCount - Math.PI / 2;
    pos[i] = {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  }

  // Draw edges first (behind nodes). Skip duplicates with a < b check.
  for (let a = 0; a < nodeCount; a++) {
    adj[a].forEach((b) => {
      if (a < b) {
        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("x1", pos[a].x);
        line.setAttribute("y1", pos[a].y);
        line.setAttribute("x2", pos[b].x);
        line.setAttribute("y2", pos[b].y);
        line.setAttribute("class", "svg-edge");
        svg.appendChild(line);
      }
    });
  }

  // Draw nodes (circle + number).
  for (let i = 0; i < nodeCount; i++) {
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("cx", pos[i].x);
    circle.setAttribute("cy", pos[i].y);
    circle.setAttribute("r", 22);
    circle.setAttribute("class", "svg-node-circle");
    circle.dataset.node = i;
    svg.appendChild(circle);

    addText(svg, pos[i].x, pos[i].y + 5, i);
  }
}

function addText(svg, x, y, text, color) {
  const t = document.createElementNS(SVG_NS, "text");
  t.setAttribute("x", x);
  t.setAttribute("y", y);
  t.setAttribute("text-anchor", "middle");
  t.setAttribute("class", "svg-node-text");
  if (color) t.setAttribute("fill", color);
  t.textContent = text;
  svg.appendChild(t);
}

function highlightNode(node, cls) {
  const circle = document.querySelector(
    '#graphCanvas circle[data-node="' + node + '"]'
  );
  if (circle) circle.setAttribute("class", "svg-node-circle " + cls);
}

draw();
