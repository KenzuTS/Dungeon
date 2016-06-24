Application.Preload = function(){}

Application.Preload.prototype = {
	preload : function () {
		console.log("Preload preload");
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
	},

	create : function(){
		console.log("Preload finished");
		this.game.state.start("Game");
	}
};