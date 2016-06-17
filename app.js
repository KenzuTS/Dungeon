var game = new Phaser.Game(
    Application.Canvas.WIDTH, 
    Application.Canvas.HEIGHT,
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

    game.load.image('Wall', 'assets/DawnLike/Objects/Wall.png');
    game.load.image('Ground0','assets/DawnLike/Objects/Ground0.png');
    game.load.image('Floor', 'assets/DawnLike/Objects/Floor.png');
    game.load.image('Door0', 'assets/DawnLike/Objects/Door0.png');
    game.load.image('Decor0', 'assets/DawnLike/Objects/Decor0.png');
    game.load.image('Pit0', 'assets/DawnLike/Objects/Pit0.png');

    game.load.image('key', 'assets/DawnLike/Items/Key.png');
    game.load.image('ressource', 'assets/DawnLike/Items/Rock.png');

    game.load.spritesheet('bloc', 'assets/DawnLike/Objects/bloc.png', Application.TILE_SIZE, Application.TILE_SIZE);
	game.load.spritesheet('characters', 'assets/Characters/characters.png', Application.TILE_SIZE, Application.TILE_SIZE);
    game.load.spritesheet('dead', 'assets/Characters/dead.png', Application.TILE_SIZE, Application.TILE_SIZE);
}

var hero;
var map, layerWalls, layerGround, layerGroundOverlay, layerBackgroundObject, layerObjects, layerRoof, layerEnnemies, layerPushableBloc;
var player;
var cursors;
var ennemiesGroup, itemsGroup, blocsGroup;
var text, style;
var healthBar;

function create() {

    game.world.setBounds(-Application.WORLD_SIZE.WIDTH / 2, -Application.WORLD_SIZE.HEIGHT / 2,Application.WORLD_SIZE.WIDTH / 2, Application.WORLD_SIZE.HEIGHT / 2);
    

    /* MAP */
        game.physics.startSystem(Phaser.Physics.ARCADE);

        map = game.add.tilemap('map');
        map.addTilesetImage('Cave');
        map.addTilesetImage('Rogue');
        map.addTilesetImage('Wall');
        map.addTilesetImage('Ground0');
        map.addTilesetImage('Floor');
        map.addTilesetImage('Door0');
        map.addTilesetImage('Decor0');
        map.addTilesetImage('Pit0');

        layerGround = map.createLayer('Ground');
        layerGroundOverlay = map.createLayer('GroundOverlay');
        layerWalls = map.createLayer('Walls');
        layerBackgroundObject = map.createLayer('BackgroundObject');
        layerObjects = map.createLayer('Objects');

        layerGround.setScale(Application.SCALE);
        layerGroundOverlay.setScale(Application.SCALE);
        layerWalls.setScale(Application.SCALE);
        layerBackgroundObject.setScale(Application.SCALE);
        layerObjects.setScale(Application.SCALE);        

        layerGround.smoothed = false;
        layerGroundOverlay.smoothed = false;
        layerWalls.smoothed = false;
        layerBackgroundObject.smoothed = false;
        layerObjects.smoothed = false;

        layerWalls.resizeWorld();

        // collisions sur les tiles des layers voulu
        map.setCollisionBetween(1, 5000, true, layerWalls);
        map.setCollisionBetween(1, 5000, true, layerObjects);

    /* INPUTS */
        cursors = game.input.keyboard.createCursorKeys();

    /* GROUPS */
        // Ennemies
            ennemiesGroup = game.add.group();
            map.createFromObjects('Ennemies', 2300, 'characters', 10, true, false, ennemiesGroup, Skeleton);
            map.createFromObjects('Ennemies', 2342, 'characters', 52, true, false, ennemiesGroup, Bat);
            for (var i = 0; i < ennemiesGroup.hash.length; i++) {

                ennemiesGroup.hash[i].body.setSize(13, 14, 2, 2);
                ennemiesGroup.hash[i].scale.setTo(Application.SCALE);
                ennemiesGroup.hash[i].position.x *= Application.SCALE;
                ennemiesGroup.hash[i].position.y *= Application.SCALE;
            }

            // skeleton = new Skeleton(game.world.centerX - 16, game.world.centerY - 16, Application.SCALE);
            // bat = new Bat(game.world.centerX - 32, game.world.centerY - 32, Application.SCALE);
            
            // ennemiesGroup.add(skeleton.sprite);
            // ennemiesGroup.add(bat.sprite);

        itemsGroup = game.add.group();

        blocsGroup = game.add.physicsGroup();

        map.createFromObjects('PushableBloc', 1186, 'bloc', 0, true, false, blocsGroup);
        for (var i = 0; i < blocsGroup.hash.length; i++) {
            blocsGroup.hash[i].body.mass = -100;
            blocsGroup.hash[i].body.setSize(13, 14, 2, 2);
            blocsGroup.hash[i].scale.setTo(Application.SCALE);
            blocsGroup.hash[i].position.x *= Application.SCALE;
            blocsGroup.hash[i].position.y *= Application.SCALE;
            blocsGroup.hash[i].smoothed = false;
        }

    /* PLAYER */

        player = new Player(game.world.centerX + 312, game.world.centerY);
        game.add.existing(player);

        // le joueur passe dessous ce layer
        layerRoof = map.createLayer('Roof');
        layerRoof.setScale(Application.SCALE);
        layerRoof.smoothed = false;

    /* CAMERA */

        game.camera.follow(player);
        //game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);

    /* GUI */
        /* Text HP */
            // style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center" };
            // text = game.add.text(0, 0, player.HP, style);
            // text.setTextBounds(-game.camera.world.position.x, -game.camera.world.position.y, Application.Canvas.WIDTH, 0);
            // text.fixedToCamera = true;
            // text.smoothed = false;
            // text.stroke = "black";
            // text.strokeThickness = 5;

        /* HealthBar */
            var barConfig = {   x: -game.camera.world.position.x + Application.Canvas.WIDTH / 2,
                                y: -game.camera.world.position.y + 20,
                                width: 250,
                                height: 20};
            healthBar = new HealthBar(this.game, barConfig);
            healthBar.height = 20;
            healthBar.setFixedToCamera(true);
            // todo set position
            // todo set lifebar with player.HP (règle de 3) => setPourcent
}

