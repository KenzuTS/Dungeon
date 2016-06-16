function Key(x, y){

	this.sprite;
	this.x = x;
	this.y = y; 

	this.Awake = function(){
		
		this.sprite = game.add.sprite(this.x, this.y, 'key');
		game.physics.arcade.enable(this.sprite);
		this.sprite.scale.setTo(Application.SCALE);
		this.sprite.smoothed = false;
	}

	this.Awake();
}