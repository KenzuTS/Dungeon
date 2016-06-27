var game = new Phaser.Game(
    Application.Canvas.WIDTH, 
    Application.Canvas.HEIGHT,
    Phaser.Canvas, 
    "Dungeon"
    );

game.state.add("Preload", Application.Preload);
game.state.add("Game", Application.Game);
game.state.start("Preload");
