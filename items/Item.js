function Item(game, x, y, key, frame){
	Phaser.Sprite.call(this, game, x, y, key, frame);

	this.Awake = function () {
		this.scale.setTo(Application.SCALE);
		this.smoothed = false;
	}

	this.Awake();
}

Item.prototype = Object.create(Phaser.Sprite.prototype);
Item.prototype.constructor = Item;
