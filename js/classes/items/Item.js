function Item(game, x, y, key, frame){
	Phaser.Sprite.call(this, game, x, y, key, frame);

	this.Awake = function () {

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.scale.setTo(Application.SCALE);
		//this.anchor.setTo(0.5);
		this.smoothed = false;
		this.body.setSize(13, 14, 2, 2);
	}

	this.Awake();
}

Item.prototype = Object.create(Phaser.Sprite.prototype);
Item.prototype.constructor = Item;
