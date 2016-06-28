function Bat(game, x, y, key, frame){
	Etre.call(this, game, x, y, key, frame);
	this.idDeadTexture = 8;

	this.Awake = function(){

	    this.animations.add('down', [51,52,53], 6, true);
	    this.animations.add('left', [63,64,65], 6, true);
	    this.animations.add('right', [75,76,77], 6, true);
	    this.animations.add('up', [87,88,89], 6, true);

	    this.play('down');
	}

    this.Awake();
}

Bat.prototype = Object.create(Etre.prototype);
Bat.prototype.constructor = Bat;