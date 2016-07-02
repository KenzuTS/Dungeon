/*function Shield(x, y, attack, defense, maxDurability){
	Equipement.call(this, attack, defense, maxDurability, x, y , 'shield');
}*/
function Shield(){
	if (arguments.length == 5) {
		if (arguments[0] == game) {
			//game, x, y, key, frame
			Equipement.call(this, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
		}
	}
	else if (arguments.length == 7) {
		// x, y, key, frame, attack, defense, maxDurability
		Equipement.call(this, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
	}
}

Shield.prototype = Object.create(Equipement.prototype);
Shield.prototype.constructor = Shield;