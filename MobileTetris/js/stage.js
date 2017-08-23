var stageMatrix = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function addBlockToStageMatrix(currentBlocks, stageBlocks){
  for(var i = 0; i < currentBlocks.length; i++){
    var posX = currentBlocks.children[i].x + currentBlocks.x;
    var posY = currentBlocks.children[i].y + currentBlocks.y;
    posX = posX - playareaStart;
    posX = posX / blockSize;
    posY = posY / blockSize;
    if(posY >= 0){
      stageMatrix[posY][posX] = currentBlockType;

      //check for game over
      if(posY == 0){
        if(posX == 3 || posX == 4 || posX == 5 || posX == 6){
          gameOverBool = true;
        }
      }
    }
  }
  checkLines(stageBlocks);
  if(!gameOverBool){
    if(!animationAdded){
      renderStageMatrix(stageBlocks);
    }else{
      game.world.bringToTop(linesAnimations);
    }
  }else{
    gameOver();
  }
}

function checkLines(){
  //mene yksi rivi kerralla läpi, jos löytyy 0 niin false
  var linesDestroyed = 0;
  for(var i = 0; i < stageMatrix.length; i++){
    var matrice = stageMatrix[i];
    var found = true;
    for(var j = 0; j < matrice.length; j++){
      if(matrice[j] == 0){
        found = false;
      }
    }
    if(found){
      linesDestroyed++;
      addLinesAnimation(i * 16);
      //remove blocks and move the ones above one down
      for(var k = i; k >= 0; k--){
        if(k - 1 >= 0){
          stageMatrix[k] = stageMatrix[k - 1].slice();
        }
      }
    }
  }
  if(linesDestroyed > 0){
    gameOverBool = false;
    playSoundEffect(lineBreakSound);
    switch(linesDestroyed){
      case 1:
        score += 40 * (level + 1);
        break;
      case 2:
        score += 100 * (level + 1);
        break;
      case 3:
        score += 300 * (level + 1);
        break;
      case 4:
        score += 1200 * (level + 1);
        break;
    }
    callAnimationEvent();
    lines += linesDestroyed;
    scoreText.text = score;
    linesText.text = lines;
    checkLevel();
  }
}

function addLinesAnimation(i){
  la = game.add.sprite(playareaStart, i, 'linesAnimation');
  la.frame = 0;
  linesAnimations.add(la);
  animationAdded = true;
}

function renderStageMatrix(stageBlocks){
  var len = stageBlocks.length;
    for(var i = 0; i < len; i++){
      stageBlocks.remove(stageBlocks.children[0]);
    }

  for(var i = 0; i < stageMatrix.length; i++){
    var stageMatrice = stageMatrix[i];
    for(var j = 0; j < stageMatrice.length; j++){
      if(stageMatrice[j] != 0){
        currentBlock = game.add.sprite(playareaStart + blockSize * j, blockSize * i, 'blockSprites');
        currentBlock.frame = stageMatrice[j] - 1;
        stageBlocks.add(currentBlock);
      }
    }
  }
  game.world.bringToTop(stageBlocks);
}

function stageMatrixEmpty(){
  stageMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
}
