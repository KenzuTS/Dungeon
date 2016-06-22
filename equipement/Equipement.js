function Equipement(attack, defense, maxDurability){

	this.attack = attack;
	this.defense = defense;
	this.maxDurability = maxDurability;
	this.durability = maxDurability;
	this.percentDurability = 100;
	this.break = false;

	this.looseDurability = function(){
		this.durability--;
		if (this.durability <= 0) {
			this.break = true;
			this.durability = 0;
		}
	}

	this.Describe = function() {
		var description = menuInvGroup.children.find(x => x.name == "description");
		description.removeAll(true);
	    description.add(game.add.text(0, 0, 'Attack : ' + this.attack, { font: '24px Arial', fill: '#fff' }));
	    description.add(game.add.text(0, 40, 'Defense : ' + this.defense, { font: '24px Arial', fill: '#fff' }));
	    description.add(game.add.text(0, 80, 'Durability : ' + this.durability + " / " + this.maxDurability, { font: '24px Arial', fill: '#fff' }));
	}
}