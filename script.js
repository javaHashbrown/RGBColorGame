var Helper = {
  genRandomColors(colorCounts) {
    var colors = [];
    while (colors.length < colorCounts) {
      let curColor = this.randomColor();
      if (!colors.includes(curColor)) {
        colors.push(curColor);
      }
    }
    return colors;
  },
  pickColor(colors) {
    var idx = Math.floor(Math.random() * colors.length);
    return colors[idx];
  },
  randomColor() {
    var r = Math.floor(Math.random() * 256);
    //green channel in RGB 0-255
    var g = Math.floor(Math.random() * 256);
    //blue channel in RGB 0-255
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
};

var theme = {
  defaultBgColor: "#232323",
  defaultHeaderBgColor: "#2F5C7F"
};

var gameData = new ColorData();
var App = UI(gameData);

// *****************************
function UI(data) {
  var squares;
  var colorDisplay;
  var msgDisplay;
  var container;
  var header;
  var resetBtn;
  var modeButtons;

  var publicAPI = {
    init: initUI,
    clickSquare: clickSquare,
    reset: reset,
    changeMode: changeMode
  };
  return publicAPI;

  function initUI() {
    squares = document.querySelectorAll(".square");
    colorDisplay = document.getElementById("colorDisplay");
    msgDisplay = document.getElementById("msgDisplay");
    container = document.getElementById("container");
    header = document.querySelector("header");
    resetBtn = document.querySelector(".reset");
    modeButtons = document.querySelectorAll(".mode");
    container.addEventListener("click", clickSquare);
    resetBtn.addEventListener("click", reset);
    modeButtons.forEach(button => {
      button.addEventListener("click", changeMode);
    });

    reset();
  }

  function clickSquare(e) {
    if (e.target == this) return;
    var curColor = e.target.style.backgroundColor;
    if (curColor == gameData.getTargetColor()) {
      msgDisplay.textContent = "Correct!";
      changeColors(curColor);
      header.style.backgroundColor = curColor;
      resetBtn.textContent = "Play Again?";
    } else {
      e.target.style.backgroundColor = theme.defaultBgColor;
      msgDisplay.textContent = "try again...";
    }
  }

  function reset() {
    data.init();
    var colors = data.getColorList();
    var pickedColor = data.getTargetColor();
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
    header.style.backgroundColor = theme.defaultHeaderBgColor;
    resetBtn.textContent = "New Colors";
  }

  function changeMode() {
    modeButtons.forEach(button => button.classList.remove("selected"));
    this.classList.add("selected");
    var newMode = Number(this.dataset.key);
    data.setMode(newMode);
    reset();
  }

  function changeColors(targetColor) {
    squares.forEach(item => (item.style.backgroundColor = targetColor));
  }
}

// **************************
function ColorData(mode = 1, modeTypes = ["easy", "hard"]) {
  this.modeTypes = modeTypes;
  this.curMode = mode;
  this.colorList = [];
  this.pickedColor = "";
}

ColorData.prototype.getMode = function getMode() {
  return this.modeTypes[this.curMode];
};
ColorData.prototype.getModeSetting = function getModeSetting() {
  return this.getMode() == "easy" ? 3 : 6;
};
ColorData.prototype.setMode = function setMode(newMode) {
  if (!this.modeTypes[newMode]) return;
  this.curMode = newMode;
};

ColorData.prototype.getColorList = function getColorList() {
  return this.colorList;
};
ColorData.prototype.setColorList = function setColorList() {
  var numColors = this.getModeSetting();
  this.colorList = Helper.genRandomColors(numColors);
};
ColorData.prototype.setTargetColor = function setTargetColor() {
  this.pickedColor = Helper.pickColor(this.colorList);
};
ColorData.prototype.getTargetColor = function getTargetColor() {
  return this.pickedColor;
};
ColorData.prototype.init = function init() {
  this.setColorList();
  this.setTargetColor();
};

App.init();
