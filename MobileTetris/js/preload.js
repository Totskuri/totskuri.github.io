var preloadState = {
  create: function(){

    game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.parentIsWindow = true;
    game.scale.minWidth = 480;
    game.scale.minHeight = 320;
    game.scale.maxWidth = 1920;
    game.scale.maxHeight = 1280;
    //game.scale.pageAlignHorizontally = true;
    //game.scale.pageAlignVertically = true;
    game.scale.refresh();
    game.state.start('menu');
  }
};
