//controles
function downRight(){
	mascotaJugador.vx=3;
}
function downLeft(){
	mascotaJugador.vx=-3;
}
function downUp(){
	mascotaJugador.vy=-3;
}
function downDown(){
	mascotaJugador.vy=3;
}
function upKeys(){
	mascotaJugador.vx=0;
	mascotaJugador.vy=0;
}

function eventKeyDown(event){
	switch(event.key){
		case 'ArrowUp':
			event.preventDefault()
			downUp();
			break;
		case 'ArrowDown':
			event.preventDefault()
			downDown();
			break;
		case 'ArrowLeft':
			event.preventDefault()
			downLeft();
			break;
		case 'ArrowRight':
			event.preventDefault()
			downRight();
			break;
	}
}

function eventKeyUp(event){
	switch(event.key){
		case 'ArrowUp':
			mascotaJugador.vy=0;
			break;
		case 'ArrowDown':
			mascotaJugador.vy=0;
			break;
		case 'ArrowLeft':
			mascotaJugador.vx=0;
			break;
		case 'ArrowRight':
			mascotaJugador.vx=0;
			break;
	}
}