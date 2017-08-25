var playButton;
var backButton;
var exitButton;
var keyboardButton;
var touchButton;
var instructionsButton;
var instructionsWindow;
var chooseLevelText;
var preferencesButton;
var preferencesWindow;
var goFullscreenButton;
var exitFullscreenButton;
var soundButton;
var musicButton;
var touchPreferenceButtonLeft;
var touchPreferenceButtonRight;
var levelButton0;
var levelButton1;
var levelButton2;
var levelButton3;
var levelButton4;
var levelButton5;
var levelButton6;
var levelButton7;
var levelButton8;
var levelButton9;
var highscoreText;
var loadingScreenMenu;
var clickSound;
var menuMusic;

var menuState = {

  preload: function(){
    game.load.image('loadingScreen', 'assets/loadingScreen.png');
    game.load.image('menuBackground', 'assets/menu/menuBackground.png');
    game.load.image('playButton', 'assets/menu/playButton.png');
    game.load.image('backButton', 'assets/menu/backButton.png');
    game.load.image('chooseLevelText', 'assets/menu/chooseLevelText.png');
    game.load.image('instructionsButton', 'assets/menu/instructionsButton.png');
    game.load.image('instructionsWindow', 'assets/menu/instructionsWindow.png');
    game.load.image('keyboardButton', 'assets/menu/keyboardButton.png');
    game.load.image('touchButton', 'assets/menu/touchButton.png');
    game.load.image('preferencesButton', 'assets/menu/preferencesButton.png');
    game.load.image('preferencesWindow', 'assets/menu/preferencesWindow.png');
    game.load.image('goFullscreenButton', 'assets/menu/goFullscreenButton.png');
    game.load.image('exitFullscreenButton', 'assets/menu/exitFullscreenButton.png');
    game.load.image('checkBoxEmpty', 'assets/menu/checkBoxEmpty.png');
    game.load.image('checkBoxFilled', 'assets/menu/checkBoxFilled.png');
    game.load.image('exitButton', 'assets/menu/exitButton.png');
    game.load.spritesheet('levelButtons', 'assets/menu/levelButtons.png', 32, 32);
    game.load.bitmapFont('numbers', 'assets/numbers.png', 'assets/numbers.fnt');

    game.load.audio('clickSound', 'assets/sound/clickSound.ogg');
    game.load.audio('menuMusic', 'assets/sound/menuMusic.ogg');
  },

  create: function(){
    game.stage.backgroundColor = '#FFF';

    game.add.sprite(0, 0, 'menuBackground');
    highscoreText = game.add.bitmapText(blockSize * 17, blockSize * 4.3, 'numbers', '0', 16);
    if(localStorage.getItem('highscore') != null){
      highscoreText.text = localStorage.getItem('highscore');
    }
    if(localStorage.getItem('soundPreference') != null){
      var val = localStorage.getItem('soundPreference');
      if(val == 'false'){ //because it's saved as text...
        setSoundEnabled(false);
      }else{
        setSoundEnabled(true);
      }
    }else{
      setSoundEnabled(true);
    }
    if(localStorage.getItem('musicPreference') != null){
      var val = localStorage.getItem('musicPreference');
      if(val == 'false'){
        setMusicEnabled(false);
      }else{
        setMusicEnabled(true);
      }
    }else{
      setMusicEnabled(true);
    }
    if(localStorage.getItem('touchControlPreference') != null){
      setTouchPreference(localStorage.getItem('touchControlPreference'));
    }else{
      setTouchPreference(0);
    }

    createPlayAndInstructionsButtons();

    clickSound = game.add.audio('clickSound');
    clickSound.volume = 0.5;
    menuMusic = game.add.audio('menuMusic');
    menuMusic.volume = 0.3;
    menuMusic.loop = true;
    if(musicEnabled){
      menuMusic.play();
    }
  },
};

function createPlayAndInstructionsButtons(){
  playButton = game.add.button(blockSize * 11, blockSize * 7, 'playButton', chooseControls, this);
  preferencesButton = game.add.button(blockSize * 9, blockSize * 10, 'preferencesButton', showPreferences, this);
  instructionsButton = game.add.button(blockSize * 9, blockSize * 12, 'instructionsButton', showInstructions, this);
}

function createChooseControlsButtons(){
  keyboardButton = game.add.button(blockSize * 10, blockSize * 8, 'keyboardButton', keyboardChosen, this);
  touchButton = game.add.button(blockSize * 16, blockSize * 8, 'touchButton', touchChosen, this);
  backButton = game.add.button(blockSize * 16, blockSize * 12, 'backButton', backToMenu, this);
}

