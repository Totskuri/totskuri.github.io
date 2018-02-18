var game = new Phaser.Game(480, 320, Phaser.AUTO, 'MobileTetrisGame', this, false, false);

game.state.add('preload',preloadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('preload');
