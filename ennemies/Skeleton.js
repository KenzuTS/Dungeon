function Skeleton(x, y, scale){
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.sprite = null;

	this.Awake = function(){

		this.sprite = game.add.sprite(this.x, this.y, 'characters', 10);
		this.sprite.scale.set(this.scale);
	    this.sprite.smoothed = false;

	    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	    this.sprite.body.collideWorldBounds = true;

	    this.sprite.animations.add('down', [9,10,11], 6, true);
	    this.sprite.animations.add('left', [21,22,23], 6, true);
	    this.sprite.animations.add('right', [33,34,35], 6, true);
	    this.sprite.animations.add('up', [45,46,47], 6, true);

	    this.sprite.play('down');
	}

	this.kill = function(){

		var key = new Key(this.sprite.position.x, this.sprite.position.y)
		itemsGroup.add(key.sprite);
		this.sprite.kill();
	}

    this.Awake();
}