function Item(game, x, y, key, frame){
	Phaser.Sprite.call(this, game, x, y, key, frame);

	this.Awake = function () {

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.scale.setTo(Application.SCALE);
		//this.anchor.setTo(0.5);
		this.anchor.setTo(0,1);
		this.smoothed = false;
		this.body.setSize(13, 14, 2, 2);
		switch (key) {
			case "Potion":
				this.restoreHP = 20;
				break;
			default:
				this.restoreHP = 5;
				break;
		}
	}

	this.Awake();
}

Item.prototype = Object.create(Phaser.Sprite.prototype);
Item.prototype.constructor = Item;
