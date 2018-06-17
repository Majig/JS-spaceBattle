// tuning constants
const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;

function shotClass() {
  // variables to keep track of position
  this.x = 0;
  this.y = 0;
  this.ang = 0;

  this.reset = function () {
    this.shotLife = 0;
  }

  this.move = function () {
    if (this.shotLife > 0) {
      this.shotLife--;
    }

    this.x += this.xv;
    this.y += this.yv;

    this.handleScreenWrap();
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

  this.isShotReadyToFire = function () {
    return (this.shotLife <= 0);
  }

  this.shootFrom = function (firingShip) {
    this.x = firingShip.x;
    this.y = firingShip.y;

    this.xv = Math.cos(firingShip.ang) * SHOT_SPEED + firingShip.driftX;
    this.yv = Math.sin(firingShip.ang) * SHOT_SPEED + firingShip.driftY;

    this.shotLife = SHOT_LIFE;
  }

  this.draw = function () {
    if (this.shotLife > 0) {
      colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, "green");
    }
  }
} // end of class
