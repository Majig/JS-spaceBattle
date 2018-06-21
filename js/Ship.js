// tuning constants
const ROUNDSPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;

shipClass.prototype = new movingWrapPositionClass();
function shipClass() {
  // variables to keep track of position
  this.xv = 0;
  this.yv = 0;
  this.x = 75;
  this.y = 75;
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

  this.superclassReset = this.reset;
  this.reset = function () {
    this.ang = -0.5 * Math.PI;

    this.superclassReset();
    this.myShot.reset();
  }

  this.superclassMove = this.move;
  this.move = function () {
    if(this.keyHeld_Left) {
      this.ang -= TURN_RATE*Math.PI;
    }

    if(this.keyHeld_Right) {
      this.ang += TURN_RATE*Math.PI;
    }
    
    if(this.keyHeld_Up) {
      this.xv += Math.cos(this.ang) * THRUST_POWER;
      this.yv += Math.sin(this.ang) * THRUST_POWER;
    }
    
    this.superclassMove();

    this.xv *= ROUNDSPEED_DECAY_MULT;
    this.yv *= ROUNDSPEED_DECAY_MULT;

    this.myShot.move();
  }

  this.fireCannon = function () {
    if (this.myShot.isShotReadyToFire()) {
      this.myShot.shootFrom(this);
    }    
  }

  this.checkMyShipAndShotCollisionAgainst = function (thisEnemy) {
    if (thisEnemy.isOverlappingPoint(this.x, this.y)) {
      this.reset();
      document.getElementById("debugText").innerHTML = "Player crashed!";
    }

    if (this.myShot.hitTest(thisEnemy)) {
      thisEnemy.reset();
      this.myShot.reset();
      document.getElementById("debugText").innerHTML = "Enemy blasted!";
    }
  }

  this.draw = function () {
    drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
    this.myShot.draw();
  }
} // end of class
