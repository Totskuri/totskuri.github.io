var left = false;
var right = false;
var up = false;
var down = false;
var enterKey = false;
var currentEventLeft = null;
var currentEventRight = null;
var moveStartTime = 0.3;
var moveTime = 0.1;

function checkControls(currentBlocks, cursors, enter, paused){
  if(controlScheme == 0){ //keyboard
    if(canContinueWithControls()){
        if (cursors.left.isDown || aKey.isDown){
            //  Move to the left
    				if(!left){
              if(checkBoundsX(currentBlocks, -blockSize)){
                currentBlocks.x -= blockSize;
              }
              left = true;
              currentEventLeft = game.time.events.add(Phaser.Timer.SECOND * moveStartTime, leftTimeHasPassed, this);
    				}
        }
    		if (cursors.right.isDown || dKey.isDown){
            //  Move to the right
    				if(!right){
              if(checkBoundsX(currentBlocks, blockSize)){
      					currentBlocks.x += blockSize;
              }
              right = true;
              currentEventRight = game.time.events.add(Phaser.Timer.SECOND * moveStartTime, rightTimeHasPassed, this);
    				}
        }
        if(cursors.up.isDown || wKey.isDown){
          if(!up){
            rotateBlock(currentBlocks);
            up = true;
          }
        }
        if(cursors.down.isDown || space.isDown || sKey.isDown){
          if(!down){
            softDropStart();
            down = true;
          }
        }

    		if (cursors.left.isUp && aKey.isUp){
    			left = false;
          if(currentEventLeft != null){
            game.time.events.remove(currentEventLeft);
          }
    		}
    		if (cursors.right.isUp && dKey.isUp){
    			right = false;
          if(currentEventRight != null){
            game.time.events.remove(currentEventRight);
          }
    		}
        if(cursors.up.isUp && wKey.isUp){
          up = false;
        }
        if(cursors.down.isUp && space.isUp && sKey.isUp){
          if(down){
            softDropEnd();
          }
          down = false;
        }
      }
      if(enter.isDown){
        if(!enterKey){
            if(!paused){
              enterKey = true;
              gamePause();
            }else{
              enterKey = true;
              gameResume();
            }
        }
      }
      if(enter.isUp){
        enterKey = false;
      }
    }
}

function canContinueWithControls(){
  if(!paused && !animationAdded){
    return true;
  }
  return false;
}

function leftTimeHasPassed(){
  if(left || touchLeftIsDown){
    if(checkBoundsX(currentBlocks, -blockSize)){
      currentBlocks.x -= blockSize;
    }
    currentEventLeft = game.time.events.add(Phaser.Timer.SECOND * moveTime, leftTimeHasPassed, this);
  }
}

function rightTimeHasPassed(){
  if(right || touchRightIsDown){
    if(checkBoundsX(currentBlocks, blockSize)){
      currentBlocks.x += blockSize;
    }
    currentEventRight = game.time.events.add(Phaser.Timer.SECOND * moveTime, rightTimeHasPassed, this);
  }
}

function touchLeftPressed(){
  if(canContinueWithControls()){
    //  Move to the left
    if(!touchLeftIsDown){
      if(checkBoundsX(currentBlocks, -blockSize)){
        currentBlocks.x -= blockSize;
      }
      touchLeftIsDown = true;
      currentEventLeft = game.time.events.add(Phaser.Timer.SECOND * moveStartTime, leftTimeHasPassed, this);
    }
  }
}

function touchLeftReleased(){
  touchLeftIsDown = false;
  if(currentEventLeft != null){
    game.time.events.remove(currentEventLeft);
  }
}

function touchDropPressed(){
  if(canContinueWithControls()){
    if(!touchDropIsDown){
      softDropStart();
      touchDropIsDown = true;
    }
  }
}

function touchDropReleased(){
  if(touchDropIsDown){
    softDropEnd();
  }
  touchDropIsDown = false;
}

function touchRotatePressed(){
  if(canContinueWithControls()){
    if(!touchRotateIsDown){
      rotateBlock(currentBlocks);
      touchRotateIsDown = true;
    }
  }
}

function touchRotateReleased(){
  touchRotateIsDown = false;
}

function touchRightPressed(){
  if(canContinueWithControls()){
    if(!touchRightIsDown){
      if(checkBoundsX(currentBlocks, blockSize)){
        currentBlocks.x += blockSize;
      }
      touchRightIsDown = true;
      currentEventRight = game.time.events.add(Phaser.Timer.SECOND * moveStartTime, rightTimeHasPassed, this);
    }
  }
}

function touchRightReleased(){
  touchRightIsDown = false;
  if(currentEventRight != null){
    game.time.events.remove(currentEventRight);
  }
}
