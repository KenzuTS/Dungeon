function GUI() {
	
	this.textHP;
	this.textKey;
	this.textRessource;
	this.style;
	this.barConfig;
    this.healthBar;
    this.keyGUI;
    this.ressourceGUI;
    this.swordGUI;
    this.shieldGUI;

    this.Awake = function() {
    	
    	/* HealthBar */
    		this.barConfig = {  x: -game.camera.world.position.x + 150,
        	                   y: -game.camera.world.position.y + 20,
        	                   width: 250,
        	                   height: 20,
        	                   bg: {
        	                       color: '#651828'
        	                   },
        	                   bar: {
        	                     color: 'lime'
        	                   }};
			this.healthBar = new HealthBar(game, this.barConfig);
        	this.healthBar.setFixedToCamera(true);
        	this.healthBar.setPercent(player.poucentHP);

        /* Text HP */
            this.style = { font: "bold 16px Arial", fill: "#fff" };
            this.textHP = game.add.text(0,
                                    2,
                                    player.HP + " | " + player.maxHP,
                                    this.style);
            this.textHP.anchor.set(0, 0.5);
            this.textHP.setTextBounds(this.healthBar.x - this.healthBar.config.width / 2, this.healthBar.y, this.healthBar.config.width, this.healthBar.config.width);
            this.textHP.fixedToCamera = true;
            this.textHP.smoothed = false;
            this.textHP.stroke = "black";
            this.textHP.strokeThickness = 5;

        /* Keys */
            this.keyGUI = game.add.sprite(-game.camera.world.position.x + Application.Canvas.WIDTH / 2, -game.camera.world.position.y + 2, 'key');
            this.keyGUI.fixedToCamera = true;
            this.keyGUI.scale.setTo(Application.SCALE);
            this.keyGUI.smoothed = false;

        /* Ressources */
            this.ressourceGUI = game.add.sprite(-game.camera.world.position.x + Application.Canvas.WIDTH / 2 + 100, -game.camera.world.position.y + 2, 'ressource');
            this.ressourceGUI.fixedToCamera = true;
            this.ressourceGUI.scale.setTo(Application.SCALE);
            this.ressourceGUI.smoothed = false;

        /* Text Keys */
            this.style = { font: "bold 16px Arial", fill: "#fff" };
            this.textKey = game.add.text(this.keyGUI.x - 20,
                                    this.keyGUI.y + 2,
                                    player.inventory.key,
                                    this.style);
            this.textKey.fixedToCamera = true;
            this.textKey.smoothed = false;
            this.textKey.stroke = "black";
            this.textKey.strokeThickness = 5;

        /* Text Ressources */
            this.style = { font: "bold 16px Arial", fill: "#fff" };
            this.textRessource = game.add.text(this.ressourceGUI.x - 20,
                                    this.ressourceGUI.y + 2,
                                    player.inventory.ressource,
                                    this.style);
            this.textRessource.fixedToCamera = true;
            this.textRessource.smoothed = false;
            this.textRessource.stroke = "black";
            this.textRessource.strokeThickness = 5;

        /* icon sword */
            this.swordGUI = game.add.sprite(-game.camera.world.position.x + 20, -game.camera.world.position.y + 40, 'sword');
            this.swordGUI.fixedToCamera = true;
            this.swordGUI.scale.setTo(Application.SCALE);
            this.swordGUI.smoothed = false;
            this.swordGUI.visible = false;

        /* icon shield */
            this.shieldGUI = game.add.sprite(-game.camera.world.position.x + 20, -game.camera.world.position.y + 70, 'shield');
            this.shieldGUI.fixedToCamera = true;
            this.shieldGUI.scale.setTo(Application.SCALE);
            this.shieldGUI.smoothed = false;
            this.shieldGUI.visible = false;
    }

    this.Awake();
}