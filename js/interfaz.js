let seccionAtaque;
let seccionmjes;
let seccionseleccion;
let contenedorTarjetas;
let contenedorBotonesAtaque;
let mapa;
let seccionMapa;
let lienzo;
let mapaBK;
let botonReiniciar;
let ataquesJugador;
let ataquesEnemigo;



function iniciarMapa(){
    //cargando el canvas
    mapa=document.getElementById("mapa");
    seccionMapa=document.getElementById("ver-mapa");
    seccionMapa.style.display='none';
    lienzo=mapa.getContext("2d");
    //eventos de teclado
    window.addEventListener('keydown',eventKeyDown);
    window.addEventListener('keyup',eventKeyUp);
    //fondo y tamaño
    mapa.width=600;
    mapa.height=500;
    mapaBK=new Image();
    mapaBK.src="assets/mokemap.webp";
   
}




function obtenerMascotaElegida(mascotas){
    //revisa los botones de mascotas y si hay uno chequeado devuelve una cadena con el nombre de la mascota, sino devuelve undefined
    //se ejecuta dentro de la funcion seleccionarMascotaJugador()

    //obtengo todas las mascotas
	let inputMascotas=[];
	mascotas.forEach(elemento =>{
		inputMascotas.push(document.getElementById(elemento.nombre));
	})
    //busco la elegida por el usuario
	let mascotaSeleccion=inputMascotas.find(elemento=>elemento.checked);
    if (mascotaSeleccion===undefined) return "undefined";
    return mascotaSeleccion.id;
}



function disabledbotones(disab){
	//habilitar o deshabilitar botones de ataque
	mascotaJugador.ataques.forEach(ataque=>{
		document.getElementById(ataque.id).disabled=disab;
	});
}



function mostrarfasefinal(mensaje){
    //cuando termina el nivel se dispara un mensaje y aparece el boton de reiniciar. se deshabilitan los botones
    crearMensaje(mensaje);
		disabledbotones(true);
		botonReiniciar.style.display='flex';
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
	nuevoAtaquejugador.innerText=ataqueJugador.nombre;
	nuevoAtaqueEnemigo.innerText=ataqueEnemigo.nombre;
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



function prepararMapa(){
    //esconde la seccion de seleccion y muestra el mapa y controles
	seccionMapa.style.display="flex";
	seccionseleccion.style.display='none';
}

function prepararAreaDeBatalla(){
    //esconde el mapa y muestra la batalla con los contrles
    seccionAtaque.style.display='flex';
	seccionMapa.style.display="none";
    //poner las vidas de ambos jugadores
    cambiartextoid("vidas-jugador",mascotaJugador.vida);
    cambiartextoid("vidas-enemigo",mascotaEnemigo.vida);
}
function volverMapa(){
    //esconde el mapa y muestra la batalla con los contrles
    seccionAtaque.style.display='none';
	seccionMapa.style.display="flex";
    //quitar los mensajes de ataque anteriores
    vaciarElementoDOM(ataquesJugador);
    vaciarElementoDOM(ataquesEnemigo);
}

function vaciarElementoDOM(elemento){
    while (elemento.firstChild){
        elemento.removeChild(elemento.firstChild);
      };
}


function iniBotonesAtaque(){
	mascotaJugador.ataques.forEach(ataque=>{
		agregarBotonAtaqueDOM(ataque);
	});
	
}

function agregarBotonAtaqueDOM(ataque){
	//agrega al elemento que contiene los botones de ataque los ataques del mokepon elegido por el jugador
	let buttonc=document.createElement("button");
	buttonc.setAttribute("class","atack-button");
	buttonc.setAttribute("name","mascota");
	buttonc.setAttribute("id",ataque.id);
	let pc=document.createElement("p");
	pc.appendChild(document.createTextNode(ataque.nombre));
	buttonc.appendChild(pc);
	buttonc.addEventListener('click',function(){fdeataque(ataque)});
	contenedorBotonesAtaque.appendChild(buttonc);
	
}

function agregarTarjetaMokeponDOM(mokepon){
	//agrega una tarjeta de mokepon al elemento que contiene las tarjetas
	let inputc=document.createElement("input");
	inputc.setAttribute("type","radio");
	inputc.setAttribute("name","mascota");
	inputc.setAttribute("id",mokepon.nombre);
	contenedorTarjetas.appendChild(inputc);
	let labelc=document.createElement("label");
	labelc.setAttribute("class","tarjeta-mokepon");
	labelc.setAttribute("for",mokepon.nombre);
	let imgc=document.createElement("img");
	imgc.setAttribute("src",mokepon.foto);
	imgc.setAttribute("alt",mokepon.nombre);
	labelc.appendChild(imgc);
	let pc=document.createElement("p");
	pc.appendChild(document.createTextNode(mokepon.elemento));
	labelc.appendChild(pc);
	contenedorTarjetas.appendChild(labelc);
}

function cambiartextoid(idelement,nuevotexto)
{
	//funcion que cambia el texto del elemento de id idelement
	document.getElementById(idelement).textContent=nuevotexto;
}