var playerPic = document.createElement("img");

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if (picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  picsToLoad++; // we're waiting for one more image to load before starting
  imgVar.onload = countLoadedImageAndLaunchIfReady;
  imgVar.src = "images/" + fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
  beginLoadingImage(playerPic, "player1.png");
}