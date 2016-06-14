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

    game.load.image('Cave', 'assets/roguelike-cave-pack/Spritesheet/roguelikeDungeon_transparent.png');
    game.load.image('Rogue', 'assets/roguelike-pack/Spritesheet/roguelikeSheet_transparent.png');
    game.load.image('key', 'assets/DawnLike/Items/Key.png');

	game.load.spritesheet('characters', 'assets/Characters/characters.png', 16, 16);
}

var hero;
var map, layer, ground;
var player;
var skeleton;
var cursors;
var ennemiesGroup, itemsGroup;

function create() {


    /* MAP */
    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('map');
    map.addTilesetImage('Cave');

    ground = map.createLayer('Ground');

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

    /* PLAYER */
    player = new Player(game.world.centerX, game.world.centerY, 1);

    /* CAMERA */
    game.camera.follow(player.sprite);

    /* INPUTS */
    cursors = game.input.keyboard.createCursorKeys();

    /* GROUPS */
    ennemiesGroup = game.add.group();
    skeleton = new Skeleton(game.world.centerX - 16, game.world.centerY - 16, 1);
    
    ennemiesGroup.add(skeleton.sprite);

    itemsGroup = game.add.group();
}

function update() {

    game.physics.arcade.collide(player.sprite, layer);
    game.physics.arcade.overlap(player.sprite, itemsGroup, collisionHandler, null, this);

    //player.move();
    player.moveVelocity();
}

function render() {

    game.debug.body(player.sprite);
}

function collisionHandler(player, item){

    console.log(item)
    item.kill();
}