function playClickSound(){
  if(soundEnabled){
    clickSound.play();
  }
}

function chooseControls(){
  playClickSound();
  playButton.kill();
  instructionsButton.kill();
  preferencesButton.kill();
  createChooseControlsButtons();
}

function keyboardChosen(){
  setControlSchemeKeyboard();
  chooseLevel();
}

function touchChosen(){
  setControlSchemeTouch();
  chooseLevel();
}

function chooseLevel(){
  playClickSound();
  keyboardButton.kill();
  touchButton.kill();
  backButton.kill();
  backButton = game.add.button(blockSize * 16, blockSize * 12, 'backButton', backToChooseControls, this, 0, 0, 0);
  chooseLevelText = game.add.sprite(blockSize * 9, blockSize* 7, 'chooseLevelText');
  levelButton0 = game.add.button(blockSize * 10, blockSize * 8, 'levelButtons', startLevel0, this, 0, 0, 0);
  levelButton1 = game.add.button(blockSize * 12, blockSize * 8, 'levelButtons', startLevel1, this, 1, 1, 1);
  levelButton2 = game.add.button(blockSize * 14, blockSize * 8, 'levelButtons', startLevel2, this, 2, 2, 2);
  levelButton3 = game.add.button(blockSize * 16, blockSize * 8, 'levelButtons', startLevel3, this, 3, 3, 3);
  levelButton4 = game.add.button(blockSize * 18, blockSize * 8, 'levelButtons', startLevel4, this, 4, 4, 4);
  levelButton5 = game.add.button(blockSize * 10, blockSize * 10, 'levelButtons', startLevel5, this, 5, 5, 5);
  levelButton6 = game.add.button(blockSize * 12, blockSize * 10, 'levelButtons', startLevel6, this, 6, 6, 6);
  levelButton7 = game.add.button(blockSize * 14, blockSize * 10, 'levelButtons', startLevel7, this, 7, 7, 7);
  levelButton8 = game.add.button(blockSize * 16, blockSize * 10, 'levelButtons', startLevel8, this, 8, 8, 8);
  levelButton9 = game.add.button(blockSize * 18, blockSize * 10, 'levelButtons', startLevel9, this, 9, 9, 9);
}

function backToMenu(){
  playClickSound();
  keyboardButton.kill();
  touchButton.kill();
  backButton.kill();
  createPlayAndInstructionsButtons();
}

function backToChooseControls(){
  playClickSound();
  backButton.kill();
  chooseLevelText.kill();
  levelButton0.kill();
  levelButton1.kill();
  levelButton2.kill();
  levelButton3.kill();
  levelButton4.kill();
  levelButton5.kill();
  levelButton6.kill();
  levelButton7.kill();
  levelButton8.kill();
  levelButton9.kill();
  createChooseControlsButtons();
}

function showInstructions(){
  playClickSound();
  playButton.kill();
  instructionsButton.kill();
  preferencesButton.kill();
  instructionsWindow = game.add.button(blockSize * 9, blockSize * 0.5, 'instructionsWindow', exitInstructions, this);
}

function showPreferences(){
  playClickSound();
  playButton.kill();
  instructionsButton.kill();
  preferencesButton.kill();
  preferencesWindow = game.add.sprite(blockSize * 9, blockSize * 3, 'preferencesWindow');
  //backButton = game.add.button(blockSize * 17, blockSize * 13, 'backButton', exitPreferences, this);
  if(game.scale.isFullScreen){
    exitFullscreenButton = game.add.button(blockSize * 11, blockSize * 8, 'exitFullscreenButton', exitFullscreen, this);
  }else{
    goFullscreenButton = game.add.button(blockSize * 11, blockSize * 8, 'goFullscreenButton', goFullscreen, this);
  }

  if(soundEnabled){
    soundButton = game.add.button(blockSize * 14.5, blockSize * 5.2, 'checkBoxFilled', setSoundOff, this);
  }else{
    soundButton = game.add.button(blockSize * 14.5, blockSize * 5.2, 'checkBoxEmpty', setSoundOn, this);
  }

  if(musicEnabled){
    musicButton = game.add.button(blockSize * 14.5, blockSize * 6.5, 'checkBoxFilled', setMusicOff, this);
  }else{
    musicButton = game.add.button(blockSize * 14.5, blockSize * 6.5, 'checkBoxEmpty', setMusicOn, this);
  }

  createTouchPreferenceButtons();

  exitButton = game.add.button(blockSize * 19.5, blockSize * 3.5, 'exitButton', exitPreferences, this);

}

