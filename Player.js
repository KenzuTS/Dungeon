function Player(x, y, scale){
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.sprite = null;
	this.tween;
	this.disX = 0;
	this.distY = 0;

	this.Awake = function(){

		this.sprite = game.add.sprite(this.x, this.y, 'characters', 1);
		this.sprite.scale.set(this.scale);
	    this.sprite.smoothed = false;

	    this.sprite.animations.add('down', [0,1,2], 10, true);
	    this.sprite.animations.add('left', [12,13,14], 10, true);
	    this.sprite.animations.add('right', [24,25,26], 10, true);
	    this.sprite.animations.add('up', [36,37,38], 10, true);

	    this.tween = game.add.tween(this.sprite).to( { x: this.x + this.distX, y: this.y + this.distY }, 1000, "Quart.easeIn");
	}
	

    this.move = function(){

    	this.sprite.body.velocity.set(0);
	
    	if (cursors.down.isDown)
    	{
    	    this.sprite.play('down');
    	    this.sprite.body.velocity.y = 200;
    	}
	
    	else if (cursors.left.isDown)
    	{
    	    this.sprite.play('left');
    	    this.sprite.body.velocity.x = -200;
    	}
	
    	else if (cursors.right.isDown)
    	{
    	    this.sprite.play('right');
    	    this.sprite.body.velocity.x = 200;
    	}
	
    	else if (cursors.up.isDown)
    	{
    	    this.sprite.play('up');
    	    this.sprite.body.velocity.y = -200;
    	}
	
    	if (cursors.down.isUp && cursors.left.isUp && cursors.right.isUp && cursors.up.isUp)
    	{
    	    switch(this.sprite.animations.currentAnim.name){
	
    	        case "down":
    	            this.sprite.animations.stop();
    	            this.sprite.frame = 1;
    	        break;
	
    	        case "left":
    	            this.sprite.animations.stop();
    	            this.sprite.frame = 13;
    	        break;
	
    	        case "right":
    	            this.sprite.animations.stop();
    	            this.sprite.frame = 25;
    	        break;
	
    	        case "up":
    	            this.sprite.animations.stop();
    	            this.sprite.frame = 37;
    	        break;
    	    }
    	}
    }

    this.Awake();
}