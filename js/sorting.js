

let array = [];
let frames = [];        
let playing = false;


function newArray() {
  array = [];
  for (let i = 0; i < 12; i++) {
    array.push(Math.floor(Math.random() * 90) + 10);  
  }
  drawBars(array, {});
  showMessage("New random array created. Pick a sorting algorithm.");
}

function showMessage(text) {
  document.getElementById("message").textContent = text;
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


function saveFrame(arr, state) {
  frames.push({ arr: arr.slice(), state: Object.assign({}, state) });
}



function bubbleSort(arr) {
  
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      saveFrame(arr, { [j]: "compare", [j + 1]: "compare" });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];  
        saveFrame(arr, { [j]: "swap", [j + 1]: "swap" });
      }
    }
    saveFrame(arr, { [arr.length - 1 - i]: "sorted" });
  }
  saveFrame(arr, { 0: "sorted" });
}

function selectionSort(arr) {
 
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      saveFrame(arr, { [min]: "compare", [j]: "compare" });
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];         
      saveFrame(arr, { [i]: "swap", [min]: "swap" });
    }
    saveFrame(arr, { [i]: "sorted" });
  }
}

function insertionSort(arr) {
 
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    saveFrame(arr, { [i]: "compare" });
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      saveFrame(arr, { [j]: "swap", [j + 1]: "swap" });
      j--;
    }
    arr[j + 1] = key;
  }
 
  const allSorted = {};
  arr.forEach((_, i) => (allSorted[i] = "sorted"));
  saveFrame(arr, allSorted);
}


function startSort(type) {
  if (playing) return;                 
  if (array.length === 0) newArray();

  frames = [];
  const copy = array.slice();

  if (type === "bubble") bubbleSort(copy);
  else if (type === "selection") selectionSort(copy);
  else if (type === "insertion") insertionSort(copy);

  array = copy;                         
  playFrames(type);
}

function playFrames(type) {
  playing = true;
  let step = 0;
  showMessage("Running " + type + " sort...");

  const timer = setInterval(() => {
    if (step >= frames.length) {
      clearInterval(timer);
      playing = false;
     
      const allSorted = {};
      array.forEach((_, i) => (allSorted[i] = "sorted"));
      drawBars(array, allSorted);
      showMessage("Done! The array is sorted.");
      return;
    }
    drawBars(frames[step].arr, frames[step].state);
    step++;
  }, 250);
}


newArray();
