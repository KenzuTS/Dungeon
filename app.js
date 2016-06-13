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

	game.load.spritesheet('hero', 'assets/Characters/characters.png', 16, 16, 3);
}

var hero;

function create() {

	hero = game.add.sprite(200, 360, 'hero', 0);
	hero.scale.set(2);
}

function update() {
}

function render() {
}