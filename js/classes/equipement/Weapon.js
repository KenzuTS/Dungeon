function Weapon(x, y, attack, defense, maxDurability){

	Equipement.call(this, attack, defense, maxDurability, x, y , 'sword');
}

Weapon.prototype = Object.create(Equipement.prototype);
Weapon.prototype.constructor = Weapon;