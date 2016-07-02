function Etre(game, x, y, key, frame){

	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.idDeadTexture = 0;
	this.inCombat = false;
	this.canWalking = true;
	this.tweenProgress = null;
	this.tweens = {};
	this.pattern = null;
	this.maxHP = 100;

	this.HP = this.maxHP;
	this.isAlive = true;
	this.damage = {
		min : 1,
		max : 15
	}
	this.attackDamage = 0;

	this.setHP = function (value) {
		if (this.isAlive) {
			if (this instanceof Player) {
				Application.Sounds["pain"].play();
			}
			this.HP = value;
			if (this.HP <= 0) {
				this.HP = 0;
				this.isAlive = false;
				this.onDead();
			}
			else if(this.HP > this.maxHP){
				this.HP = this.maxHP;
			}
		}
	}

	this.Awake = function() {
		this.delay = Math.RandomTime(0,300);
		game.physics.enable(this, Phaser.Physics.ARCADE);
	    this.body.collideWorldBounds = true
		this.anchor.setTo(0,1);
		this.scale.set(Application.SCALE);
		this.smoothed = false;
	}

	this.Drop = function(){

		if (this.Ikey) {

			var key = new Key(this.position.x, this.position.y);
			itemsGroup.add(key);

		} else if (this.equipement) {
			switch(this.equipement){
				
				case 'shield':
					var shield = new Shield(this.position.x, this.position.y-16, 'Shield', 1, this.dropAttack, this.dropDefense, this.dropMaxDurability);
					itemsGroup.add(shield);
				break;

				case 'weapon':
					var weapon = new Shield(this.position.x, this.position.y-16, 'LongWep', 8, this.dropAttack, this.dropDefense, this.dropMaxDurability);
					itemsGroup.add(weapon);
				break;
			}

		} else if (game.rnd.integerInRange(0, 100) < 60) {

			var ressource = new Ressource(this.position.x, this.position.y);
			itemsGroup.add(ressource);
		}
	}

	this.stopAnimations = function () {
    	switch(this.animations.currentAnim.name){
    	    case "down":
    	        this.animations.stop();
    	        this.frame = this.Frame.DOWN;
    	    break;

    	    case "left":
    	        this.animations.stop();
    	        this.frame = this.Frame.LEFT;
    	    break;

    	    case "right":
    	        this.animations.stop();
    	        this.frame = this.Frame.RIGHT;
    	    break;

    	    case "up":
    	        this.animations.stop();
    	        this.frame = this.Frame.UP;
    	    break;
	    }
    }

	this.Awake();
}

Etre.prototype = Object.create(Phaser.Sprite.prototype);
Etre.prototype.constructor = Etre;

Etre.prototype.onDead = function(){
	this.loadTexture('dead', this.idDeadTexture);
	if (!(this instanceof Player)) {

		this.Drop();		
		game.time.events.add(Application.Time.FADE_DEATH, function(){
			this.destroy();
		},this);
	} else {
		this.canWalking = false;
	}
}

Etre.prototype.attack = function (target) {

	var init = {
		x : this.position.x,
		y : this.position.y,
	}
	var move = {
		x : this.position.x + (target.position.x - this.position.x) / 2,
		y : this.position.y + (target.position.y - this.position.y) / 2
	}

	var self = this;
	var tweenA =  game.add.tween(this).to(move, Application.Time.TWEEN_ATTACK, "Linear");
	var tweenB =  game.add.tween(this).to(init, Application.Time.TWEEN_ATTACK, "Linear");

	tweenA.chain(tweenB);
	tweenA.onComplete.add(function() {
		self.calculDamage();
		target.takeDamage(self.attackDamage);
	});
	tweenB.onComplete.add(function(){
		if (target.isAlive) { target.attack(self); }
		else {
			self.inCombat = false;
		}
	});
	tweenA.start();
}

Etre.prototype.takeDamage = function (damage) {
	this.setHP(this.HP - damage);
}

Etre.prototype.calculDamage = function(){
	this.attackDamage = this.damage.min + Math.random() * (this.damage.max - this.damage.min)|0;
}

Etre.prototype.move = function () {
	if (!this.pattern) {
		if (this.delay <= 0){
			var right = {
				x : this.position.x + Application.TILE_SIZE * Application.SCALE,
				y : this.position.y
			}
			var left = {
				x : this.position.x,
				y : this.position.y + Application.TILE_SIZE * Application.SCALE
			}
			var up = {
				x : this.position.x,
				y : this.position.y
			}
			var down = {
				x : this.position.x + Application.TILE_SIZE * Application.SCALE,
				y : this.position.y + Application.TILE_SIZE * Application.SCALE
			}
			if (this.canWalking) {
				this.tweens["right"] = game.add.tween(this).to(right, Math.RandomTime(1000, 2500), "Linear");
				this.tweens["down"] = game.add.tween(this).to(down, Math.RandomTime(1000, 2500), "Linear");
				this.tweens["left"] = game.add.tween(this).to(left, Math.RandomTime(1000, 2500), "Linear");
				this.tweens["up"] = game.add.tween(this).to(up, Math.RandomTime(1000, 2500), "Linear");
	/*			this.tweens.right.chain(this.tweens.down);
				this.tweens.down.chain(this.tweens.left);
				this.tweens.left.chain(this.tweens.up);
				this.tweens.up.chain(this.tweens.right);*/
				this.tweens.right.onComplete.add(function (self) {
					self.animations.stop();
					self.animations.play('down');
					self.tweenProgress = self.tweens.down;
					self.tweenProgress.start();
				})
				this.tweens.down.onComplete.add(function (self) {
					self.animations.stop();
					self.animations.play('left');
					self.tweenProgress = self.tweens.left;
					self.tweenProgress.start();
				})
				this.tweens.left.onComplete.add(function (self) {
					self.animations.stop();
					self.animations.play('up');
					self.tweenProgress = self.tweens.up;
					self.tweenProgress.start();
				})
				this.tweens.up.onComplete.add(function (self) {
					self.animations.stop();
					self.animations.play('right');
					self.tweenProgress = self.tweens.right;
					self.tweens.right.start();
				})
				this.tweenProgress = this.tweens.right;
				this.tweens.right.start();
				this.animations.play('right');
				this.canWalking = false;	
			}
		}
		else {
			this.delay--;
		}
	}
}

Math.RandomTime = function (min, max) {
	var value = min + (Math.random() * (max - min));
	return value| 0;
}