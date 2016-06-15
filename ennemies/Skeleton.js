function Skeleton(x, y, scale){

	Etre.call(this, x, y, scale);
	this.idDeadTexture = 6;
/*	this.x = x;
	this.y = y;
	this.scale = scale;*/
	this.sprite = null;

	this.Awake = function(){

		this.sprite = game.add.sprite(this.initPosX, this.initPosY, 'characters', 10);
		this.sprite.scale.set(this.scale);
	    this.sprite.smoothed = false;

	    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	    this.sprite.body.collideWorldBounds = true;

	    this.sprite.animations.add('down', [9,10,11], 6, true);
	    this.sprite.animations.add('left', [21,22,23], 6, true);
	    this.sprite.animations.add('right', [33,34,35], 6, true);
	    this.sprite.animations.add('up', [45,46,47], 6, true);

	    this.sprite.etre = this;
	    //this.sprite.play('down');
	}

	// TODO
	this.kill = function(){
		Etre.prototype.kill.call(this);
		var key = new Key(this.sprite.position.x, this.sprite.position.y)
		itemsGroup.add(key.sprite);
		//this.sprite.kill();
	}

    this.Awake();
}