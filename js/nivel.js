let mascotaEnemigo="undefined";
let mascotaJugador="undefined";
let ataqueJugador="undefined";
let ataqueEnemigo="undefined";
let refresh;

let setAtaques=[
	new ataqueMokepon("Basico","Basico 🐾"),
	new ataqueMokepon("Fuego1","Fuego1 🔥"),
	new ataqueMokepon("Fuego2","Fuego2 🔥"),
	new ataqueMokepon("Fuego3","Fuego3 🔥"),
	new ataqueMokepon("Agua1","Agua1 💧"),
	new ataqueMokepon("Agua2","Agua2 💧"),
	new ataqueMokepon("Agua3","Agua3 💧"),
	new ataqueMokepon("Tierra1","Tierra1 🌱"),
	new ataqueMokepon("Tierra2","Tierra2 🌱"),
	new ataqueMokepon("Tierra3","Tierra3 🌱"),
];

let listaMascotas=[new Mokepon("Hipodoge","assets/hipodoge.webp",2,"Agua",[setAtaques[0],setAtaques[1],setAtaques[2]]),
new Mokepon("Capipepo","assets/capipepo.webp",5,"Tierra",[setAtaques[0],setAtaques[4],setAtaques[5]]),
new Mokepon("Ratigueya","assets/ratigueya.webp",3,"Fuego",[setAtaques[0],setAtaques[6],setAtaques[7]]),
new Mokepon("Langostelvis","assets/hipodoge.webp",4,"Agua y Fuego",[setAtaques[0],setAtaques[1],setAtaques[8]]),
new Mokepon("Tucapalma","assets/hipodoge.webp",5,"Agua y Tierra",[setAtaques[0],setAtaques[4],setAtaques[9]]),
new Mokepon("Pydos","assets/hipodoge.webp",2,"Tierra y Fuego",[setAtaques[0],setAtaques[3],setAtaques[5]])
];

let enemigos=[new Mokepon("Ratigueya enemiga","assets/ratigueyaCabeza.png",12,"Fuego",[setAtaques[0],setAtaques[1],setAtaques[8]]),
new Mokepon("Ratigueya enemiga","assets/ratigueyaCabeza.png",12,"Fuego",[setAtaques[2],setAtaques[6],setAtaques[8]]),
new Mokepon("Capipepo enemigo","assets/capipepoCabeza.png",12,"Tierra",[setAtaques[4],setAtaques[1],setAtaques[3]]),
]


window.addEventListener('load',iniciarJuego);


function iniciarJuego()
{
	//
	//esta funcion se llama cuando termina de cargar el html
	//
	//
	//
	iniciarMapa();
	//botones
	botonReiniciar=document.getElementById("reiniciar");
	botonReiniciar.addEventListener('click',reiniciarJuego)
	botonReiniciar.style.display='none';
	seccionAtaque=document.getElementById("seleccionar-ataque");
	seccionAtaque.style.display='none';
	seccionmjes=document.querySelector("#resultado p");
	ataquesJugador=document.getElementById("ataqueJugador");
	ataquesEnemigo=document.getElementById("ataqueEnemigo");
	seccionseleccion=document.getElementById("seleccionar-mascota");
	contenedorTarjetas=document.getElementById("contenedor-tarjetas");
	contenedorBotonesAtaque=document.getElementById("botones-ataque");
	//crear las tarjetas de mokepones en el DOM
	listaMascotas.forEach(mokepon=>{
		agregarTarjetaMokeponDOM(mokepon);
	});
	
}

