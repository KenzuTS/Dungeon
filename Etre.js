function Etre(x,y,scale){
	this.initPosX = x;
	this.initPosY = y;
	this.scale = scale;
	this.idDeadTexture = 4;

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
			/* 1 Texture sur le ventre
			   4 Texture sur le dos */
			this.sprite.loadTexture('dead', this.idDeadTexture);
			//this.callbackOnDead();
		}
	}

	this.attack = function (target) {
		var init = {
			x : this.sprite.position.x,
			y : this.sprite.position.y,
		}
		var move = {
			x : this.sprite.position.x + (target.sprite.position.x - this.sprite.position.x) / 2,
			y : this.sprite.position.y + (target.sprite.position.y - this.sprite.position.y) / 2
		}
		
		var self = this;
		var tweenA =  game.add.tween(this.sprite).to(move, 300, "Linear");
		var tweenB =  game.add.tween(this.sprite).to(init, 300, "Linear");

		tweenA.chain(tweenB);
		tweenA.onComplete.add(function() {
			target.takeDamage(self.damage.min + Math.random() * (self.damage.max - self.damage.min));
		});
		tweenB.onComplete.add(function(){
			if (target.isAlive) { target.attack(self); }
		});
		tweenA.start();
	}

	this.takeDamage = function (damage) {
		this.setHP(this.HP - damage);
	}
}