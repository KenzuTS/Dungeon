Application.Game = function(){}


/* variables global */
    var map, layerWalls, layerGround, layerGroundOverlay, layerBackgroundObject, layerObjects, layerRoof, layerEnnemies, layerPushableBloc;
    var player;
    var cursors;
    var ennemiesGroup, itemsGroup, blocsGroup, menuInvGroup, picsGroup,
        groundGroup, groundOverlayGroup, wallsGroup, backgroundObjectGroup, objectsGroup;
    var gui;
    var inventoryInput, invOpen, menuInv, selectedItem, graphicSelectedItem;
    var repareMode = false;
    var torchs;

Application.Game.prototype = {
 	create : function(){

        console.log("Game Screen");
        game.time.advancedTiming = true;
        game.world.setBounds(-Application.WORLD_SIZE.WIDTH / 2, -Application.WORLD_SIZE.HEIGHT / 2, Application.WORLD_SIZE.WIDTH / 2, Application.WORLD_SIZE.HEIGHT / 2);
        Application.Sounds["sword"] = game.add.audio('sword');
        Application.Sounds["pain"] = game.add.audio('pain');
        Application.Sounds["plouf"] = game.add.audio('plouf');
        Application.Sounds["repare"] = game.add.audio('repare');
        Application.Sounds["heal"] = game.add.audio('heal');
        Application.Sounds["dead"] = game.add.audio('dead');
        Application.Sounds["door"] = game.add.audio('door');
        Application.Sounds["music"] = game.add.audio('music');
        Application.Sounds["music"].loop = true;

        /* MAP */
            game.physics.startSystem(Phaser.Physics.ARCADE);
    
            map = game.add.tilemap('tuto');
            map.addTilesetImage('Cave');
            map.addTilesetImage('Rogue');
            map.addTilesetImage('Wall');
            map.addTilesetImage('Ground0');
            map.addTilesetImage('Floor');
            map.addTilesetImage('Door0');
            map.addTilesetImage('Decor0');
            map.addTilesetImage('Pit0');
            map.addTilesetImage('Chest0');
            map.addTilesetImage('Chest1');
            map.addTilesetImage('LongWep');
            map.addTilesetImage('Shield');
            map.addTilesetImage('Fence');
            map.addTilesetImage('Tile');

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
            map.setCollisionBetween(1, 10000, true, layerWalls);
            map.setCollisionBetween(1, 10000, true, layerObjects);
    
        /* INPUTS */
            cursors = game.input.keyboard.createCursorKeys();
            inventoryInput = game.input.keyboard.addKey(Phaser.KeyCode.I);
            invOpen = false;
            
            //inventoryInput.onDown.add(pause, self);
            inventoryInput.onUp.add(pause, self);

            potionInput = game.input.keyboard.addKey(Phaser.KeyCode.P);


    
        /* GROUPS */

            /* layerGround*/
                groundGroup = game.add.group();
                groundGroup.add(layerGround);

            /* layerGroundOverlay */
                groundOverlayGroup = game.add.group();
                groundOverlayGroup.add(layerGroundOverlay);

            /* layerWalls */
                wallsGroup = game.add.group();
                wallsGroup.add(layerWalls);

            /* layerBackgroundObject */
                backgroundObjectGroup = game.add.group();
                backgroundObjectGroup.add(layerBackgroundObject);

            /* layerObjects */
                objectsGroup = game.add.group();
                objectsGroup.add(layerObjects);

            /* Ennemies */
                ennemiesGroup = game.add.group();
                map.createFromObjects('Ennemies', 2300, 'characters', 10, true, false, ennemiesGroup, Skeleton, false);
                map.createFromObjects('Ennemies', 2342, 'characters', 52, true, false, ennemiesGroup, Bat, false);
                for (var i = 0; i < ennemiesGroup.hash.length; i++) {
                    ennemiesGroup.hash[i].body.setSize(13, 14, 2, 2);
                    ennemiesGroup.hash[i].scale.setTo(Application.SCALE);
                    ennemiesGroup.hash[i].position.x *= Application.SCALE;
                    ennemiesGroup.hash[i].position.y *= Application.SCALE;
                }
    
            /* Items */
                itemsGroup = game.add.group();
                map.createFromObjects('Items', 5329, 'LongWep', 8, true, false, itemsGroup, Weapon,false);
                for (var i = 0; i < itemsGroup.children.length; i++) {
                    itemsGroup.children[i].scale.setTo(Application.SCALE);
                    itemsGroup.children[i].position.x *= Application.SCALE;
                    itemsGroup.children[i].position.y *= Application.SCALE;
                    itemsGroup.children[i].smoothed = false;
                    itemsGroup.children[i].durability = itemsGroup.children[i].maxDurability;
                }

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

            /* Pics */          
                picsGroup = game.add.physicsGroup();
                map.createFromObjects('Trap', 5433, 'pics', 0, true, false, picsGroup);
                for (var i = 0; i < picsGroup.children.length; i++) {
                    picsGroup.children[i].scale.setTo(Application.SCALE);
                    picsGroup.children[i].position.x *= Application.SCALE;
                    picsGroup.children[i].position.y *= Application.SCALE;
                    picsGroup.children[i].smoothed = false;
                    var anim = picsGroup.children[i].animations.add('activate');
                    picsGroup.children[i].animations.play('activate', 1, true, false);
                    anim.onLoop.add(picAnimationLooped, this);
                }

        /* PLAYER */
            
            player = new Player(map.objects.Spawn[0].x * Application.SCALE, map.objects.Spawn[0].y * Application.SCALE);
            game.add.existing(player);
            potionInput.onUp.add(function(){
                this.usePotion(); }
            , player);
    
            // le joueur passe dessous ce layer
            roofGroup = game.add.group();
            layerRoof = map.createLayer('Roof');
            layerRoof.setScale(Application.SCALE);
            layerRoof.smoothed = false;
            roofGroup.add(layerRoof);

        /* INIT MENU */
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

            repare_label = game.add.text(640, 100, 'Repare', { font: '24px Arial', fill: '#fff' });
            repare_label.inputEnabled = true;
            repare_label.events.onInputUp.add(toggleRepareMode);
            menuInvGroup.add(repare_label);

            equip_label = game.add.text(640, 60, 'Equip', { font: '24px Arial', fill: '#fff' });
            equip_label.inputEnabled = true;
            equip_label.events.onInputUp.add(equipItem);
            menuInvGroup.add(equip_label);

            ressource = game.add.sprite(575, 400, 'ressource')
            ressource.scale.setTo(Application.SCALE);
            menuInvGroup.add(ressource);
            menuInvGroup.add(game.add.text(600, 400, ' = ' + Application.REPARE + ' durability',{ font: '24px Arial', fill: '#fff' }));

            var description = game.add.group();
            description.name = "description";
            description.position.setTo(15,250);
            menuInvGroup.add(description);
            /*menuInv.slot = [];
            for (var i = 0; i < 24; i++) {
                menuInv.slot[i] = { x : 16 * Application.SCALE + (i%12) * 64, 
                                    y : 224 * Application.SCALE + 32 + Math.floor(i / 12) * 64 }
            }*/
            menuInvGroup.setAllChildren("visible", false); 
    
        /* CAMERA */
            game.camera.follow(player);
            //game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
    
        /* GUI */
            gui = new GUI();

        /* MUSIC */
            Application.Sounds["music"].play();
    },

	update : function () {

        /* COLLIDE */
            //game.physics.arcade.collide(player, layerWalls);
            game.physics.arcade.collide(player, blocsGroup);
            game.physics.arcade.collide(player, layerObjects, collideObject, null, this);
            game.physics.arcade.collide(player, ennemiesGroup, combatHandler, processAttack, this);
            game.physics.arcade.collide(layerWalls, blocsGroup, blocInWater, null, this);
    
        /* OVERLAP */
            game.physics.arcade.overlap(player, itemsGroup, collectItem,
                function (spritePlayer,item) {
                    return !spritePlayer.inCombat;
                }, this);

            game.physics.arcade.overlap(player, picsGroup, picDamage, null, this);
    
        /* Player Methods */
            //player.move();
            player.moveVelocity();        
            player.percentHP = numberToPercent(player.HP, player.maxHP);   

            for(var ennemy of ennemiesGroup.children.filter(x => x instanceof Skeleton)){
                //console.log(ennemy);
                ennemy.move();
            }
                
    
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

        // game.debug.body(player);
        // game.debug.text(    game.time.fps, Application.Canvas.WIDTH / 2,
        //                     Application.Canvas.HEIGHT / 2 );
    }
}

