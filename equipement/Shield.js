function Shield(x, y, attack, defense, maxDurability){
	Equipement.call(this, attack, defense, maxDurability, x, y , 'shield');
}

Shield.prototype = Object.create(Equipement.prototype);
Shield.prototype.constructor = Shield;
