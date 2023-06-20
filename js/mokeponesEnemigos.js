class CapipepoEnemigo extends Mokepon{
    constructor(x,y){
        super("Capipepo enemigo","assets/capipepoCabeza.png",12,"Tierra",[setAtaques[4],setAtaques[1],setAtaques[3]]);
        this.x=x;
		this.y=y;
    }
}

class RatigueyaEnemigo extends Mokepon{
    constructor(x,y){
        super("Ratigueya enemiga","assets/ratigueyaCabeza.png",12,"Fuego",[setAtaques[2],setAtaques[6],setAtaques[8]]);
        this.x=x;
		this.y=y;
    }
}

class HipodogeEnemigo extends Mokepon{
    constructor(x,y){
        super("Hipodoge enemigo","assets/hipodogeCabeza.webp",10,"Agua",[setAtaques[2],setAtaques[6],setAtaques[7]]);
        this.x=x;
		this.y=y;
    }
}