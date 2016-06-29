function Boo(game, x, y, key, frame){
	Etre.call(this, game, x, y, key, frame);
	this.idDeadTexture = 9;

	this.Awake = function(){

	    this.animations.add('down', [54,55,56], 6, true);
	    this.animations.add('left', [66,67,68], 6, true);
	    this.animations.add('right', [78,79,80], 6, true);
	    this.animations.add('up', [90,91,92], 6, true);

	    this.play('down');
	}

    this.Awake();
}

Boo.prototype = Object.create(Etre.prototype);
Boo.prototype.constructor = Boo;