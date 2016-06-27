function Ressource(x, y){
	Item.call(this, game, x, y, 'ressource');

	this.Awake = function () {
		
	}

	this.Awake();
}

Ressource.prototype = Object.create(Item.prototype);
Ressource.prototype.constructor = Ressource;