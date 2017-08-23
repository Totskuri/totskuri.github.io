
var score;
var lines;
var level;

var scoreText;
var linesText;
var levelText;
var pausedText;
var gameOverScoreText;

var exitButton;
var nextWindow;
var scoreWindow;
var levelWindow;
var linesWindow;
var gameOverWindow;
var playAgainButton;
var mainMenuButton;
var pauseButton;
var unpauseButton;

var exitingGameText;
var yesButton;
var noButton;

var blockSize = 16;
var playareaStart = 160;
var playareaEnd = 320;

var landed;
var softDropping;
var paused;
var menuClicked;
var animationAdded;
var gameOverBool;
var controlScheme; // 0 for keyboard, 1 for touch
var touchPreference; // 0 for left, 1 for right

var currentBlocks;
var stageBlocks;
var nextBlocks;
var linesAnimations;

var animationCounter;
var currentBlocksRotation;
var currentBlockType;
var speed;
var softDropSpeed;
var currentEvent;
var animationEvent;

var cursors;
var enter;
var space;
var wKey;
var aKey;
var sKey;
var dKey;
var touchLeft;
var touchRight;
var touchDrop;
var touchRotate;
var touchLeftIsDown;
var touchRightIsDown;
var touchDropIsDown;
var touchRotateIsDown;

var loadingScreen;

var rotateSound;
var lineBreakSound;
var landSound;
var moveSound;
var playMusic;
var soundEnabled;
var musicEnabled;

var levelSpeeds = [ //speed (second * val) and level
  0.88, //0
  0.82, //1
  0.75, //2
  0.68, //3
  0.62, //4
  0.55, //5
  0.47, //6
  0.37, //7
  0.28, //8
  0.18, //9
  0.17, //10
  0.15, //11
  0.13, //12
  0.12, //13
  0.1, //14
  0.1, //15
  0.08, //16
  0.08, //17
  0.07, //18
  0.07, //19
  0.05 //20
];

