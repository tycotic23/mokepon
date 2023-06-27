class Jugador{
    constructor (id){
        this.id=id;
    }

    agregarMokepon(mokepon){
        this.mokepon=mokepon;
    }

    actualizarPosicion(x,y){
        this.x=x;
        this.y=y;
    }
   
}

module.exports = Jugador;