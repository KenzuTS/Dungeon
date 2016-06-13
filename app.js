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
	game.load.spritesheet('characters', 'assets/Characters/characters.png', 16, 16);
}

var hero;
var map, layer;
var player;
var skeleton;
var cursors;

function create() {

    map = game.add.tilemap('map');
    map.addTilesetImage('Cave','cave');

    // map.setCollisionBetween(0, 6);
    // map.setCollisionBetween(8, 35);
    // map.setCollisionBetween(37, 57);
    // map.setCollisionBetween(66, 78);
    // map.setCollisionBetween(95, 107);
    // map.setCollisionBetween(124, 136);
    // map.setCollisionBetween(145, 202);
    map.setCollisionBetween(1, 521);

    //map.addTilesetImage('Rogue','rogue');

    layer = map.createLayer('Walls');
    layer.resizeWorld();
    layer.debug = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = new Player(game.world.centerX, game.world.centerY, 1);
    player.sprite.body.linearDamping = 1;

    game.camera.follow(player.sprite);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

    game.physics.arcade.collide(player.sprite, layer);
    //player.move();
    player.moveVelocity()
}

function render() {

    game.debug.body(player.sprite);
}