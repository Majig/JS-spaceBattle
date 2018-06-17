// tuning constants
const ROUNDSPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;

function shipClass() {
  // variables to keep track of position
  this.x = 75;
  this.y = 75;
  this.driftX = 0;
  this.driftY = 0;
  this.ang = -0.5 * Math.PI;

  // variable for working with shots
  this.myShot = new shotClass();

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_Up = false;
  this.keyHeld_Down = false;
  this.keyHeld_Left = false;
  this.keyHeld_Right = false;
  // this.keyHeld_Fire = false; // leaving it for autofire

  // key controls used for this
  this.setupControls = function (upKey, downKey, leftKey, rightKey, fireKey) {
    this.controlKey_Up = upKey;
    this.controlKey_Down = downKey;
    this.controlKey_Left = leftKey;
    this.controlKey_Right = rightKey;
    this.controlKey_Fire = fireKey;
  }

  this.init = function (whichGraphic) {
    this.myBitmap = whichGraphic;
    this.reset();
  }

  this.reset = function () {
    this.ang = -0.5 * Math.PI;

    this.x = canvas.width / 2;
    this.y = canvas.height / 2;

    this.myShot.reset();
  }

  this.move = function () {
    if(this.keyHeld_Left) {
      this.ang -= TURN_RATE*Math.PI;
    }

    if(this.keyHeld_Right) {
      this.ang += TURN_RATE*Math.PI;
    }
    
    if(this.keyHeld_Up) {
      this.driftX += Math.cos(this.ang) * THRUST_POWER;
      this.driftY += Math.sin(this.ang) * THRUST_POWER;
    }
    
    this.x += this.driftX;
    this.y += this.driftY;

    this.handleScreenWrap();
    this.driftX *= ROUNDSPEED_DECAY_MULT;
    this.driftY *= ROUNDSPEED_DECAY_MULT;

    this.myShot.move();
  }

  this.handleScreenWrap = function () {
    if (this.x < 0) {
      this.x += canvas.width;
    } else if (this.x > canvas.width) {
      this.x -= canvas.width;
    }

    if (this.y < 0) {
      this.y += canvas.height;
    } else if (this.y > canvas.height) {
      this.y -= canvas.height;
    }
  }

  this.fireCannon = function () {
    if (this.myShot.isShotReadyToFire()) {
      this.myShot.shootFrom(this);
    }    
  }

  this.draw = function () {
    drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
    this.myShot.draw();
  }
} // end of class
