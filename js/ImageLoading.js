  var playerPic=document.createElement("img");
  var trackPics = [];

  var picsToLoad = 0;
  
  function countLoadedImageAndLaunchIfReady() {
    picsToLoad--;
    if(picsToLoad == 0) { // last image loaded?
      loadingDoneSoStartGame();
    }
  }
  
  function beginLoadingImage(imgVar, fileName) {
    picsToLoad++; // we're waiting for one more image to load before starting
    imgVar.onload=countLoadedImageAndLaunchIfReady;
    imgVar.src="images/"+fileName;
  }
  
  function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode],fileName);
  }
  
  function loadImages() {
    beginLoadingImage(playerPic,"player1.png");
    
    loadImageForTrackCode(TRACK_ROAD,"track_road.png");
    loadImageForTrackCode(TRACK_WALL,"track_wall.png");
    loadImageForTrackCode(TRACK_GOAL,"track_goal.png");
    loadImageForTrackCode(TRACK_TREE,"track_treeWall.png");
    loadImageForTrackCode(TRACK_FLAG,"track_flagWall.png");
  }