function Player(x, y){
	Etre.call(this, game, x, y, 'characters', Application.Player.Frame.DOWN);
	//this.tween;
	this.isWalking = false;
	this.idDeadTexture = 1;

	this.inventory = {
		"key" : 0,
		"ressource" : 0
	};

	this.equipement = {
		weapon: new Weapon(10, 0, 50),
		shield: new Armor(0, 5, 50)
	};

	this.damage = {
		min : 20,
		max : 30
	};

	this.Awake = function(){

	    game.physics.enable(this, Phaser.Physics.ARCADE);
	    this.body.collideWorldBounds = true;

		this.body.setSize(10, 10, 5, 11);
		this.scale.set(Application.SCALE);
	    this.smoothed = false;
	    this.anchor.set(0.5);

	    this.animations.add('down', [3,4,5], 10, true);
	    this.animations.add('left', [15,16,17], 10, true);
	    this.animations.add('right', [27,28,29], 10, true);
	    this.animations.add('up', [39,40,41], 10, true);

	    //this.tween = game.add.tween(this).to( { x: this.distX, y: this.distY }, 300);
	}	

	/*this.move = function(){
	
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
    }*/

    this.moveVelocity = function(){
    	this.body.velocity.set(0);
    	if (!this.inCombat) {

	 		if (cursors.up.isDown)
	    	{
	    	    this.body.velocity.y = -Application.Player.VELOCITY;
	    	    this.animations.play('up');
	    	}
	    	else if (cursors.down.isDown)
	    	{
	    	    this.body.velocity.y = Application.Player.VELOCITY;
	    	    this.animations.play('down');
	    	}

	    	if (cursors.left.isDown)
	    	{

	    	    this.body.velocity.x = -Application.Player.VELOCITY;

	    	    if (!cursors.up.isDown && !cursors.down.isDown) {
	    	    	this.animations.play('left');
	    	    }
	    	}
	    	else if (cursors.right.isDown)
	    	{

	    	    this.body.velocity.x = Application.Player.VELOCITY;


	    	    if (!cursors.up.isDown && !cursors.down.isDown) {
	    	    	this.animations.play('right');
	    	    }
	    	}
	    	

	    	if (cursors.down.isUp && cursors.left.isUp && cursors.right.isUp && cursors.up.isUp)
	    	{
		    	switch(this.animations.currentAnim.name){
		
		    	    case "down":
		    	        this.animations.stop();
		    	        this.frame = Application.Player.Frame.DOWN;
		    	    break;
		
		    	    case "left":
		    	        this.animations.stop();
		    	        this.frame = 16;
		    	    break;
		
		    	    case "right":
		    	        this.animations.stop();
		    	        this.frame = 28;
		    	    break;
		
		    	    case "up":
		    	        this.animations.stop();
		    	        this.frame = 40;
		    	    break;
	    	    }
	    	}
    	}
    }

    this.attack = function(target){
    	Etre.prototype.attack.call(this, target);
    	this.equipement.weapon.looseDurability();
    }

    this.takeDamage = function(damage){
    	if (!this.equipement.shield.break) {
			damage -= this.equipement.shield.defense;    		
    	}

    	if (damage<= 0) {
    		Etre.prototype.takeDamage.call(this, 1);
    	}
    	else {
    		Etre.prototype.takeDamage.call(this, damage);
    	}

    	this.equipement.shield.looseDurability();
    }

    this.calculDamage = function(){

    	Etre.prototype.calculDamage.call(this);
    	if (!this.equipement.weapon.break) {
    		this.attackDamage += this.equipement.weapon.attack;
    	}
    }

    this.Awake();
}

Player.prototype = Object.create(Etre.prototype);
Player.prototype.constructor = Player;
