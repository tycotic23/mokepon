﻿//variables globales
let mascotaEnemigo="undefined";
let setAtaques=["Fuego","Agua","Tierra"];
let ataqueJugador="undefined";
let ataqueEnemigo="undefined";
let vidasJugador=3;
let vidasEnemigo=3;
let botonMascotaJugador;
let botonReiniciar;
let seccionAtaque;
let seccionmjes;
let ataquesJugador;
let ataquesEnemigo;
let seccionseleccion;

class Mokepon{

	constructor(nombre,foto,vida){
		this.nombre=nombre;
		this.foto=foto;
		this.vida=vida;
	}
}

let listaMascotas=[new Mokepon("Hipodoge","assets/hipodoge.webp",3),
new Mokepon("Capipepo","assets/capipepo.webp",3),
new Mokepon("Ratigueya","assets/ratigueya.webp",3),
new Mokepon("Langostelvis","assets/hipodoge.webp",3),
new Mokepon("Tucapalma","assets/hipodoge.webp",3),
new Mokepon("Pydos","assets/hipodoge.webp",3)
];

function iniciarJuego()
{
	//
	//esta funcion se llama cuando termina de cargar el html
	//
	//
	//
	botonMascotaJugador = document.getElementById("boton-mascota");
	botonMascotaJugador.addEventListener('click',seleccionarMascotaJugador);
	botonReiniciar=document.getElementById("reiniciar");
	botonReiniciar.addEventListener('click',reiniciarJuego)
	botonReiniciar.style.display='none';
	seccionAtaque=document.getElementById("seleccionar-ataque");
	seccionAtaque.style.display='none';
	seccionmjes=document.querySelector("#resultado p");
	ataquesJugador=document.getElementById("ataqueJugador");
	ataquesEnemigo=document.getElementById("ataqueEnemigo");
	seccionseleccion=document.getElementById("seleccionar-mascota");
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
function fdeataque(ataque)
{
	//
	//esta funcion se llama cada vez que se presiona un boton de ataque, automaticamente es respondida
	//por un ataque del enemigo
	//
	//
	//alert("Atacaste con "+ataque);
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
	let genAtaqueEnemigo=numeroAleatorio(0,2);
	ataqueEnemigo=setAtaques[genAtaqueEnemigo];
	
}

function quitarvidas(resultado){
	//quitar vidas
	if(resultado=="GANASTE"){
		vidasEnemigo-=1;
		document.getElementById("vidas-enemigo").innerHTML=vidasEnemigo;
	}else if(resultado=="PERDISTE"){
		vidasJugador-=1;
		document.getElementById("vidas-jugador").innerHTML=vidasJugador;
	}
	//disparar final del juego si alguno llego a cero
	dispararfinal();
}

function dispararfinal(){
	//revisa la cantidad de vidas de ambos jugadores y si alguno es cero devuelve el resultado
	if(vidasEnemigo==0){
		crearMensaje("GANASTE EL JUEGO");
		disabledbotones(true);
		botonReiniciar.style.display='flex';
	}
	else if (vidasJugador==0){
		crearMensaje("HAS SIDO DERROTADO");
		disabledbotones(true);
		botonReiniciar.style.display='flex';
	}
}

function crearMensaje(mje){
	//
	//esta funcion permite agregar mensajes al area de mensajes, comunica acciones.
	//se va a llamar con cualquier accion
	//
	//

	/* let parrafo=document.createElement("p"); */
	let nuevoAtaquejugador=document.createElement("p");
	let nuevoAtaqueEnemigo=document.createElement("p");
	seccionmjes.innerText=mje;
	nuevoAtaquejugador.innerText=ataqueJugador;
	nuevoAtaqueEnemigo.innerText=ataqueEnemigo;
	/* seccionmjes.appendChild(parrafo); */
	ataquesJugador.appendChild(nuevoAtaquejugador);
	ataquesEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeAtaque(resultado){
	//
	//esta funcion permite agregar mensajes al area de mensajes, comunica acciones.
	//se va a llamar con cualquier accion
	//
	//
	/* crearMensaje(`Tu mascota atacó con ${ataqueJugador}. Mascota enemiga atacó con ${ataqueEnemigo} - ${resultado}`); */
	crearMensaje(`${resultado}`);
}

function iniciarMascotas()
{
	iniMascotaJugador();
	iniMascotaEnemigo();
	seccionAtaque.style.display='flex';
	seccionseleccion.style.display='none';
}

function iniMascotaJugador(){
	//obtener set de ataques de la mascota y obtener el control de sus botones
	let botonesAtaque=[];
	setAtaques.forEach(elemento =>botonesAtaque.push(document.getElementById(elemento)));
	botonesAtaque.forEach(elemento =>elemento.addEventListener('click',function(){fdeataque(elemento.id);}));
}

function iniMascotaEnemigo(){

}


function numeroAleatorio(min, max){
	//devuelve un numero aleatorio entre min y max
	return Math.floor(Math.random()*(max-min+1)+min);
}
function cambiartextoid(idelement,nuevotexto)
{
	//funcion que cambia el texto del elemento de id idelement
	let outputnombre=document.getElementById(idelement).textContent=nuevotexto;
}
function seleccionarmascotaenemigo()
{
	mascotaEnemigo=listaMascotas[numeroAleatorio(0,5)];
	cambiartextoid("mascota-enemigo",mascotaEnemigo);
}
function seleccionarMascotaJugador(id,cadena)
{
	//obtengo todas las mascotas
	let inputMascotas=[];
	listaMascotas.forEach(elemento =>{
		inputMascotas.push(document.getElementById(elemento.nombre));
	})
	
	//busco la elegida por el usuario
	let mascotaSeleccion=inputMascotas.find(elemento=>elemento.checked);
	if (mascotaSeleccion===undefined)
	{
		alert("Tenés que seleccionar una mascota");
	}
	else
	{
		//alert("seleccionaste a "+mascotaSeleccion.id);
		cambiartextoid("mascota-jugador",mascotaSeleccion.id);
		seleccionarmascotaenemigo();
		iniciarMascotas();
	}
}

function reiniciarJuego(){
	location.reload();
}

function disabledbotones(disab){
	//habilitar o deshabilitar botones de ataque
	let botonesAtaque=[];
	setAtaques.forEach(elemento =>botonesAtaque.push(document.getElementById(elemento)));
	botonesAtaque.forEach(elemento =>elemento.disabled=disab);
}


window.addEventListener('load',iniciarJuego);