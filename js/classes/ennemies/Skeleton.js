function Skeleton(game, x, y, key, frame){
	Etre.call(this, game, x, y, key, frame);
	this.idDeadTexture = 6;

	this.Awake = function(){

	    this.animations.add('down', [9,10,11], 6, true);
	    this.animations.add('left', [21,22,23], 6, true);
	    this.animations.add('right', [33,34,35], 6, true);
	    this.animations.add('up', [45,46,47], 6, true);

	    //this.play('down');
	}

    this.Awake();
}

Skeleton.prototype = Object.create(Etre.prototype);
Skeleton.prototype.constructor = Skeleton;