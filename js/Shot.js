// tuning constants
const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;

shotClass.prototype = new movingWrapPositionClass();

function shotClass() {
  // variables to keep track of position
  this.x = 0;
  this.y = 0;
  this.ang = 0;

  this.superclassReset = this.reset;
  this.reset = function () {
    this.shotLife = 0;
    this.superclassReset();
  }

  this.superclassMove = this.move;
  this.move = function () {
    if (this.shotLife > 0) {
      this.shotLife--;
      // calls the function stored in superclassMove
      // it holds a reference to MovingWrapPosition.move since
      // it was created earlier
      this.superclassMove();
    }
  }

  this.isShotReadyToFire = function () {
    return (this.shotLife <= 0);
  }

  this.shootFrom = function (firingShip) {
    this.x = firingShip.x;
    this.y = firingShip.y;

    this.xv = Math.cos(firingShip.ang) * SHOT_SPEED + firingShip.xv;
    this.yv = Math.sin(firingShip.ang) * SHOT_SPEED + firingShip.yv;

    this.shotLife = SHOT_LIFE;
  }

  this.hitTest = function(thisEnemy) {
    if (this.shotLife <= 0) {
      return false;
    }
    
    return thisEnemy.isOverlappingPoint(this.x, this.y);
  }

  this.draw = function () {
    if (this.shotLife > 0) {
      colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, "green");
    }
  }
} // end of class