var playState = {
  preload: function(){
    loadingScreen = game.add.sprite(0, 0, 'loadingScreen');

    //game.stage.backgroundColor = '#FFF';
    game.load.image('playBackground','assets/playBackground.png');
    game.load.image('playareaSprite', 'assets/playarea.png');
    game.load.image('exitingGameText', 'assets/exitingGame.png');
    game.load.image('yesButton', 'assets/yes.png');
    game.load.image('noButton', 'assets/no.png');
    game.load.image('nextWindow', 'assets/nextWindow.png')
    game.load.image('scoreWindow', 'assets/scoreWindow.png');
    game.load.image('levelWindow', 'assets/levelWindow.png');
    game.load.image('linesWindow', 'assets/linesWindow.png');
    game.load.image('gameOverWindow','assets/gameOverWindow.png');
    game.load.image('playAgainButton', 'assets/playAgainButton.png');
    game.load.image('mainMenuButton', 'assets/mainMenuButton.png');
    game.load.image('pauseButton', 'assets/pauseButton.png');
    game.load.image('unpauseButton', 'assets/unpauseButton.png');
    game.load.spritesheet('blockSprites', 'assets/blocks.png', 16, 16);
    game.load.spritesheet('linesAnimation', 'assets/linesAnimation.png', 160, 16);
    game.load.bitmapFont('numbers', 'assets/numbers.png', 'assets/numbers.fnt');

    game.load.audio('rotateSound', 'assets/sound/rotateSound.ogg');
    game.load.audio('lineBreakSound', 'assets/sound/lineBreakSound.ogg');
    game.load.audio('landSound', 'assets/sound/landSound.ogg');
    game.load.audio('moveSound', 'assets/sound/moveSound.ogg');
    game.load.audio('playMusic', 'assets/sound/playMusic.ogg');

    if(controlScheme == 1){
      game.load.image('touchLeft', 'assets/touchLeft.png');
      game.load.image('touchRight', 'assets/touchRight.png');
      game.load.image('touchDrop', 'assets/touchDrop.png');
      game.load.image('touchRotate', 'assets/touchRotate.png');
    }

    currentBlocks = game.add.group();
    stageBlocks = game.add.group();
    nextBlocks = game.add.group();
    linesAnimations = game.add.group();
  },

  create: function(){
    loadingScreen.destroy();
    //background
    game.add.sprite(0,0,'playBackground');
    //  background for playarea
    game.add.sprite(playareaStart, 0, 'playareaSprite');

    //starting values of new game
    speed = levelSpeeds[level];
    score = 0;
    lines = 0;
    landed = true;
    softDropping = false;
    paused = false;
    animationAdded = false;
    gameOverBool = false;
    animationCounter = 0;
    currentBlocksRotation = 1;
    currentBlockType = 0;
    softDropSpeed = 0.05;
    stageMatrixEmpty();
    touchLeftIsDown = false;
    touchRightIsDown = false;
    touchDropIsDown = false;
    touchRotateIsDown = false;
    menuClicked = false;

    exitButton = game.add.button(blockSize * 22, blockSize * 0.5, 'mainMenuButton', backToMainMenu, this, 0, 0, 0);
    pauseButton = game.add.button(blockSize * 22, blockSize * 2, 'pauseButton', buttonGamePause, this, 0, 0, 0);
    nextWindow = game.add.sprite(blockSize * 2, blockSize * 3.5, 'nextWindow');
    scoreWindow = game.add.sprite(playareaEnd + blockSize, blockSize * 3.5, 'scoreWindow');
    levelWindow = game.add.sprite(playareaEnd + blockSize + 1, blockSize * 7.5 + 2, 'levelWindow');
    linesWindow = game.add.sprite(playareaEnd + blockSize * 5 + 1, blockSize * 7.5 + 2, 'linesWindow');

    //Texts
    scoreText = game.add.bitmapText(playareaEnd + blockSize * 1.5, blockSize * 5.5, 'numbers', '0', 16);
    levelText = game.add.bitmapText(playareaEnd + blockSize * 1.5, blockSize * 9.5, 'numbers', '0', 16);
    linesText = game.add.bitmapText(playareaEnd + blockSize * 5.5, blockSize * 9.5, 'numbers', '0', 16);
    pausedText = game.add.text(playareaStart + blockSize * 2, blockSize * 9, '', { fontSize: '26px', fill: '#A7A37E' });
    levelText.text = level; //for some reason giving level value as parameter above doesnt work, workaround

    //Controls
    cursors = game.input.keyboard.createCursorKeys();
    enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

    if(controlScheme == 1){
      touchLeft = game.add.sprite(blockSize * 0.5, blockSize * 15.5, 'touchLeft');
      touchLeft.inputEnabled = true;
      touchLeft.events.onInputDown.add(touchLeftPressed, this);
      touchLeft.events.onInputUp.add(touchLeftReleased, this);

      if(touchPreference == 0){
        touchDrop = game.add.sprite(blockSize * 4.6, blockSize * 15.5, 'touchDrop');

        touchRotate = game.add.sprite(playareaEnd + blockSize * 1.45, blockSize * 15.5, 'touchRotate');

        touchRight = game.add.sprite(playareaEnd + blockSize * 5.5, blockSize * 15.5, 'touchRight');
      }else{
        touchDrop = game.add.sprite(playareaEnd + blockSize * 1.45, blockSize * 15.5, 'touchDrop');

        touchRotate = game.add.sprite(playareaEnd + blockSize * 5.5, blockSize * 15.5, 'touchRotate');

        touchRight = game.add.sprite(blockSize * 4.6, blockSize * 15.5, 'touchRight');
      }

      touchDrop.inputEnabled = true;
      touchDrop.events.onInputDown.add(touchDropPressed);
      touchDrop.events.onInputUp.add(touchDropReleased, this);

      touchRotate.inputEnabled = true;
      touchRotate.events.onInputDown.add(touchRotatePressed);
      touchRotate.events.onInputUp.add(touchRotateReleased, this);

      touchRight.inputEnabled = true;
      touchRight.events.onInputDown.add(touchRightPressed);
      touchRight.events.onInputUp.add(touchRightReleased, this);
    }

    rotateSound = game.add.audio('rotateSound');
    rotateSound.volume = 0.5;
    lineBreakSound = game.add.audio('lineBreakSound');
    lineBreakSound.volume = 0.35;
    landSound = game.add.audio('landSound');
    moveSound = game.add.audio('moveSound');
    moveSound.volume = 0.5;
    playMusic = game.add.audio('playMusic');
    playMusic.volume = 0.3;
    playMusic.loop = true;
    if(musicEnabled){
      playMusic.play();
    }
  },

  update: function(){
    if(!paused && !animationAdded){
      if(landed){
        spawnBlock(currentBlocks, nextBlocks);
        if(softDropping){
          currentEvent = game.time.events.add(Phaser.Timer.SECOND * softDropSpeed, moveBlockDown, this);
        }else{
          currentEvent = game.time.events.add(Phaser.Timer.SECOND * speed, moveBlockDown, this);
        }
        landed = false;
      }
    }
    checkControls(currentBlocks, cursors, enter, paused);
    if(animationAdded){

    }
  },
};

function moveBlockDown(){
  if(!landed){
    if(checkBoundsY(currentBlocks, blockSize)){
      for(var i = 0; i < currentBlocks.length; i++){
        currentBlocks.children[i].y += blockSize;
      }
      if(softDropping){
        score++;
        scoreText.text = score;
        currentEvent = game.time.events.add(Phaser.Timer.SECOND * softDropSpeed, moveBlockDown, this);
      }else{
        currentEvent = game.time.events.add(Phaser.Timer.SECOND * speed, moveBlockDown, this);
      }
    }else{
      // land piece
      landed = true;

      //play sfx
      playSoundEffect(landSound);

      //draw into stage
      addBlockToStageMatrix(currentBlocks, stageBlocks);

      //empty currentblocks
      if(!animationAdded && !gameOverBool){
        emptyCurrentBlocks(currentBlocks);
      }

      //remove current move event
      game.time.events.remove(currentEvent);
    }
  }
}

