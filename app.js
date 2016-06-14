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
    game.load.spritesheet('dead', 'assets/Characters/dead.png', 16, 16);
    game.load.image('Cave', 'assets/roguelike-cave-pack/Spritesheet/roguelikeDungeon_transparent.png');
    game.load.image('Rogue', 'assets/roguelike-pack/Spritesheet/roguelikeSheet_transparent.png');
	game.load.spritesheet('characters', 'assets/Characters/characters.png', 16, 16);
}

var hero;
var map, layer;
var player;
var skeleton, bat;
var cursors;

function create() {

    game.world.setBounds(-800,-800,800,800);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('map');
    map.addTilesetImage('Cave');

    map.createLayer('Ground');
    map.createLayer('GroundOverlay');
    map.createLayer('BackgroundObject');
    map.createLayer('Objects');

    layer = map.createLayer('Walls');

    layer.resizeWorld();

    map.setCollisionBetween(0, 6, true, layer);
    map.setCollisionBetween(8, 35, true, layer);
    map.setCollisionBetween(37, 57, true, layer);
    map.setCollisionBetween(66, 78, true, layer);
    map.setCollisionBetween(95, 107, true, layer);
    map.setCollisionBetween(124, 136, true, layer);
    map.setCollisionBetween(145, 202, true, layer);
    map.setCollision(326, true, layer);

    map.addTilesetImage('Rogue');

    player = new Player(game.world.centerX, game.world.centerY, 1);

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