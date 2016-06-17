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
}