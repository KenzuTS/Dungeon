function Etre(x,y,scale){
	this.initPosX = x;
	this.initPosY = y;
	this.scale = scale;
	this.idDeadTexture = 4;

	this.HP = 100;
	this.isAlive = true;

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

	this.takeDamage = function (damage) {
		this.setHP(this.HP - damage);
	}
}