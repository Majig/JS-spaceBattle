// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var playerShip = new shipClass();

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  loadImages();
}

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var FPS = 30;
  setInterval(function () {
    moveEverything();
    drawEverything();
  }, 1000 / FPS);

  playerShip.init(shipPic);
  initInput();
}

function moveEverything() {
  playerShip.move();
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, "black");
  playerShip.draw();
}