function createTouchPreferenceButtons(){
  if(touchPreference == 0){
    touchPreferenceButtonLeft = game.add.sprite(blockSize * 11.7, blockSize * 12.9, 'checkBoxFilled');
    touchPreferenceButtonRight = game.add.button(blockSize * 17.8, blockSize * 12.9, 'checkBoxEmpty', changeTouchPreference1, this);
  }else{
    touchPreferenceButtonLeft = game.add.button(blockSize * 11.7, blockSize * 12.9, 'checkBoxEmpty', changeTouchPreference0, this);
    touchPreferenceButtonRight = game.add.sprite(blockSize * 17.8, blockSize * 12.9, 'checkBoxFilled');
  }
}

function killTouchPreferenceButtons(){
  touchPreferenceButtonLeft.kill();
  touchPreferenceButtonRight.kill();
}

function setSoundOff(){
  playClickSound();
  setSoundEnabled(false);
  localStorage.setItem('soundPreference',false);
  soundButton.kill();
  soundButton = game.add.button(blockSize * 14.5, blockSize * 5.2, 'checkBoxEmpty', setSoundOn, this);
}

function setSoundOn(){
  playClickSound();
  setSoundEnabled(true);
  localStorage.setItem('soundPreference',true);
  soundButton.kill();
  soundButton = game.add.button(blockSize * 14.5, blockSize * 5.2, 'checkBoxFilled', setSoundOff, this);
}

function setMusicOff(){
  playClickSound();
  setMusicEnabled(false);
  localStorage.setItem('musicPreference',false);
  musicButton.kill();
  musicButton = game.add.button(blockSize * 14.5, blockSize * 6.5, 'checkBoxEmpty', setMusicOn, this);
  menuMusic.stop();
}

function setMusicOn(){
  playClickSound();
  setMusicEnabled(true);
  localStorage.setItem('musicPreference',true);
  musicButton.kill();
  musicButton = game.add.button(blockSize * 14.5, blockSize * 6.5, 'checkBoxFilled', setMusicOff, this);
  menuMusic.play();
}

function changeTouchPreference0(){
  playClickSound();
  setTouchPreference(0);
  localStorage.setItem('touchControlPreference',0);
  killTouchPreferenceButtons();
  createTouchPreferenceButtons();
}

function changeTouchPreference1(){
  playClickSound();
  setTouchPreference(1);
  localStorage.setItem('touchControlPreference',1);
  killTouchPreferenceButtons();
  createTouchPreferenceButtons();
}

function exitPreferences(){
  playClickSound();
  preferencesWindow.kill();
  exitButton.kill();
  soundButton.kill();
  musicButton.kill();
  if(game.scale.isFullScreen){
    exitFullscreenButton.kill();
  }else{
    goFullscreenButton.kill();
  }
  killTouchPreferenceButtons();
  createPlayAndInstructionsButtons();
}

function goFullscreen(){
  playClickSound();
  goFullscreenButton.kill();
  exitFullscreenButton = game.add.button(blockSize * 11, blockSize * 8, 'exitFullscreenButton', exitFullscreen, this);
  game.scale.maxWidth = 3840;
  game.scale.maxHeight = 2160;
  game.scale.startFullScreen(false);
}

function exitFullscreen(){
  playClickSound();
  exitFullscreenButton.kill();
  goFullscreenButton = game.add.button(blockSize * 11, blockSize * 8, 'goFullscreenButton', goFullscreen, this);
  game.scale.maxWidth = 960;
  game.scale.maxHeight = 640;
  game.scale.stopFullScreen();
}

function exitInstructions(){
  playClickSound();
  instructionsWindow.kill();
  createPlayAndInstructionsButtons();
}

function startLevel0(){
  setLevel(0);
  playGame();
}

function startLevel1(){
  setLevel(1);
  playGame();
}

function startLevel2(){
  setLevel(2);
  playGame();
}

function startLevel3(){
  setLevel(3);
  playGame();
}

function startLevel4(){
  setLevel(4);
  playGame();
}

function startLevel5(){
  setLevel(5);
  playGame();
}

function startLevel6(){
  setLevel(6);
  playGame();
}

function startLevel7(){
  setLevel(7);
  playGame();
}

function startLevel8(){
  setLevel(8);
  playGame();
}

function startLevel9(){
  setLevel(9);
  playGame();
}

function playGame(){
  menuMusic.stop();
  playClickSound();
  game.state.start('play');
}