function combatHandler(sprite, target) {
    if (target.tweenProgress) {
        target.tweenProgress.pause();
    }
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
        if (!item.price || (item.price && player.inventory.ressource >= item.price)) {
            switch (item.key) {
                case "Food":
                    if (item.price) {
                        player.inventory.ressource -= item.price;
                        groundGroup.children.find(x => x.name == item.key).destroy();
                    }
                    player.heal(5);
                    break;
                case "Potion":
                    if (!player.potion) {
                        if (item.price) {
                            player.inventory.ressource -= item.price;
                            groundGroup.children.find(x => x.name == item.key).destroy();
                        }
                        player.potion = true;
                        gui.potionGUI.frame = 22;
                    }
                    break;
                default:
                    player.inventory[item.key]++; 
                    break;
            }
            item.destroy();
        }
    }
    else if (item instanceof Equipement) {
        if (!item.price || (item.price && player.inventory.ressource >= item.price)) {
            if (item.price) {
                player.inventory.ressource -= item.price;
                groundGroup.children.find(x => x.name == item.key).destroy();
            }
            var i = player.inventory.slot.length;
            item.position.x = 16 * Application.SCALE + (i%12) * 64;
            item.position.y = 224 * Application.SCALE + 32 + Math.floor(i / 12) * 64;
            item.anchor.setTo(0.5);
            item.inputEnabled = true;
            item.events.onInputUp.add(function () {
                if (repareMode) {
                    this.repare();
                }
                else {
                  setSelectedItem(this);  
                }
                this.Describe();
            }, item);
            player.inventory.slot.push(item);
            menuInvGroup.add(item);    
        }    
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

    //console.log(tile.index)

    switch(tile.index){

        //statue
        case 5181:
        if (!tile.used) {
            tile.used = true;
            player.heal(999);
        }
        break;

        //closedChest
        case 5386:
        console.log("closedChest 5410 is open");
        break;

        //stairs
        case 5318:
            loadMap(tile.properties.mapName);
        break;

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
            Application.Sounds["door"].play();
            map.removeTile(door.x, door.y, "Objects");
            player.inventory.key--;
        }
    }

    function useForge(player, forge){
        pause();
        repare_label.visible = true;
        toggleRepareMode();
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

        if (!invOpen) {
            invOpen = true;
            player.canWalking = false;
            menuInv.smoothed = false;
            menuInvGroup.setAllChildren("visible", true);
            repare_label.visible = false;
            var x = (Application.Canvas.WIDTH - menuInv.width) / 2;
            var y = (Application.Canvas.HEIGHT - menuInv.height) / 2;
            menuInvGroup.position.x = -game.camera.world.position.x + x;
            menuInvGroup.position.y = -game.camera.world.position.y + y;

        }
        else {
            returnToGame();
        }
}

