class Mokepon{

	constructor(nombre,foto,vida,elemento,ataques){
		//atributos
		this.nombre=nombre;
		this.foto=foto;
		this.vida=vida;
		this.ataques=ataques;
		this.elemento=elemento;
		//canvas
		this.x=20;
		this.y=30;
		this.ancho=80;
		this.alto=80;
		this.mapaFoto=new Image();
		this.mapaFoto.src=foto;
		//velocidad horizontal y vertical
		this.vx=0;
		this.vy=0;
	}

	//esta funcion que se encarga de dibujar al mokepon es la que va a ser llamada constantemente
	pintarPersonaje(canva){
		this.x+=this.vx;
		this.y+=this.vy;
		
		canva.drawImage(this.mapaFoto,this.x,this.y,this.ancho,this.alto);
	}

	moverPersonaje(dx,dy){
		this.x+=dx;
		this.y+=dy;

	}

	tp(x,y){
		this.x=x;
		this.y=y;
	}

	detenerPersonaje(){
		this.vx=0;
		this.vy=0;
	}

	retroceder(){
		this.x-=this.vx;
		this.y-=this.vy;
	}

	estaEnMovimiento(){
		return this.vy!=0 || this.vx!=0;
	}
}



























