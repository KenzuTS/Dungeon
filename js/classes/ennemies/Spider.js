function Spider(x, y, scale){

	Etre.call(this, x, y, scale);
	this.idDeadTexture = 10;
/*	this.x = x;
	this.y = y;
	this.scale = scale;*/
	this.sprite = null;

	this.Awake = function(){


	    this.sprite.animations.add('down', [57,58,59], 6, true);
	    this.sprite.animations.add('left', [69,70,71], 6, true);
	    this.sprite.animations.add('right', [81,82,83], 6, true);
	    this.sprite.animations.add('up', [93,94,95], 6, true);

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