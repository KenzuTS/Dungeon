function Etre(game, x, y, key, frame){
	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.idDeadTexture = 4;
	this.inCombat = false;

	this.HP = 100;
	this.isAlive = true;
	this.damage = {
		min : 1,
		max : 15
	}

	this.setHP = function (value) {
		this.HP = value;
		if (this.HP < 1) {
			this.isAlive = false;
			this.onDead();
		}
	}

	this.takeDamage = function (damage) {
		this.setHP(this.HP - damage);
	}

	this.attack = function (target) {
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
			target.takeDamage((self.damage.min + Math.random() * (self.damage.max - self.damage.min))|0);
		});
		tweenB.onComplete.add(function(){
			if (target.isAlive) { target.attack(self); }
			else {
				self.inCombat = false;
			}
		});
		tweenA.start();
	}
}



Etre.prototype = Object.create(Phaser.Sprite.prototype);
Etre.prototype.constructor = Etre;

Etre.prototype.onDead = function(){
	this.loadTexture('dead', this.idDeadTexture);
	if (!(this instanceof Player)) {
		game.time.events.add(Application.Time.FADE_DEATH, function(){
			this.kill();
		},this);
	}
}