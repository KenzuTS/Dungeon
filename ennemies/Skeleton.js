function Skeleton(x, y, scale){
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.sprite = null;
	this.tween;
	this.distX = x;
	this.distY = y;
	this.isWalking = false;

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

    this.move = function(){
	
		if (!this.isWalking) {

	    	if (cursors.down.isDown)
	    	{
	    		this.isWalking = true;
	    	    this.sprite.play('down');
	    	    this.distY = this.sprite.position.y + 16 * this.scale;
	    	    this.tween = game.add.tween(this.sprite).to( { x: this.distX, y: this.distY }, 300);
	    		this.tween.start();
	    	}
		
	    	else if (cursors.left.isDown)
	    	{
	    		this.isWalking = true;
	    	    this.sprite.play('left');
	    	    this.distX = this.sprite.position.x - 16 * this.scale;
	    	    this.tween = game.add.tween(this.sprite).to( { x: this.distX, y: this.distY }, 300);
	    		this.tween.start();
	    	}
		
	    	else if (cursors.right.isDown)
	    	{
	    		this.isWalking = true;
	    	    this.sprite.play('right');
	    	    this.distX = this.sprite.position.x + 16 * this.scale;
	    	    this.tween = game.add.tween(this.sprite).to( { x: this.distX, y: this.distY }, 300);
	    		this.tween.start();
	    	}
		
	    	else if (cursors.up.isDown)
	    	{
	    		this.isWalking = true;
	    	    this.sprite.play('up');
	    	    this.distY = this.sprite.position.y - 16 * this.scale;
	    	    this.tween = game.add.tween(this.sprite).to( { x: this.distX, y: this.distY }, 300);
	    		this.tween.start();
	    	}
		}
	
		// stop animations
    	if (this.sprite.position.x == this.distX && this.sprite.position.y == this.distY)
    	{
    	    this.isWalking = false;

    	    if (cursors.down.isUp && cursors.left.isUp && cursors.right.isUp && cursors.up.isUp) {

    	    	switch(this.sprite.animations.currentAnim.name){
		
    	    	    case "down":
    	    	        this.sprite.animations.stop();
    	    	        this.sprite.frame = 4;
    	    	    break;
		
    	    	    case "left":
    	    	        this.sprite.animations.stop();
    	    	        this.sprite.frame = 16;
    	    	    break;
		
    	    	    case "right":
    	    	        this.sprite.animations.stop();
    	    	        this.sprite.frame = 28;
    	    	    break;
		
    	    	    case "up":
    	    	        this.sprite.animations.stop();
    	    	        this.sprite.frame = 40;
    	    	    break;
    	    	}
    	    }
    	}
    }

    this.Awake();
}