function returnToGame(){
    invOpen = false;
    selectedItem = null;
    player.canWalking = true;
    game.input.onDown.remove(checkClick, game);
    menuInvGroup.setAllChildren("visible", false);
    game.paused = false;

    document.body.style.cursor = 'auto';
    repareMode = false;
}

function toggleRepareMode(){
    repareMode = !repareMode;
    if (repareMode) {
        document.body.style.cursor = 'url(assets/hammer.png) 2 2, pointer';
    } else {
        document.body.style.cursor = 'auto';
    }
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
               tempPos = { x : selectedItem.position.x , y : selectedItem.position.y };
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
                temp.position = tempPos;
                player.inventory.slot[index] = temp;
            }
            else {
                player.inventory.slot.splice(index, 1);
            }
            menuInvGroup.remove(graphicSelectedItem);
        }
    }
}

function loadMap(mapName){
    // vider groups
            groundGroup.removeAll();
            groundGroup.remove();
            groundOverlayGroup.removeAll();
            wallsGroup.removeAll();
            backgroundObjectGroup.removeAll();
            objectsGroup.removeAll();

            ennemiesGroup.removeAll();
            itemsGroup.removeAll();
            blocsGroup.removeAll();
            roofGroup.removeAll();
            picsGroup.removeAll();

        // create map
            map = game.add.tilemap(mapName);
            map.addTilesetImage('Cave');
            map.addTilesetImage('Rogue');
            map.addTilesetImage('Wall');
            map.addTilesetImage('Ground0');
            map.addTilesetImage('Floor');
            map.addTilesetImage('Door0');
            map.addTilesetImage('Decor0');
            map.addTilesetImage('Pit0');
            map.addTilesetImage('Chest0');
            map.addTilesetImage('Chest1');
            map.addTilesetImage('LongWep');
            map.addTilesetImage('Shield');
            map.addTilesetImage('Fence');
            map.addTilesetImage('Tile');
            map.addTilesetImage('Food');

    
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
            map.setCollisionBetween(1, 10000, true, layerWalls);
            map.setCollisionBetween(1, 10000, true, layerObjects);

        // reremplir groups
            groundGroup.add(layerGround);
            groundOverlayGroup.add(layerGroundOverlay);
            wallsGroup.add(layerWalls);
            backgroundObjectGroup.add(layerBackgroundObject);
            objectsGroup.add(layerObjects);

            map.createFromObjects('Ennemies', 2300, 'characters', 10, true, false, ennemiesGroup, Skeleton, false);
            map.createFromObjects('Ennemies', 2342, 'characters', 52, true, false, ennemiesGroup, Bat, false);
            map.createFromObjects('Ennemies', 2345, 'characters', 52, true, false, ennemiesGroup, Boo, false);

            for (var i = 0; i < ennemiesGroup.hash.length; i++) {
                ennemiesGroup.hash[i].body.setSize(13, 14, 2, 2);
                ennemiesGroup.hash[i].scale.setTo(Application.SCALE);
                ennemiesGroup.hash[i].position.x *= Application.SCALE;
                ennemiesGroup.hash[i].position.y *= Application.SCALE;
            }

            map.createFromObjects('Items', 5329, 'LongWep', 8, true, false, itemsGroup, Weapon,false);
            map.createFromObjects('Items', 5435, 'Potion', 0, true, false, itemsGroup, Potion, false);
            map.createFromObjects('Items', 5378, 'Shield', 1, true, false, itemsGroup, Shield, false);
            map.createFromObjects('Items', 5333, 'LongWep', 12, true, false, itemsGroup, Weapon,false);
            map.createFromObjects('Items', 5491, 'Food', 16, true, false, itemsGroup, Item, false);
            var el, group;
            for (var i = 0; i < itemsGroup.children.length; i++) {
                el = itemsGroup.children[i];
                el.scale.setTo(Application.SCALE);
                el.position.x *= Application.SCALE;
                el.position.y *= Application.SCALE;
                el.smoothed = false;
                el.durability = el.maxDurability;
                if (el.price) {
                    //posY = (el.anchor.y) ? 0 : Application.TILE_SIZE * Application.SCALE;
                    group = game.add.group();
                    group.name = el.key;
                    group.add(game.add.text(el.position.x, el.position.y, el.price ,{ font: '12px Arial', fill: '#fff' }));
                    group.add(game.add.sprite(el.position.x + 16, el.position.y, 'ressource'));
                    groundGroup.add(group);
                }
            }

            map.createFromObjects('PushableBloc', 1186, 'bloc', 0, true, false, blocsGroup);
            for (var i = 0; i < blocsGroup.hash.length; i++) {
                blocsGroup.hash[i].body.mass = -100;
                blocsGroup.hash[i].body.setSize(13, 14, 2, 2);
                blocsGroup.hash[i].scale.setTo(Application.SCALE);
                blocsGroup.hash[i].position.x *= Application.SCALE;
                blocsGroup.hash[i].position.y *= Application.SCALE;
                blocsGroup.hash[i].smoothed = false;
            }

            map.createFromObjects('Trap', 5433, 'pics', 0, true, false, picsGroup);
            for (var i = 0; i < picsGroup.children.length; i++) {
                picsGroup.children[i].scale.setTo(Application.SCALE);
                picsGroup.children[i].position.x *= Application.SCALE;
                picsGroup.children[i].position.y *= Application.SCALE;
                picsGroup.children[i].smoothed = false;
                var anim = picsGroup.children[i].animations.add('activate');
                picsGroup.children[i].animations.play('activate', 1, true, false);
                anim.onLoop.add(picAnimationLooped, this);
            }

            layerRoof = map.createLayer('Roof');
            layerRoof.setScale(Application.SCALE);
            layerRoof.smoothed = false;
            roofGroup.add(layerRoof);                 

        player.position.x = map.objects.StartPoint[0].x * Application.SCALE;
        player.position.y = map.objects.StartPoint[0].y * Application.SCALE;
}

var canPicDamage = true;
function picDamage(player, pic){
    if (pic.frame == 1 && canPicDamage) {
        player.setHP(player.HP - 20);
        canPicDamage = false;
    }
}

function picAnimationLooped(sprite, animation){

    canPicDamage = true;
}