function seleccionarmascotaenemigo(){
	mascotaEnemigo=listaMascotas[numeroAleatorio(0,listaMascotas.length-1)];
	cambiartextoid("mascota-enemigo",mascotaEnemigo.nombre);
}
function seleccionarMascotaJugador(){
    //se llama al tocar el boton de seleccionar mascota


    //obtengo una cadena con el nombre del mokepon o undefined
    let mascotaSeleccion=obtenerMascotaElegida(listaMascotas);
	
	if (mascotaSeleccion==="undefined")
	{
		alert("Tenés que seleccionar una mascota");
	}
	else
	{
		
		cambiartextoid("mascota-jugador",mascotaSeleccion.id);
		//ahora que ya revisamos la seleccion le damos valor de mokepon a "mascotajugador"
		mascotaJugador=listaMascotas.find(m=>m.nombre==mascotaSeleccion);
		seleccionarmascotaenemigo();
		iniciarMascotas();
	}
}

function iniciarMascotas()
{
    //si se selecciono una mascota válida se modifican las secciones visibles y da comienzo al juego

	iniMascotaJugador();
	iniMascotaEnemigo();
	prepararMapa();
	//cargando mokepones en el mapa
	refresh=setInterval(dibujarMokepones,30);
}


//esta funcion se repite constantemente
function dibujarMokepones(){
	//borrar dibujo anterior
	lienzo.clearRect(0,0,mapa.width,mapa.height);
	//dibujar fondo
	lienzo.drawImage(mapaBK,0,0,mapa.width,mapa.height);
	//dibujar jugador
	mascotaJugador.pintarPersonaje(lienzo);
	//enemigos
	enemigos.forEach(en=>en.pintarPersonaje(lienzo));
}

function reiniciarJuego(){
	location.reload();
}

function fdeataque(ataque)
{
	//
	//esta funcion se llama cada vez que se presiona un boton de ataque, automaticamente es respondida
	//por un ataque del enemigo
	//
	//
	ataqueJugador=ataque;
	ataqueAleatorioEnemigo();
	let resultado=comprobar(ataqueJugador,ataqueEnemigo);
	crearMensajeAtaque(resultado);
	quitarvidas(resultado);
}

function ataqueAleatorioEnemigo(){
	//
	//esta funcion se da en respuesta a cada ataque del jugador
	//
	//
	let genAtaqueEnemigo=numeroAleatorio(0,mascotaEnemigo.ataques.length-1);
	ataqueEnemigo=mascotaEnemigo.ataques[genAtaqueEnemigo];
	
}

function quitarvidas(resultado){
	//quitar vidas
	if(resultado=="GANASTE"){
		mascotaEnemigo.vida-=1;
        cambiartextoid("vidas-enemigo",mascotaEnemigo.vida);
	}else if(resultado=="PERDISTE"){
		mascotaJugador.vida-=1;
        cambiartextoid("vidas-jugador",mascotaJugador.vida);
	}
	//disparar final del juego si alguno llego a cero
	dispararfinal();
}

function dispararfinal(){
	//revisa la cantidad de vidas de ambos jugadores y si alguno es cero devuelve el resultado
	if(mascotaEnemigo.vida==0){
        mostrarfasefinal("GANASTE EL JUEGO")
	}
	else if (mascotaJugador.vida==0){
        mostrarfasefinal("HAS SIDO DERROTADO")
	}
}



function comprobar(at1,at2){
	//comprueba dos ataques (primero el del jugador y luego el del enemigo)
	if(at1==at2) return "EMPATE";
	//obtiene el indice de cada ataque segun el array de ataques
	num1=setAtaques.indexOf(at1);
	num2=setAtaques.indexOf(at2);
	//compara los indices, siempre gana el "siguiente", el "siguiente" del ultimo es el primero de todos
	if(num1!=setAtaques.length-1){
		if(num2==num1+1) return "PERDISTE";}
	else{
		if(num2==0) return "PERDISTE";}
	//si llego hasta aca entonces ni perdio ni empato, por lo tanto gano
	return "GANASTE";
}

function numeroAleatorio(min, max){
	//devuelve un numero aleatorio entre min y max
	return Math.floor(Math.random()*(max-min+1)+min);
}

 function iniMascotaEnemigo(){
    //toma la vida inicial de la mascota
    //vidasEnemigo=mascotaEnemigo.vida;

} 