function softDropStart(){
  game.time.events.remove(currentEvent);
  currentEvent = game.time.events.add(Phaser.Timer.SECOND * softDropSpeed, moveBlockDown, this);
  softDropping = true;
}

function softDropEnd(){
  game.time.events.remove(currentEvent);
  currentEvent = game.time.events.add(Phaser.Timer.SECOND * speed, moveBlockDown, this);
  softDropping = false;
}

function emptyCurrentBlocks(currentBlocks){
  var len = currentBlocks.length;
    for(var i = 0; i < len; i++){
      currentBlocks.remove(currentBlocks.children[0]);
      currentBlocks.x = 0;
      currentBlocks.y = 0;
    }
}

function checkLevel(){
  if(lines >= level * 10 + 10){
    level++;
    speed = levelSpeeds[level];
    levelText.text = level;
  }
}

function buttonGamePause(){
  if(!menuClicked){
    pauseButton.destroy();
    unpauseButton = game.add.button(blockSize * 22, blockSize * 2, 'unpauseButton', gameResume, this, 0, 0, 0);
    gamePause();
  }
}

function gamePause(){
  //hide blocks during pause
  currentBlocks.visible = false;
  stageBlocks.visible = false;

  paused = true;
  game.time.events.pause();
  pausedText.text = 'Paused';
}

function gameResume(){
  if(unpauseButton != null && unpauseButton.visible){
    unpauseButton.destroy();
    pauseButton = game.add.button(blockSize * 22, blockSize * 2, 'pauseButton', buttonGamePause, this, 0, 0, 0);
  }

  //make blocks visible again
  currentBlocks.visible = true;
  stageBlocks.visible = true;

  paused = false;
  game.time.events.resume();
  pausedText.text = '';
}

function callAnimationEvent(){
  game.time.events.remove(currentEvent);
  animationEvent = game.time.events.add(Phaser.Timer.SECOND * 0.2, checkAnimationState, this);
}

function checkAnimationState(){
  if(animationCounter == 3){
    var len = linesAnimations.length;
    for(var i = 0; i < len; i++){
      linesAnimations.remove(linesAnimations.children[0]);
    }
    animationCounter = 0;
    animationAdded = false;
    emptyCurrentBlocks(currentBlocks);
    renderStageMatrix(stageBlocks);
  }else{
    animationCounter++;
    callAnimationEvent();
    for(var i = 0; i < linesAnimations.length; i++){
      var child = linesAnimations.children[i];
      if(child.frame == 0){
        child.frame = 1;
      }else{
        child.frame = 0;
      }
    }
  }
}

function setLevel(levelVal){
  level = levelVal;
}

function backToMainMenu(){
  if(!menuClicked){
    menuClicked = true;
    //show are you sure
    gamePause();
    pausedText.text = '';

    exitingGameText = game.add.sprite(blockSize * 9, blockSize* 8, 'exitingGameText');
    yesButton = game.add.button(blockSize * 11, blockSize * 11, 'yesButton', backToMenuYes, this, 0, 0, 0);
    noButton = game.add.button(blockSize * 17, blockSize * 11, 'noButton', backToMenuNo, this, 0, 0, 0);
  }
}

function backToMenuYes(){
  playMusic.stop();
  game.time.events.resume();
  game.state.start('menu');
}

function backToMenuNo(){
  menuClicked = false;
  exitingGameText.destroy();
  yesButton.destroy();
  noButton.destroy();
  gameResume();
}

function gameOver(){
  menuClicked = true;
  game.time.events.pause();
  gameOverWindow = game.add.sprite(blockSize * 11, blockSize * 8, 'gameOverWindow');
  gameOverScoreText = game.add.bitmapText(blockSize * 12, blockSize * 11, 'numbers', '0', 16);
  playAgainButton = game.add.button(blockSize * 12, blockSize * 12.5, 'playAgainButton', playAgain, this, 0, 0, 0);
  mainMenuButton = game.add.button(blockSize * 12, blockSize * 14, 'mainMenuButton', backToMenuYes, this, 0, 0, 0);
  gameOverScoreText.text = score; //same problem as in create
  game.world.bringToTop(gameOverWindow);
  game.world.bringToTop(gameOverScoreText);
  game.world.bringToTop(playAgainButton);
  game.world.bringToTop(mainMenuButton);

  //save highscore
  if(localStorage.getItem('highscore') == null){
    localStorage.setItem('highscore',score);
  }

  else if(score > localStorage.getItem('highscore')){
    localStorage.setItem('highscore',score);
  }
}

function playAgain(){
  playMusic.stop();
  game.time.events.resume();
  game.state.start('play');
}

function setControlSchemeKeyboard(){
  controlScheme = 0;
}

function setControlSchemeTouch(){
  controlScheme = 1;
}

function setSoundEnabled(bool){
  soundEnabled = bool;
}

function setMusicEnabled(bool){
  musicEnabled = bool;
}

function setTouchPreference(val){
  touchPreference = val;
}

function playSoundEffect(soundEffect){
  if(soundEnabled){
    soundEffect.play();
  }
}
