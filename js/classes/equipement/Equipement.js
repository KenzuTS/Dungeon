/*function Equipement(attack, defense, maxDurability, x, y , key, frame){*/
function Equipement(){
	if (arguments.length == 5) {
		if (arguments[0] == game) {
			//game, x, y, key, frame
			Phaser.Sprite.call(this, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
		}
	}
	else if (arguments.length == 7) {
		// x, y, key, frame, attack, defense, maxDurability
		console.log(arguments);
		Phaser.Sprite.call(this, game, arguments[0], arguments[1], arguments[2], arguments[3])
		this.attack = arguments[4];
		this.defense = arguments[5];
		this.maxDurability = arguments[6];
	}

	this.looseDurability = function(){
		this.setDurability(this.durability--);
/*		this.durability--;
		if (this.durability <= 0) {
			this.break = true;
			this.durability = 0;
		}*/
	}

	this.setDurability = function(value) {
		if (this.durability != value) {
			this.durability = value;
		} else if (this.durability <= 0) {
			this.break = true;
			this.durability = 0;
		} else if (this.durability > maxDurability) {
			this.durability = this.maxDurability;
		}
	}

	this.Describe = function() {
		var description = menuInvGroup.children.find(x => x.name == "description");
		description.removeAll(true);
	    description.add(game.add.text(0, 0, 'Attack : ' + this.attack, { font: '24px Arial', fill: '#fff' }));
	    description.add(game.add.text(0, 40, 'Defense : ' + this.defense, { font: '24px Arial', fill: '#fff' }));
	    description.add(game.add.text(0, 80, 'Durability : ' + this.durability + " / " + this.maxDurability, { font: '24px Arial', fill: '#fff' }));
	}

	this.repare = function () {
		 if (player.inventory.ressource) {
		 	this.setDurability(this.durability + Application.REPARE);
		 }
	}

	this.Awake = function () {
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.anchor.setTo(0,1);
		this.scale.set(Application.SCALE);
		this.smoothed = false;
		this.durability = this.maxDurability;
		this.percentDurability = 100;
		this.break = false;
	}

	this.Awake();
}

Equipement.prototype = Object.create(Phaser.Sprite.prototype);
Equipement.prototype.constructor = Equipement;