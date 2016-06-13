var game = new Phaser.Game(
    800, 
    600,
    Phaser.AUTO, 
    "phaser-example", 
    {   preload: preload, 
        create: create, 
        update: update, 
        render: render });

function preload() {

	game.load.spritesheet('characters', 'assets/Characters/characters.png', 16, 16);
}

var player;
var cursors;

function create() {

    player = new Player(200, 400, 4);

    game.physics.enable(player.sprite, Phaser.Physics.ARCADE);

    cursors = game.input.keyboard.createCursorKeys();
    console.log(player.tween)

}

function update() {

    player.move();

}

function render() {
}