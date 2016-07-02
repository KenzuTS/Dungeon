function Potion(game, x, y, key, frame){
	Item.call(this, game, x, y, key, frame);

	this.Awake = function () {
		
	}

	this.Awake();
}

Potion.prototype = Object.create(Item.prototype);
Potion.prototype.constructor = Potion;