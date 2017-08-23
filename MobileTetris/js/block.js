/*
  I = 1
  J = 2
  L = 3
  O = 4
  S = 5
  T = 6
  Z = 7
*/
var nextBlock = 0;
var thisBlock = 0;

function spawnBlock(currentBlocks, nextBlocks){
  if(nextBlock == 0){
    var randomNext = game.rnd.integerInRange(0,1000);
    if(randomNext <= 107){ //percentages from gameboy tetris
      randomNext =  3;
    }else if(randomNext > 107 && randomNext <= 243){
      randomNext = 2;
    }else if(randomNext > 243 && randomNext <= 380){
      randomNext = 1;
    }else if( randomNext > 380 && randomNext <= 517){
      randomNext = 7;
    }else if( randomNext > 517 && randomNext <= 678){
      randomNext = 4;
    }else if(randomNext > 678 && randomNext <= 839){
      randomNext = 5;
    }else{
      randomNext = 6;
    }
    nextBlock = randomNext;
  }

  thisBlock = nextBlock;
  var random = game.rnd.integerInRange(0,1000);
  if(random <= 107){ //percentages from gameboy tetris
    random =  3;
  }else if(random > 107 && random <= 243){
    random = 2;
  }else if(random > 243 && random <= 380){
    random = 1;
  }else if( random > 381 && random <= 517){
    random = 7;
  }else if( random > 517 && random <= 678){
    random = 4;
  }else if(random > 678 && random <= 839){
    random = 5;
  }else{
    random = 6;
  }

  nextBlock = random;

  if(thisBlock == nextBlock){ //give one chance to not get same block twice
    var random = game.rnd.integerInRange(0,1000);
    if(random <= 107){ //percentages from gameboy tetris
      random =  3;
    }else if(random > 107 && random <= 243){
      random = 2;
    }else if(random > 244 && random <= 380){
      random = 1;
    }else if( random > 381 && random <= 517){
      random = 7;
    }else if( random > 518 && random <= 678){
      random = 4;
    }else if(random > 679 && random <= 839){
      random = 5;
    }else{
      random = 6;
    }
    nextBlock = random;
  }
  currentBlockType = thisBlock;
  currentBlocksRotation = 1;
  var matrixThis = getMatrix(thisBlock);
  var matrixNext = getMatrix(nextBlock);

  var x = playareaStart + blockSize * 3;
  var y = -blockSize * 3;
  for(var i = 0; i < matrixThis.length; i++){ //thisblock
    var matrice = matrixThis[i];
    for(var j = 0; j < matrice.length; j++){
      if(matrice[j] == 1){
        currentBlock = game.add.sprite(x + (blockSize * j), y + (blockSize * i), 'blockSprites');
        currentBlock.frame = thisBlock - 1;
        currentBlocks.add(currentBlock);
      }
    }
  }

  var len = nextBlocks.length;
  for(var i = 0; i < len; i++){
    nextBlocks.remove(nextBlocks.children[0]);
  }

  for(var i = 0; i < matrixNext.length; i++){ //thisblock
    var matrice = matrixNext[i];
    for(var j = 0; j < matrice.length; j++){
      if(matrice[j] == 1){
        nextBlockSprite = game.add.sprite(blockSize * 3 + (blockSize * j), blockSize * 4.5 + (blockSize * i), 'blockSprites');
        nextBlockSprite.frame = nextBlock - 1;
        nextBlocks.add(nextBlockSprite);
      }
    }
  }

  game.world.bringToTop(currentBlocks);
  game.world.bringToTop(nextBlocks);
}

function checkBoundsX(currentBlocks, moveVal){
  for(var i = 0; i < currentBlocks.children.length; i++){
    var block = currentBlocks.children[i];
    if((block.x + currentBlocks.x + moveVal) < playareaStart){
      return false;
    }else if((block.x + currentBlocks.x + moveVal) > playareaEnd - blockSize){
      return false;
    }
    //other blocks
      //calc pos
      if(block.y >= 0){
        var posX = block.x + currentBlocks.x + moveVal;
        var posY = block.y + currentBlocks.y;
        posX = posX - playareaStart;
        posX = posX / blockSize;
        posY = posY / blockSize;
        if(stageMatrix[posY][posX] != 0){
            return false;
        }
      }
  }
  playSoundEffect(moveSound);
  return true;
}

