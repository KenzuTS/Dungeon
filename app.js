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
    game.load.image('interface', 'assets/DawnLike/GUI/interface.png');

    game.load.spritesheet('sword', 'assets/DawnLike/GUI/sword.png', Application.TILE_SIZE, Application.TILE_SIZE);
    game.load.spritesheet('shield', 'assets/DawnLike/GUI/shield.png', Application.TILE_SIZE, Application.TILE_SIZE);
    game.load.spritesheet('bloc', 'assets/DawnLike/Objects/bloc.png', Application.TILE_SIZE, Application.TILE_SIZE);
	game.load.spritesheet('characters', 'assets/Characters/characters.png', Application.TILE_SIZE, Application.TILE_SIZE);
    game.load.spritesheet('dead', 'assets/Characters/dead.png', Application.TILE_SIZE, Application.TILE_SIZE);

    game.load.audio('pain', 'assets/audio/pain.ogg');
    game.load.audio('sword', 'assets/audio/ZBOUB.wav');
    game.load.audio('repare', 'assets/audio/repare.wav');
    game.load.audio('plouf', 'assets/audio/PLOUF.wav');
}

/* variables global */
    var hero;
    var map, layerWalls, layerGround, layerGroundOverlay, layerBackgroundObject, layerObjects, layerRoof, layerEnnemies, layerPushableBloc;
    var player;
    var cursors;
    var ennemiesGroup, itemsGroup, blocsGroup, menuInvGroup;
    var gui;
    var inventoryInput, invOpen, menuInv, selectedItem, graphicSelectedItem;
    var repareMode = false;

function create() {

    game.time.advancedTiming = true;
    game.world.setBounds(-Application.WORLD_SIZE.WIDTH / 2, -Application.WORLD_SIZE.HEIGHT / 2,Application.WORLD_SIZE.WIDTH / 2, Application.WORLD_SIZE.HEIGHT / 2);
    Application.Sounds["sword"] = game.add.audio('sword');
    Application.Sounds["pain"] = game.add.audio('pain');
    Application.Sounds["plouf"] = game.add.audio('plouf');

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
        inventoryInput = game.input.keyboard.addKey(Phaser.KeyCode.I);
        invOpen = false;
        
        inventoryInput.onDown.add(pause, self);
        inventoryInput.onUp.add(pause, self);

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
        gui = new GUI();

    /* GROUPS */
        /* Ennemies */
            ennemiesGroup = game.add.group();
            map.createFromObjects('Ennemies', 2300, 'characters', 10, true, false, ennemiesGroup, Skeleton);
            map.createFromObjects('Ennemies', 2342, 'characters', 52, true, false, ennemiesGroup, Bat);
            for (var i = 0; i < ennemiesGroup.hash.length; i++) {

                ennemiesGroup.hash[i].body.setSize(13, 14, 2, 2);
                ennemiesGroup.hash[i].scale.setTo(Application.SCALE);
                ennemiesGroup.hash[i].position.x *= Application.SCALE;
                ennemiesGroup.hash[i].position.y *= Application.SCALE;
            }

        /* Items */
            itemsGroup = game.add.group();

        /* Blocs */
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

        /* INIT */
            menuInv = game.add.sprite(0, 0, 'interface');
            menuInv.scale.setTo(Application.SCALE);
            menuInv.smoothed = false;
            var x = (Application.Canvas.WIDTH - menuInv.width) / 2;
            var y = (Application.Canvas.HEIGHT - menuInv.height) / 2;

            menuInvGroup = game.add.group();
            menuInvGroup.position.x = -game.camera.world.position.x + x;
            menuInvGroup.position.y = -game.camera.world.position.y + y;

            menuInvGroup.add(menuInv);

             back_label = game.add.text(640, 20, 'Back', { font: '24px Arial', fill: '#fff' });
            back_label.inputEnabled = true;
            back_label.events.onInputUp.add(returnToGame);
            menuInvGroup.add(back_label);

            repare_label = game.add.text(640, 60, 'Repare', { font: '24px Arial', fill: '#fff' });
            repare_label.inputEnabled = true;
            repare_label.events.onInputUp.add(toggleRepareMode);
            menuInvGroup.add(repare_label);

            equip_label = game.add.text(640, 100, 'Equip', { font: '24px Arial', fill: '#fff' });
            equip_label.visible = false;
            equip_label.inputEnabled = true;
            equip_label.events.onInputUp.add(equipItem);
            menuInvGroup.add(equip_label);

            var description = game.add.group();
            description.name = "description";
            description.position.setTo(15,250);
            menuInvGroup.add(description);
/*            menuInv.slot = [];
            for (var i = 0; i < 24; i++) {
                menuInv.slot[i] = { x : 16 * Application.SCALE + (i%12) * 64, 
                                    y : 224 * Application.SCALE + 32 + Math.floor(i / 12) * 64 }
            }*/
            //menuInvGroup.setAllChildren("visible", false);
}

function update() {

    /* COLLIDE */
        game.physics.arcade.collide(player, layerWalls);
        game.physics.arcade.collide(player, blocsGroup);
        game.physics.arcade.collide(player, layerObjects, collideObject, null, this);
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
        player.percentHP = numberToPercent(player.HP, player.maxHP);        

    /* GUI UPDATE */
        for(var i in player.equipement){
            if (player.equipement[i]) {
                player.equipement[i].percentDurability = numberToPercent(player.equipement[i].durability, player.equipement[i].maxDurability);
                setEquipementStatus(player.equipement[i]); 
            }
        }

        gui.healthBar.setPercent(player.percentHP);
        gui.textHP.text = player.HP + " / " + player.maxHP;
        gui.textKey.text = player.inventory.key;
        gui.textRessource.text = player.inventory.ressource;
}

