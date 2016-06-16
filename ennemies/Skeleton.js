function Skeleton(game, x, y, key, frame){
	Etre.call(this, game, x, y, key, frame);
	this.idDeadTexture = 6;
	//this.sprite = null;

	this.Awake = function(){

		//this.sprite = game.add.sprite(this.initPosX, this.initPosY, 'characters', 10);
		//this.sprite.scale.set(Application.SCALE);
		this.scale.set(Application.SCALE);
	    this.smoothed = false;

	    game.physics.enable(this, Phaser.Physics.ARCADE);
	    this.body.collideWorldBounds = true;

	    this.animations.add('down', [9,10,11], 6, true);
	    this.animations.add('left', [21,22,23], 6, true);
	    this.animations.add('right', [33,34,35], 6, true);
	    this.animations.add('up', [45,46,47], 6, true);

	    //this.sprite.play('down');
	}

	// TODO
	this.onDead = function(){
		Etre.prototype.onDead.call(this);
		Application.key = new Key(this.position.x, this.position.y);
		itemsGroup.add(Application.key.sprite);
		//this.sprite.kill();
	}

    this.Awake();
}

Skeleton.prototype = Object.create(Etre.prototype);
Skeleton.prototype.constructor = Skeleton;