
//importar
const express = require("express");
const cors=require("cors");
//almacenar la aplicacion, una isntalncia del servidor que estoy utilizando
const app =express();
//configurar cors
app.use(cors());
//para poder usar json en los cuerpos de las peticiones
app.use(express.json());

//lista de jugadores
const jugadores=[];

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
//peticion del usuario
app.get("/",(req,res)=>{
	res.send("hola");
});

//endpoint para registrar jugador
app.get("/unirse",(req,res)=>{
    const id=`${Math.random()}`
    const jugador = new Jugador(id);
    jugadores.push(jugador);
    //cors origin, en este caso admite todos lo cual no es seguro
    //res.setHeader("Access-Control-Allow-Origin","*");
	res.send(id);
});

app.post("/mokepon/:jugadorID",(req,res)=>{
    const jugadorID=req.params.jugadorID || 0;
    const mokepon =req.body.mokepon;
    jindex=jugadores.findIndex((jugador)=>jugadorID===jugador.id)
    //verificar que el jugador exista
    if(jindex>=0){
        jugadores[jindex].agregarMokepon(mokepon);
    }
    res.end();
});

app.post("/mokepon/:jugadorID/posicion",(req,res)=>{
    const jugadorID=req.params.jugadorID || 0;
    const x =req.body.x || 0;
    const y =req.body.y || 0;
    jindex=jugadores.findIndex((jugador)=>jugadorID===jugador.id)
    //verificar que el jugador exista
    if(jindex>=0){
        jugadores[jindex].actualizarPosicion(x,y);
    }
    console.log(jugadores);
    res.end();
});

//para que el servidor este escuchando en un puerto

app.listen(8080,()=>{
	console.log("servidor funcionando");
});

