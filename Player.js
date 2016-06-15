function Player(x, y, scale){
	Etre.call(this, x, y, scale);
/*	this.initPosX = x;
	this.initPosY = y;
	this.scale = scale;*/
	this.sprite = null;
	this.tween;
	this.distX = x;
	this.distY = y;
	this.isWalking = false;
	this.idDeadTexture = 1;
	this.damage = {
		min : 20,
		max : 30
	}

	this.Awake = function(){

		this.sprite = game.add.sprite(this.initPosX, this.initPosY, 'characters', 4);
		this.sprite.scale.set(this.scale);
	    this.sprite.smoothed = false;

	    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	    this.sprite.body.collideWorldBounds = true;

	    this.sprite.animations.add('down', [3,4,5], 10, true);
	    this.sprite.animations.add('left', [15,16,17], 10, true);
	    this.sprite.animations.add('right', [27,28,29], 10, true);
	    this.sprite.animations.add('up', [39,40,41], 10, true);

	    this.sprite.etre = this;
	    this.tween = game.add.tween(this.sprite).to( { x: this.distX, y: this.distY }, 300);
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

    this.moveVelocity = function(){
    	this.sprite.body.velocity.set(0);
    	if (!this.inCombat) {

	 		if (cursors.up.isDown)
	    	{
	    	    this.sprite.body.velocity.y = -75;
	    	    this.sprite.play('up');
	    	}
	    	else if (cursors.down.isDown)
	    	{
	    	    this.sprite.body.velocity.y = 75;
	    	    this.sprite.play('down');
	    	}

	    	if (cursors.left.isDown)
	    	{
	    	    this.sprite.body.velocity.x = -75;
	    	    if (!cursors.up.isDown && !cursors.down.isDown) {
	    	    	this.sprite.play('left');
	    	    }
	    	    
	    	}
	    	else if (cursors.right.isDown)
	    	{
	    	    this.sprite.body.velocity.x = 75;
	    	    if (!cursors.up.isDown && !cursors.down.isDown) {
	    	    	this.sprite.play('right');
	    	    }
	    	}
	    	

	    	if (cursors.down.isUp && cursors.left.isUp && cursors.right.isUp && cursors.up.isUp)
	    	{
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