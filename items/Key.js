function Key(x, y){
	Item.call(this, game, x, y, 'key');

	this.Awake = function () {
		
	}

	this.Awake();
}

Key.prototype = Object.create(Item.prototype);
Key.prototype.constructor = Key;