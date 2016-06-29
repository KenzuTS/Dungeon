Application.Preload = function(){}

Application.Preload.prototype = {
	preload : function () {
		console.log("Preload preload");
		//game.load.tilemap('map', 'assets/tilemaps/json/dungeonTest.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.tilemap('tuto', 'assets/tilemaps/json/tuto.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.tilemap('floor2', 'assets/tilemaps/json/floor2.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.image('Cave', 'assets/roguelike-cave-pack/Spritesheet/roguelikeDungeon_transparent.png');
	    game.load.image('Rogue', 'assets/roguelike-pack/Spritesheet/roguelikeSheet_transparent.png');

	    game.load.image('Wall', 'assets/DawnLike/Objects/Wall.png');
	    game.load.image('Ground0','assets/DawnLike/Objects/Ground0.png');
	    game.load.image('Floor', 'assets/DawnLike/Objects/Floor.png');
	    game.load.image('Door0', 'assets/DawnLike/Objects/Door0.png');
	    game.load.image('Decor0', 'assets/DawnLike/Objects/Decor0.png');
	    game.load.image('Pit0', 'assets/DawnLike/Objects/Pit0.png');
	    game.load.image('Fence', 'assets/DawnLike/Objects/Fence.png');
	    game.load.image('Tile', 'assets/DawnLike/Objects/Tile.png');

	    game.load.image('key', 'assets/DawnLike/Items/Key.png');
	    game.load.image('ressource', 'assets/DawnLike/Items/Rock.png');
	    game.load.image('interface', 'assets/DawnLike/GUI/interface.png');

	    game.load.spritesheet('Chest0', 'assets/DawnLike/Items/Chest0.png', Application.TILE_SIZE, Application.TILE_SIZE);
	    game.load.spritesheet('Chest1', 'assets/DawnLike/Items/Chest1.png', Application.TILE_SIZE, Application.TILE_SIZE);
	    game.load.spritesheet('LongWep', 'assets/DawnLike/Items/LongWep.png', Application.TILE_SIZE, Application.TILE_SIZE);
	    game.load.spritesheet('Shield', 'assets/DawnLike/Items/Shield.png', Application.TILE_SIZE, Application.TILE_SIZE);
	    game.load.spritesheet('Food', 'assets/DawnLike/Items/Food.png', Application.TILE_SIZE, Application.TILE_SIZE);
	    game.load.spritesheet('Potion', 'assets/DawnLike/Items/Potion.png', Application.TILE_SIZE, Application.TILE_SIZE);
	    game.load.spritesheet('sword', 'assets/DawnLike/GUI/sword.png', Application.TILE_SIZE, Application.TILE_SIZE);
	    game.load.spritesheet('shield', 'assets/DawnLike/GUI/shield.png', Application.TILE_SIZE, Application.TILE_SIZE);
	    game.load.spritesheet('bloc', 'assets/DawnLike/Objects/bloc.png', Application.TILE_SIZE, Application.TILE_SIZE);
	    game.load.spritesheet('bloc', 'assets/DawnLike/Objects/bloc.png', Application.TILE_SIZE, Application.TILE_SIZE);
		game.load.spritesheet('characters', 'assets/Characters/characters.png', Application.TILE_SIZE, Application.TILE_SIZE);
	    game.load.spritesheet('dead', 'assets/Characters/dead.png', Application.TILE_SIZE, Application.TILE_SIZE);
	    game.load.spritesheet('pics', 'assets/DawnLike/Objects/pics.png', Application.TILE_SIZE, Application.TILE_SIZE);

	    game.load.audio('pain', 'assets/audio/Hurt.wav');
	    game.load.audio('sword', 'assets/audio/Sword.wav');
	    game.load.audio('repare', 'assets/audio/repare.wav');
	    game.load.audio('plouf', 'assets/audio/PLOUF.wav');
	    game.load.audio('heal', 'assets/audio/Heal.wav');
	    game.load.audio('dead', 'assets/audio/Dying.wav');
	    game.load.audio('door', 'assets/audio/Door.wav');
	    game.load.audio('music', 'assets/audio/music.mp3');

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
	},

	create : function(){
		console.log("Preload finished");
		this.game.state.start("Game");
	}
};