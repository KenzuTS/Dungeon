var game = new Phaser.Game(
    Application.Canvas.WIDTH, 
    Application.Canvas.HEIGHT,
    Phaser.AUTO, 
    "Dungeon"
    );

game.state.add("Preload", Application.Preload);
game.state.add("Game", Application.Game);
game.state.start("Preload");

