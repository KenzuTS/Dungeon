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
    game.load.image('ressource', 'assets/DawnLike/Items/Rock.png');
    game.load.image('bloc', 'assets/DawnLike/Objects/bloc.png');

	game.load.spritesheet('characters', 'assets/Characters/characters.png', 16, 16);
    game.load.spritesheet('dead', 'assets/Characters/dead.png', 16, 16);
}

var hero;
var map, layerWalls;
var player;
var skeleton, bat;
var cursors;
var ennemiesGroup, itemsGroup;

function create() {

    game.world.setBounds(-800,-800,800,800);

    /* MAP */
        game.physics.startSystem(Phaser.Physics.ARCADE);

        map = game.add.tilemap('map');
        map.addTilesetImage('Cave');

        map.createLayer('Ground');
        map.createLayer('GroundOverlay');
        layerWalls = map.createLayer('Walls');
        map.createLayer('BackgroundObject');
        map.createLayer('Objects');

        layerWalls.resizeWorld();

        // collisions sur les tiles du layerWalls
        map.setCollisionBetween(1, 5000, true, layerWalls);

        map.createFromObjects('Walls', 34, 'bloc', 0, true, false);

        map.addTilesetImage('Rogue');

    /* PLAYER */
        player = new Player(game.world.centerX, game.world.centerY, 1);
        player.sprite.body.setSize(10, 10, 3, 6);

        // le joueur passe dessous ce layer
        map.createLayer('Roof');

    /* CAMERA */
        game.camera.follow(player.sprite);

    /* INPUTS */
        cursors = game.input.keyboard.createCursorKeys();

    /* GROUPS */
        ennemiesGroup = game.add.group();
        //ennemiesGroup = game.add.physicsGroup();
        skeleton = new Skeleton(game.world.centerX - 16, game.world.centerY - 16, 1);
        bat = new Bat(game.world.centerX - 32, game.world.centerY - 32, 1);
        
        ennemiesGroup.add(skeleton.sprite);
        ennemiesGroup.add(bat.sprite);

        itemsGroup = game.add.group();
}

function update() {

    game.physics.arcade.collide(player.sprite, layerWalls);
    game.physics.arcade.overlap(player.sprite, itemsGroup, collisionHandler, function (spritePlayer,item) {
        return !spritePlayer.etre.inCombat;
    }, this);
    game.physics.arcade.collide(player.sprite, ennemiesGroup, combatHandler, processAttack, this);

    //player.move();
    player.moveVelocity();
}

function render() {
    game.debug.body(player.sprite);
}

function combatHandler(sprite, target) {
    switch(sprite.animations.currentAnim.name){
        case "down":
            sprite.animations.stop();
            sprite.frame = 4;
        break;

        case "left":
            sprite.animations.stop();
            sprite.frame = 16;
        break;

        case "right":
            sprite.animations.stop();
            sprite.frame = 28;
        break;

        case "up":
            sprite.animations.stop();
            sprite.frame = 40;
        break;
    }
    target.body.enable = false;
    target.body.velocity.x = 0;
    target.body.velocity.y = 0;
    var diff = {
        x : (sprite.position.x - target.position.x),
        y : (sprite.position.y - target.position.y)
    }
    if (diff.x > 4) {
        if (diff.y > 8) {
            sprite.animations.currentAnim.name = "up";
            sprite.frame = 40;
        }
        else if(diff.y < -8){
            sprite.animations.currentAnim.name = "down";
            sprite.frame = 4;
        }
        else {
            sprite.frame = 16;
        }
    }
    else if (diff.x < 8) {
        if (diff.y > 8) {
            sprite.animations.currentAnim.name = "up";
            sprite.frame = 40;
        }
        else if(diff.y < -8){
            sprite.frame = 4;
            sprite.animations.currentAnim.name = "down";
        }
        else {
            sprite.frame = 28;
        }
    }
    player.attack(target.etre);
}
function collisionHandler(player, item){

    console.log(item)
    item.kill();
}

function processAttack(spritePlayer, target) {
    if (!spritePlayer.etre.inCombat) {
        spritePlayer.etre.inCombat = true;
        return true;
    }
    return false;
}

function pushBlock(player, bloc){

    console.log(bloc)

    switch(player.animations.currentAnim.name){

        case "down":
            var tween = game.add.tween(bloc).to( { y: bloc.y + 16 }, 300);
            tween.start();
        break;

        case "left":

        break;

        case "right":

        break;

        case "up":

        break;
    }
}