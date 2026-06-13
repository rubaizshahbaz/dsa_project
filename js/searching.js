

let array = [];
let frames = [];
let playing = false;

function showMessage(text) {
  document.getElementById("message").textContent = text;
}


function newArray() {
  array = [];
  for (let i = 0; i < 12; i++) {
    array.push(Math.floor(Math.random() * 90) + 10);
  }
  array.sort((a, b) => a - b);         
  drawBars(array, {});
  showMessage("New sorted array created. Type a value to search for.");
}


function drawBars(arr, state) {
  const area = document.getElementById("barsArea");
  area.innerHTML = "";
  const max = Math.max(...arr, 1);
  arr.forEach((value, i) => {
    const bar = document.createElement("div");
    bar.className = "bar" + (state[i] ? " " + state[i] : "");
    bar.style.height = (value / max) * 100 + "%";
    bar.textContent = value;
    area.appendChild(bar);
  });
}

function saveFrame(state) {
  frames.push(Object.assign({}, state));
}


function linearSearch(target) {
  for (let i = 0; i < array.length; i++) {
    saveFrame({ [i]: "compare" });          
    if (array[i] === target) {
      saveFrame({ [i]: "found" });
      return i;
    }
  }
  return -1;
}


function binarySearch(target) {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

   
    const state = {};
    for (let i = low; i <= high; i++) state[i] = "range";
    state[mid] = "compare";
    saveFrame(state);

    if (array[mid] === target) {
      saveFrame({ [mid]: "found" });
      return mid;
    } else if (array[mid] < target) {
      low = mid + 1;       
    } else {
      high = mid - 1;       
    }
  }
  return -1;
}


function startSearch(type) {
  if (playing) return;
  if (array.length === 0) newArray();

  const target = parseInt(document.getElementById("targetInput").value);
  if (isNaN(target)) {
    showMessage("Please type a value to search for.");
    return;
  }

  frames = [];
  const result = type === "linear" ? linearSearch(target) : binarySearch(target);
  playFrames(type, target, result);
}

function playFrames(type, target, result) {
  playing = true;
  let step = 0;
  showMessage("Running " + type + " search for " + target + "...");

  const timer = setInterval(() => {
    if (step >= frames.length) {
      clearInterval(timer);
      playing = false;
      if (result === -1) {
        drawBars(array, {});
        showMessage("Value " + target + " was not found in the array.");
      } else {
        showMessage("Found " + target + " at index " + result + "!");
      }
      return;
    }
    drawBars(array, frames[step]);
    step++;
  }, 700);
}

newArray();
