const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const msgDisplay = document.getElementById("msgDisplay");
const container = document.getElementById("container");
const header = document.querySelector("header");
const resetBtn = document.querySelector(".reset");
const modeButtons = document.querySelectorAll(".mode");

container.addEventListener("click", clickSquare);
resetBtn.addEventListener("click", reset);
modeButtons.forEach(button => button.addEventListener("click", modeChange));

var defaultBgColor = "#232323";
var colors = [];
var pickedColor = "";
var numSquares = 6;

reset();

function reset() {
  colors = genRandomColors(numSquares);
  pickedColor = pickColor(colors);
  squares.forEach((item, index) => {
    if (colors[index]) {
      item.style.display = "block";
      item.style.backgroundColor = colors[index];
    } else {
      // hide squares
      item.style.display = "none";
    }
  });
  colorDisplay.textContent = pickedColor;
  msgDisplay.textContent = "";
  header.style.backgroundColor = "#2F5C7F";
  resetBtn.textContent = "New Colors";
}

function clickSquare(e) {
  if (e.target == this) return;
  var curColor = e.target.style.backgroundColor;
  if (curColor == pickedColor) {
    msgDisplay.textContent = "Correct!";
    changeColors(curColor);
    header.style.backgroundColor = curColor;
    resetBtn.textContent = "Play Again?";
  } else {
    e.target.style.backgroundColor = defaultBgColor;
    msgDisplay.textContent = "try again...";
  }
}

function changeColors(color) {
  squares.forEach(item => (item.style.backgroundColor = color));
}

function pickColor(colors) {
  var idx = Math.floor(Math.random() * colors.length);
  return colors[idx];
}

function genRandomColors(colorCounts) {
  var colors = [];
  while (colors.length < colorCounts) {
    let curColor = randomColor();
    if (!colors.includes(curColor)) {
      colors.push(curColor);
    }
  }
  return colors;
}

function randomColor() {
  //red channel in RGB 0-255
  var r = Math.floor(Math.random() * 256);
  //green channel in RGB 0-255
  var g = Math.floor(Math.random() * 256);
  //blue channel in RGB 0-255
  var b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function modeChange() {
  modeButtons.forEach(button => button.classList.remove("selected"));
  this.classList.add("selected");
  numSquares = this.textContent == "Easy" ? 3 : 6;
  reset();
}