function getMatrix(random){
  var matrix;
  switch(random){
    case 1:
      matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
      ];
      break;
    case 2:
      matrix = [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0]
      ];
      break;
    case 3:
      matrix = [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
      ];
      break;
    case 4:
      matrix = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
      ];
      break;
    case 5:
      matrix = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0]
      ];
      break;
    case 6:
      matrix = [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
      ];
      break;
    case 7:
      matrix = [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
      ];
      break;
  }
  return matrix;
}

function checkBoundsY(currentBlocks, moveVal){
  for(var i = 0; i < currentBlocks.children.length; i++){
    var block = currentBlocks.children[i];
    //floor
    if(block.y >= 0){ // check if inside stage
      if((block.y + currentBlocks.y + moveVal) > game.world.height - blockSize){
        return false;
      }
      //other blocks
        //calc pos
        var posX = block.x + currentBlocks.x;
        var posY = block.y + currentBlocks.y;
        posX = posX - playareaStart;
        posX = posX / blockSize;
        posY = posY / blockSize;
        if(posY + 1 <= 20){
          if(stageMatrix[posY + 1][posX] != 0){
              return false;
          }
        }
      }
  }
  return true;
}

function rotateBlock(currentBlocks){
  if(currentBlocksRotation == 4){
    currentBlocksRotation = 1;
  }else{
    currentBlocksRotation++;
  }
  var rotated = false;
  /*
    I = 1
    J = 2
    L = 3
    O = 4
    S = 5
    T = 6
    Z = 7
  */
  switch(currentBlockType){
    case 1:
      //I
      if(currentBlocksRotation == 1 || currentBlocksRotation == 3){
        /*matrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.children[0].x + currentBlocks.x - blockSize, currentBlocks.children[0].y + currentBlocks.y + blockSize * 2],
          [currentBlocks.children[1].x + currentBlocks.x, currentBlocks.children[1].y + currentBlocks.y + blockSize],
          [currentBlocks.children[2].x + currentBlocks.x + blockSize, currentBlocks.children[2].y + currentBlocks.y],
          [currentBlocks.children[3].x + currentBlocks.x + blockSize * 2, currentBlocks.children[3].y + currentBlocks.y - blockSize]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x - blockSize;
          currentBlocks.children[0].y = currentBlocks.children[0].y + blockSize * 2;
          currentBlocks.children[1].y = currentBlocks.children[1].y + blockSize;
          currentBlocks.children[2].x = currentBlocks.children[2].x + blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x + blockSize * 2;
          currentBlocks.children[3].y = currentBlocks.children[3].y - blockSize;
          rotated = true;
        }
      }else{
        /*matrix = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.children[0].x + currentBlocks.x + blockSize, currentBlocks.children[0].y + currentBlocks.y - blockSize * 2],
          [currentBlocks.children[1].x + currentBlocks.x, currentBlocks.children[1].y + currentBlocks.y - blockSize],
          [currentBlocks.children[2].x + currentBlocks.x - blockSize, currentBlocks.children[2].y + currentBlocks.y],
          [currentBlocks.children[3].x + currentBlocks.x - blockSize * 2, currentBlocks.children[3].y + currentBlocks.y + blockSize]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x + blockSize;
          currentBlocks.children[0].y = currentBlocks.children[0].y - blockSize * 2;
          currentBlocks.children[1].y = currentBlocks.children[1].y - blockSize;
          currentBlocks.children[2].x = currentBlocks.children[2].x - blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x - blockSize * 2;
          currentBlocks.children[3].y = currentBlocks.children[3].y + blockSize;
          rotated = true;
        }
      }
      break;
    case 2:
      //J
      switch(currentBlocksRotation){
        case 1:
        /*matrix = [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x - blockSize, currentBlocks.y + currentBlocks.children[0].y + blockSize],
          [currentBlocks.x + currentBlocks.children[1].x - blockSize, currentBlocks.y + currentBlocks.children[1].y + blockSize],
          [currentBlocks.x + currentBlocks.children[2].x + blockSize, currentBlocks.y + currentBlocks.children[2].y],
          [currentBlocks.x + currentBlocks.children[3].x + blockSize, currentBlocks.y + currentBlocks.children[3].y]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x - blockSize;
          currentBlocks.children[0].y = currentBlocks.children[0].y + blockSize;
          currentBlocks.children[1].x = currentBlocks.children[1].x - blockSize;
          currentBlocks.children[1].y = currentBlocks.children[1].y + blockSize;
          currentBlocks.children[2].x = currentBlocks.children[2].x + blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x + blockSize;
          rotated = true;
        }
          break;
        case 2:
          /*matrix = [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0]
        ];*/
          rotatePositions = [
            [currentBlocks.x + currentBlocks.children[0].x + blockSize, currentBlocks.y + currentBlocks.children[0].y - blockSize],
            [currentBlocks.x + currentBlocks.children[1].x, currentBlocks.y + currentBlocks.children[1].y],
            [currentBlocks.x + currentBlocks.children[2].x - blockSize * 2, currentBlocks.y + currentBlocks.children[2].y + blockSize],
            [currentBlocks.x + currentBlocks.children[3].x - blockSize, currentBlocks.y + currentBlocks.children[3].y]
          ];
          if(canRotate(rotatePositions)){
            currentBlocks.children[0].x = currentBlocks.children[0].x + blockSize;
            currentBlocks.children[0].y = currentBlocks.children[0].y - blockSize;
            currentBlocks.children[2].x = currentBlocks.children[2].x - blockSize * 2;
            currentBlocks.children[2].y = currentBlocks.children[2].y + blockSize;
            currentBlocks.children[3].x = currentBlocks.children[3].x - blockSize;
            rotated = true;
          }
          break;
        case 3:
        /*matrix = [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x - blockSize, currentBlocks.y + currentBlocks.children[0].y],
          [currentBlocks.x + currentBlocks.children[1].x - blockSize, currentBlocks.y + currentBlocks.children[1].y],
          [currentBlocks.x + currentBlocks.children[2].x + blockSize, currentBlocks.y + currentBlocks.children[2].y - blockSize],
          [currentBlocks.x + currentBlocks.children[3].x + blockSize,  currentBlocks.children[3].y - blockSize]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x - blockSize;
          currentBlocks.children[1].x = currentBlocks.children[1].x - blockSize;
          currentBlocks.children[2].x = currentBlocks.children[2].x + blockSize;
          currentBlocks.children[2].y = currentBlocks.children[2].y - blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x + blockSize;
          currentBlocks.children[3].y = currentBlocks.children[3].y - blockSize;
          rotated = true;
        }
          break;
        case 4:
        /*matrix = [
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x + blockSize, currentBlocks.y + currentBlocks.children[0].y],
          [currentBlocks.x + currentBlocks.children[1].x + blockSize * 2, currentBlocks.y + currentBlocks.children[1].y - blockSize],
          [currentBlocks.x + currentBlocks.children[2].x, currentBlocks.y + currentBlocks.children[2].y],
          [currentBlocks.x + currentBlocks.children[3].x - blockSize,  currentBlocks.children[3].y + blockSize]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x + blockSize;
          currentBlocks.children[1].x = currentBlocks.children[1].x + blockSize * 2;
          currentBlocks.children[1].y = currentBlocks.children[1].y - blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x - blockSize;
          currentBlocks.children[3].y = currentBlocks.children[3].y + blockSize;
          rotated = true;
        }
          break;
      }
      break;
    case 3:
      //L
      switch(currentBlocksRotation){
        case 1:
        /*matrix = [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x - blockSize, currentBlocks.y + currentBlocks.children[0].y + blockSize],
          [currentBlocks.x + currentBlocks.children[1].x, currentBlocks.y + currentBlocks.children[1].y],
          [currentBlocks.x + currentBlocks.children[2].x + blockSize, currentBlocks.y + currentBlocks.children[2].y - blockSize],
          [currentBlocks.x + currentBlocks.children[3].x - blockSize * 2,  currentBlocks.children[3].y]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x - blockSize;
          currentBlocks.children[0].y = currentBlocks.children[0].y + blockSize;
          currentBlocks.children[2].x = currentBlocks.children[2].x + blockSize;
          currentBlocks.children[2].y = currentBlocks.children[2].y - blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x - blockSize * 2;
          rotated = true;
        }
          break;
        case 2:
        /*matrix = [
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x, currentBlocks.y + currentBlocks.children[0].y - blockSize],
          [currentBlocks.x + currentBlocks.children[1].x, currentBlocks.y + currentBlocks.children[1].y - blockSize],
          [currentBlocks.x + currentBlocks.children[2].x - blockSize, currentBlocks.y + currentBlocks.children[2].y],
          [currentBlocks.x + currentBlocks.children[3].x + blockSize,  currentBlocks.children[3].y]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].y = currentBlocks.children[0].y - blockSize;
          currentBlocks.children[1].y = currentBlocks.children[1].y - blockSize;
          currentBlocks.children[2].x = currentBlocks.children[2].x - blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x + blockSize;
          rotated = true;
        }
          break;
        case 3:
        /*matrix = [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x + blockSize * 2, currentBlocks.y + currentBlocks.children[0].y],
          [currentBlocks.x + currentBlocks.children[1].x - blockSize, currentBlocks.y + currentBlocks.children[1].y + blockSize],
          [currentBlocks.x + currentBlocks.children[2].x, currentBlocks.y + currentBlocks.children[2].y],
          [currentBlocks.x + currentBlocks.children[3].x + blockSize,  currentBlocks.children[3].y - blockSize]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x + blockSize * 2;
          currentBlocks.children[1].x = currentBlocks.children[1].x - blockSize;
          currentBlocks.children[1].y = currentBlocks.children[1].y + blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x + blockSize;
          currentBlocks.children[3].y = currentBlocks.children[3].y - blockSize;
          rotated = true;
        }
          break;
        case 4:
        /*matrix = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x - blockSize, currentBlocks.y + currentBlocks.children[0].y],
          [currentBlocks.x + currentBlocks.children[1].x + blockSize, currentBlocks.y + currentBlocks.children[1].y],
          [currentBlocks.x + currentBlocks.children[2].x, currentBlocks.y + currentBlocks.children[2].y + blockSize],
          [currentBlocks.x + currentBlocks.children[3].x,  currentBlocks.children[3].y + blockSize]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x - blockSize;
          currentBlocks.children[1].x = currentBlocks.children[1].x + blockSize;
          currentBlocks.children[2].y = currentBlocks.children[2].y + blockSize;
          currentBlocks.children[3].y = currentBlocks.children[3].y + blockSize;
          rotated = true;
        }
          break;
      }
      break;
    case 4:
      //O
      break;
    case 5:
      //S
      if(currentBlocksRotation == 1 || currentBlocksRotation == 3){
        /*matrix = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x, currentBlocks.y + currentBlocks.children[0].y + blockSize],
          [currentBlocks.x + currentBlocks.children[1].x + blockSize, currentBlocks.y + currentBlocks.children[1].y],
          [currentBlocks.x + currentBlocks.children[2].x - blockSize * 2, currentBlocks.y + currentBlocks.children[2].y + blockSize],
          [currentBlocks.x + currentBlocks.children[3].x - blockSize,  currentBlocks.children[3].y]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].y = currentBlocks.children[0].y + blockSize;
          currentBlocks.children[1].x = currentBlocks.children[1].x + blockSize;
          currentBlocks.children[2].x = currentBlocks.children[2].x - blockSize * 2;
          currentBlocks.children[2].y = currentBlocks.children[2].y + blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x - blockSize;
          rotated = true;
        }
      }else{
        /*matrix = [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x, currentBlocks.y + currentBlocks.children[0].y - blockSize],
          [currentBlocks.x + currentBlocks.children[1].x - blockSize, currentBlocks.y + currentBlocks.children[1].y],
          [currentBlocks.x + currentBlocks.children[2].x + blockSize * 2, currentBlocks.y + currentBlocks.children[2].y - blockSize],
          [currentBlocks.x + currentBlocks.children[3].x + blockSize,  currentBlocks.children[3].y]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].y = currentBlocks.children[0].y - blockSize;
          currentBlocks.children[1].x = currentBlocks.children[1].x - blockSize;
          currentBlocks.children[2].x = currentBlocks.children[2].x + blockSize * 2;
          currentBlocks.children[2].y = currentBlocks.children[2].y - blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x + blockSize;
          rotated = true;
        }
      }
      break;
    case 6:
      //T
      switch(currentBlocksRotation){
        case 1:
        /*matrix = [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x - blockSize, currentBlocks.y + currentBlocks.children[0].y + blockSize],
          [currentBlocks.x + currentBlocks.children[1].x, currentBlocks.y + currentBlocks.children[1].y],
          [currentBlocks.x + currentBlocks.children[2].x, currentBlocks.y + currentBlocks.children[2].y],
          [currentBlocks.x + currentBlocks.children[3].x,  currentBlocks.children[3].y]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x - blockSize;
          currentBlocks.children[0].y = currentBlocks.children[0].y + blockSize;
          rotated = true;
        }
          break;
        case 2:
        /*matrix = [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x + blockSize, currentBlocks.y + currentBlocks.children[0].y - blockSize],
          [currentBlocks.x + currentBlocks.children[1].x + blockSize, currentBlocks.y + currentBlocks.children[1].y],
          [currentBlocks.x + currentBlocks.children[2].x - blockSize, currentBlocks.y + currentBlocks.children[2].y],
          [currentBlocks.x + currentBlocks.children[3].x,  currentBlocks.children[3].y]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x + blockSize;
          currentBlocks.children[0].y = currentBlocks.children[0].y - blockSize;
          currentBlocks.children[1].x = currentBlocks.children[1].x - blockSize;
          currentBlocks.children[2].x = currentBlocks.children[2].x - blockSize;
          rotated = true;
        }
          break;
        case 3:
        /*matrix = [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x, currentBlocks.y + currentBlocks.children[0].y],
          [currentBlocks.x + currentBlocks.children[1].x, currentBlocks.y + currentBlocks.children[1].y],
          [currentBlocks.x + currentBlocks.children[2].x, currentBlocks.y + currentBlocks.children[2].y],
          [currentBlocks.x + currentBlocks.children[3].x + blockSize,  currentBlocks.children[3].y - blockSize]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[3].x = currentBlocks.children[3].x + blockSize;
          currentBlocks.children[3].y = currentBlocks.children[3].y - blockSize;
          rotated = true;
        }
          break;
        case 4:
        /*matrix = [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x, currentBlocks.y + currentBlocks.children[0].y],
          [currentBlocks.x + currentBlocks.children[1].x + blockSize, currentBlocks.y + currentBlocks.children[1].y],
          [currentBlocks.x + currentBlocks.children[2].x + blockSize, currentBlocks.y + currentBlocks.children[2].y],
          [currentBlocks.x + currentBlocks.children[3].x - blockSize,  currentBlocks.children[3].y + blockSize]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[1].x = currentBlocks.children[1].x + blockSize;
          currentBlocks.children[2].x = currentBlocks.children[2].x + blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x - blockSize;
          currentBlocks.children[3].y = currentBlocks.children[3].y + blockSize;
          rotated = true;
        }
          break;
      }
      break;
    case 7:
      //Z
      if(currentBlocksRotation == 1 || currentBlocksRotation == 3){
        /*matrix = [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
        ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x - blockSize, currentBlocks.y + currentBlocks.children[0].y + blockSize],
          [currentBlocks.x + currentBlocks.children[1].x + blockSize, currentBlocks.y + currentBlocks.children[1].y],
          [currentBlocks.x + currentBlocks.children[2].x, currentBlocks.y + currentBlocks.children[2].y + blockSize],
          [currentBlocks.x + currentBlocks.children[3].x + blockSize * 2,  currentBlocks.children[3].y]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x - blockSize;
          currentBlocks.children[0].y = currentBlocks.children[0].y + blockSize;
          currentBlocks.children[1].x = currentBlocks.children[1].x + blockSize;
          currentBlocks.children[2].y = currentBlocks.children[2].y + blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x + blockSize * 2;
          rotated = true;
        }
      }else{
        /*matrix = [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
      ];*/
        rotatePositions = [
          [currentBlocks.x + currentBlocks.children[0].x + blockSize, currentBlocks.y + currentBlocks.children[0].y - blockSize],
          [currentBlocks.x + currentBlocks.children[1].x - blockSize, currentBlocks.y + currentBlocks.children[1].y],
          [currentBlocks.x + currentBlocks.children[2].x, currentBlocks.y + currentBlocks.children[2].y - blockSize],
          [currentBlocks.x + currentBlocks.children[3].x - blockSize * 2,  currentBlocks.children[3].y]
        ];
        if(canRotate(rotatePositions)){
          currentBlocks.children[0].x = currentBlocks.children[0].x + blockSize;
          currentBlocks.children[0].y = currentBlocks.children[0].y - blockSize;
          currentBlocks.children[1].x = currentBlocks.children[1].x - blockSize;
          currentBlocks.children[2].y = currentBlocks.children[2].y - blockSize;
          currentBlocks.children[3].x = currentBlocks.children[3].x - blockSize * 2;
          rotated = true;
        }
      }
      break;
  }
  if(!rotated){
    if(currentBlocksRotation == 1){
      currentBlocksRotation = 4;
    }else{
      currentBlocksRotation--;
    }
  }else{
    playSoundEffect(rotateSound);
  }
}

function canRotate(rotatePositions){
  //first check if out of bounds, then stageMatrix
  for(var i = 0; i < rotatePositions.length; i++){
    if(rotatePositions[i][0] < playareaStart){
      return false;
    }else if(rotatePositions[i][0] > playareaEnd + blockSize){
      return false;
    }
    var posX = rotatePositions[i][0];
    var posY = rotatePositions[i][1];
    posX = posX - playareaStart;
    posX = posX / blockSize;
    posY = posY / blockSize;
    if(posY >= 0){
      if(stageMatrix[posY][posX] != 0){
        return false;
      }
    }
  }
  return true;
}
