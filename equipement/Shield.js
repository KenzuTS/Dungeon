function Shield(attack, defense, maxDurability){

	Equipement.call(this, attack, defense, maxDurability);
}

Shield.prototype = Object.create(Equipement.prototype);
Shield.prototype.constructor = Shield;
