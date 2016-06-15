function Bat(x, y, scale){
	Etre.call(this, x, y, scale);
	this.idDeadTexture = 8;
/*	this.x = x;
	this.y = y;
	this.scale = scale;*/
	this.sprite = null;

	this.Awake = function(){

		this.sprite = game.add.sprite(this.initPosX, this.initPosY, 'characters', 52);
		this.sprite.scale.set(this.scale);
	    this.sprite.smoothed = false;

	    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	    this.sprite.body.collideWorldBounds = true;

	    this.sprite.animations.add('down', [51,52,53], 6, true);
	    this.sprite.animations.add('left', [63,64,65], 6, true);
	    this.sprite.animations.add('right', [75,76,77], 6, true);
	    this.sprite.animations.add('up', [87,88,89], 6, true);

	    this.sprite.etre = this;
	    this.sprite.play('down');
	}

	// TODO
	this.kill = function(){
		Etre.prototype.kill.call(this);
		var ressource = new Ressource(this.sprite.position.x, this.sprite.position.y)
		itemsGroup.add(ressource.sprite);
		//this.sprite.kill();
	}

    this.Awake();
}