function render() {
    game.debug.body(player);
    game.debug.text(game.time.fps, Application.Canvas.WIDTH / 2,
         Application.Canvas.HEIGHT / 2);
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
    target.body.velocity.set(0);
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
    if (item instanceof Item) {
        player.inventory[item.key]++; 
        item.destroy();
    }
    else if (item instanceof Equipement) {
        var i = player.inventory.slot.length;
        item.position.x = 16 * Application.SCALE + (i%12) * 64;
        item.position.y = 224 * Application.SCALE + 32 + Math.floor(i / 12) * 64;
        item.inputEnabled = true;
        item.events.onInputUp.add(function () {
            setSelectedItem(this);
            this.Describe();
        }, item);
        player.inventory.slot.push(item);

        menuInvGroup.add(item);
        
    }
    
}

function blocInWater(bloc, tile){
    if (tile.index == 326) {
        Application.Sounds["plouf"].play();
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

function collideObject(player, tile){

    switch(tile.index){

        // gold closed door
        case 4973:
        openDoor(player, tile);
        break;

        // enclume
        case 538:
        useForge(player, tile);
        break;
    }

    function openDoor(player, door){

        if (player.inventory.key) {
            map.removeTile(door.x, door.y, "Objects");
            player.inventory.key--;
        }
    }

    function useForge(player, forge){
        console.log("use forge");
    }
}

function setEquipementStatus(equipement){

    switch(equipement.constructor){

        case Shield:
        setGUIStatus(equipement, gui.shieldGUI);
        break;

        case Weapon:
        setGUIStatus(equipement, gui.swordGUI);
        break;
    }

    function setGUIStatus(equipement, guiElem) {

        if (equipement.break) {
            guiElem.frame = 1;
            guiElem.visible = true;
            guiElem.tint = "0xff0000";
        }
        else if (equipement.percentDurability <= 10) {
            guiElem.visible = true;
            guiElem.tint = "0xff0000";
        }
        else if (equipement.percentDurability <= 50) {

            guiElem.visible = true;
            guiElem.tint = "0xffb000";
        }
    }
}

function numberToPercent(number, max){

    return (number / max) * 100;
}

function pause(event){

    if (inventoryInput.isDown) {
        if (!invOpen) {
            invOpen = true;
            menuInv.smoothed = false;
            menuInvGroup.setAllChildren("visible", true);
            var x = (Application.Canvas.WIDTH - menuInv.width) / 2;
            var y = (Application.Canvas.HEIGHT - menuInv.height) / 2;

            menuInvGroup.position.x = -game.camera.world.position.x + x;
            menuInvGroup.position.y = -game.camera.world.position.y + y;

        }
        else {
            returnToGame();
        }
    }
}

function returnToGame(){
    invOpen = false;
    selectedItem = null;
    game.input.onDown.remove(checkClick, game);
    menuInvGroup.setAllChildren("visible", false);
    this.game.canvas.style.cursor = "default";
    game.paused = false;
}

function toggleRepareMode(){
    repareMode = !repareMode;
    console.log(repareMode);
}

function checkClick(event) {
    if (invOpen) {
        var x1 = menuInvGroup.position.x + 576, x2 = menuInvGroup.position.x + 768,
            y1 = menuInvGroup.position.y, y2 = menuInvGroup.position.y + 80;

        var x = event.x + Math.abs(game.camera.world.position.x),
            y = event.y + Math.abs(game.camera.world.position.y);

        if (x > x1 && x < x2 && y > y1 && y < y2) {
            if (y - y1 < 40) {
                returnToGame();
            }else if (y - y1 < 80) {
                toggleRepareMode();
            }
        }
    }
}

function setSelectedItem(value){
    if (selectedItem == value) {
        selectedItem = null;
        menuInvGroup.remove(graphicSelectedItem);
    }
    else {
        selectedItem = value;
        menuInvGroup.remove(graphicSelectedItem);
        
        if (value != null) {
            graphicSelectedItem = game.add.graphics(selectedItem.x -  Application.TILE_SIZE * Application.SCALE , selectedItem.y - Application.TILE_SIZE * Application.SCALE);
            graphicSelectedItem.lineStyle(2, 0xffd900, 1);
            graphicSelectedItem.drawRect(0,0, Application.TILE_SIZE * Application.SCALE * 2, Application.TILE_SIZE * Application.SCALE* 2);
            menuInvGroup.add(graphicSelectedItem);
        }
    }
}
function equipItem(){
    if (selectedItem && selectedItem != player.equipement.weapon && selectedItem != player.equipement.shield) {
        if (selectedItem instanceof Equipement) {
            var temp, tempPos;
            if (selectedItem instanceof Weapon)
            {
               temp = player.equipement.weapon;
               player.equipement.weapon = selectedItem;
               player.equipement.weapon.position.x = 192;
               player.equipement.weapon.position.y = 176;

            }
            else if(selectedItem instanceof Shield) {
                temp = player.equipement.shield;
                player.equipement.shield = selectedItem;
                player.equipement.shield.position.x = 192 + 186;
                player.equipement.shield.position.y = 176;
            }
            var index = player.inventory.slot.indexOf(selectedItem);
            if (temp != null) {
                player.inventory.slot[index] = temp;
            }
            menuInvGroup.remove(graphicSelectedItem);
        }
    }
}
