function Weapon(attack, defense, maxDurability){

	Equipement.call(this, attack, defense, maxDurability);
}

Weapon.prototype = Object.create(Equipement.prototype);
Weapon.prototype.constructor = Weapon;