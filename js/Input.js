// keyboard keycode constants, determined by printing out e.keycode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const KEY_SPACEBAR = 32;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  playerShip.setupControls(KEY_W, KEY_S, KEY_A, KEY_D, KEY_SPACEBAR);
}

function keyPressed(e) {
  if (e.keyCode == playerShip.controlKey_Fire && playerShip.myShot.shotLife == 0) {
    playerShip.fireCannon();
  }
  setKeyHoldState(e.keyCode, playerShip, true);
  e.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(e) {
  setKeyHoldState(e.keyCode, playerShip, false);
}

function setKeyHoldState(thisKey, thisShip, setTo) {
  if (thisKey == thisShip.controlKey_Up) {
    thisShip.keyHeld_Up = setTo;
  }
  if (thisKey == thisShip.controlKey_Down) {
    thisShip.keyHeld_Down = setTo;
  }
  if (thisKey == thisShip.controlKey_Left) {
    thisShip.keyHeld_Left = setTo;
  }
  if (thisKey == thisShip.controlKey_Right) {
    thisShip.keyHeld_Right = setTo;
  }
}