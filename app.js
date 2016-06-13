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
    game.load.tilemap('map', 'assets/tilemaps/json/dungeonTest.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('cave', 'assets/roguelike-cave-pack/Spritesheet/roguelikeDungeon_transparent.png');
    game.load.image('rogue', 'assets/roguelike-pack/Spritesheet/roguelikeSheet_transparent.png');
	game.load.spritesheet('hero', 'assets/Characters/characters.png', 16, 16, 3);
}

var hero;
var map, layer;

function create() {
    map = game.add.tilemap('map');
    map.addTilesetImage('Cave','cave');
    map.addTilesetImage('Rogue','rogue');
    layer = map.createLayer('Ground');
    layer.resizeWorld();
	//hero = game.add.sprite(200, 360, 'hero', 0);
	//hero.scale.set(2);
}

function update() {
}

function render() {
}