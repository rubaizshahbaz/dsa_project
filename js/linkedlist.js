
let list = [];


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


function insertHead() {
  const value = getValue();
  if (value === null) return;
  list.unshift(value);          
  draw(0);                     
  showMessage("Inserted " + value + " at the head.");
}


function insertTail() {
  const value = getValue();
  if (value === null) return;
  list.push(value);            
  draw(list.length - 1);
  showMessage("Inserted " + value + " at the tail.");
}


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


function searchValue() {
  const value = getValue();
  if (value === null) return;
  draw();                      
  let step = 0;

 
  const timer = setInterval(() => {
    
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


function clearList() {
  list = [];
  draw();
  showMessage("List cleared.");
}



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

   
    if (i < list.length - 1) {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "→";
      area.appendChild(arrow);
    }
  });

  
  const nullSpan = document.createElement("span");
  nullSpan.className = "arrow";
  nullSpan.textContent = "→ null";
  area.appendChild(nullSpan);
}

// Draw the empty list when the page loads.
draw();