function update() {

    /* COLLIDE */
        game.physics.arcade.collide(player, layerWalls);
        game.physics.arcade.collide(player, blocsGroup);
        game.physics.arcade.collide(player, layerObjects, OpenDoor, null, this);
        game.physics.arcade.collide(player, ennemiesGroup, combatHandler, processAttack, this);
        game.physics.arcade.collide(layerWalls, blocsGroup, blocInWater, null, this);

    /* OVERLAP */
        game.physics.arcade.overlap(player, itemsGroup, collectItem,
            function (spritePlayer,item) {
                return !spritePlayer.inCombat;
            }, this);

    /* Player Methods */
        //player.move();
        player.moveVelocity();


}

function render() {
    game.debug.body(player);
    if (Application.key) {
        game.debug.body(Application.key);
    }
}

function combatHandler(sprite, target) {
    switch(sprite.animations.currentAnim.name){
        case "down":
            sprite.animations.stop();
            sprite.frame = Application.Player.Frame.DOWN;
        break;

        case "left":
            sprite.animations.stop();
            sprite.frame = Application.Player.Frame.LEFT;
        break;

        case "right":
            sprite.animations.stop();
            sprite.frame = Application.Player.Frame.RIGHT;
        break;

        case "up":
            sprite.animations.stop();
            sprite.frame = Application.Player.Frame.UP;
        break;
    }
    target.body.enable = false;
    target.body.velocity.x = 0;
    target.body.velocity.y = 0;
    var diff = {
        x : (sprite.position.x - target.position.x),
        y : (sprite.position.y - target.position.y)
    }
    if (diff.x > Application.TILE_SIZE / 4) {
        if (diff.y > Application.TILE_SIZE / 2) {
            sprite.animations.currentAnim.name = "up";
            sprite.frame = Application.Player.Frame.UP;
        }
        else if(diff.y < -Application.TILE_SIZE / 2){
            sprite.animations.currentAnim.name = "down";
            sprite.frame = Application.Player.Frame.DOWN;
        }
        else {
            sprite.frame = Application.Player.Frame.LEFT;
        }
    }
    else if (diff.x < -Application.TILE_SIZE / 4) {
        if (diff.y > Application.TILE_SIZE / 2) {
            sprite.animations.currentAnim.name = "up";
            sprite.frame = Application.Player.Frame.UP;
        }
        else if(diff.y < -Application.TILE_SIZE / 2){
            sprite.frame = Application.Player.Frame.DOWN;
            sprite.animations.currentAnim.name = "down";
        }
        else {
            sprite.frame = Application.Player.Frame.RIGHT;
        }
    }
    player.attack(target);
}

function collectItem(player, item){
    console.log(item)
    player.inventory[item.key]++;
    item.destroy();
}

function blocInWater(bloc, tile){
    if (tile.index == 326) {

        map.layers[1].data[tile.y][tile.x].index = 1541;
        map.removeTile(tile.x, tile.y, "Walls");
        bloc.kill();
    }
}

function processAttack(spritePlayer, target) {
    if (!spritePlayer.inCombat) {
        spritePlayer.inCombat = true;
        return true;
    }
    return false;
}

function OpenDoor(player, door){

    if (player.inventory.key) {
        map.removeTile(door.x, door.y, "Objects");
        player.inventory.key--;
    }
}