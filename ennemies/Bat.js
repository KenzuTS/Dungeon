function Bat(game, x, y, key, frame){
	Etre.call(this, game, x, y, key, frame);
	this.idDeadTexture = 8;

	this.Awake = function(){

	    this.smoothed = false;

	    game.physics.enable(this, Phaser.Physics.ARCADE);
	    this.body.collideWorldBounds = true;

	    this.animations.add('down', [51,52,53], 6, true);
	    this.animations.add('left', [63,64,65], 6, true);
	    this.animations.add('right', [75,76,77], 6, true);
	    this.animations.add('up', [87,88,89], 6, true);

	    this.play('down');
	}

	// TODO
	this.onDead = function(){
		Etre.prototype.onDead.call(this);
		var ressource = new Ressource(this.position.x, this.position.y)
		itemsGroup.add(ressource.sprite);
		//this.sprite.kill();
	}

    this.Awake();
}

Bat.prototype = Object.create(Etre.prototype);
Bat.prototype.constructor = Bat;