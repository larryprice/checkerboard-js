var squareWidth = 32;
var squareHeight = 32;
var prisonWidth = 512;
var prisonHeight = 512;

var prisonCanvas;
var prisonContext;

var firstSquare;
var previousSquare;
var freshlyPainted = [];
var painted = [];

window.onload = function () {
  prisonCanvas = document.getElementById("board");
  prisonCanvas.width = prisonWidth + 1;
  prisonCanvas.height = prisonHeight + 1;
  prisonCanvas.addEventListener("mousedown", prisonMouseDown, false);
  prisonContext = prisonCanvas.getContext("2d");

  drawLines();
}

function drawLines() {
  drawVerticalLines();
  drawHorizontalLines();
  prisonContext.strokeStyle = "#ccc";
  prisonContext.stroke();
}

function drawVerticalLines() {
  for (var x = 0; x <= prisonWidth; x += squareWidth) {
    prisonContext.moveTo(0.5 + x, 0);
    prisonContext.lineTo(0.5 + x, prisonHeight);
  }
}

function drawHorizontalLines() {
  for (var y = 0; y <= prisonHeight; y += squareHeight) {
    prisonContext.moveTo(0, 0.5 + y);
    prisonContext.lineTo(prisonWidth, 0.5 + y);
  }
}

function paintSquare(square) {
  prisonContext.beginPath();
  prisonContext.fillStyle = "#000";
  prisonContext.fillRect(getX(square), getY(square), squareWidth, squareHeight);

  freshlyPainted.push(square);
}

function clearSquare(square) {
  prisonContext.beginPath();
  prisonContext.fillStyle = "rgba(255, 255, 255, 1)";
  prisonContext.fillRect(getX(square), getY(square), squareWidth, squareHeight);
}

function prisonMouseDown(e) {
  prisonCanvas.addEventListener("mousemove", prisonMouseMove, false);
  prisonCanvas.addEventListener("mouseup", prisonMouseUp, false);
  prisonCanvas.addEventListener("mouseout", prisonMouseUp, false);

  var square = getSquare(e);
  firstSquare = square;
  previousSquare = square;

  paintSquare(square);
}

function prisonMouseUp(e) {
  prisonCanvas.removeEventListener("mousemove", prisonMouseMove);
  prisonCanvas.removeEventListener("mouseup", prisonMouseUp);
  prisonCanvas.addEventListener("mouseout", prisonMouseUp);

  for (var i = 0; i < freshlyPainted.length; i++) {
    painted.push(freshlyPainted[i]);
  }

  firstSquare = null;
  previousSquare = null;
  freshlyPainted = [];
}

function drawSquares() {
  for (var i = 0; i < painted.length; i++) {
    paintSquare(painted[i]);
  }
}

function prisonMouseMove(e) {
  // create square shape
  var square = getSquare(e);

  if (!areSameSquares(square, previousSquare)) {
    previousSquare = square;

    // clear
    prisonCanvas.height = prisonCanvas.height;
    drawLines();
    drawSquares();
    freshlyPainted = [];

    // redraw new square
    var baseRow = firstSquare.row < square.row ? firstSquare.row : square.row;
    var baseColumn = firstSquare.column < square.column ? firstSquare.column : square.column;
    var rowCount = Math.abs(firstSquare.row - square.row)
    var columnCount = Math.abs(firstSquare.column - square.column);

    for (var x = 0; x <= rowCount; x++) {
      for (var y = 0; y <= columnCount; y++) {
        if (x == 0 || x == rowCount || y == 0 || y == columnCount) {
          paintSquare(new Square(baseRow + x, baseColumn + y));
        }
      }
    }
  }
}

function areSameSquares(square1, square2) {
  return (square1.column == square2.column) && (square1.row == square2.row);
}

function getY(square) {
  return square.row * squareWidth;
}

function getX(square) {
  return square.column * squareHeight;
}

function getSquare(e) {
  var x;
  var y;
  if (e.pageX != undefined && e.pageY != undefined) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  x -= prisonCanvas.offsetLeft;
  y -= prisonCanvas.offsetTop;
  x = Math.min(x, prisonWidth);
  y = Math.min(y, prisonHeight);
  return new Cell(Math.floor(y / squareHeight), Math.floor(x / squareWidth));
}