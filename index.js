let canvas = document.querySelector('canvas');
let pincel = canvas.getContext('2d');
//tamanho da largura
canvas.width = innerWidth;
//tamanho da altura
canvas.height = innerHeight;

class Player {
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw(){
        let largura = this.x;
        let altura = this.y;
        let diametro = this.radius;
        let cor = this.color;
        pincel.beginPath();
        pincel.arc(largura,altura,diametro,0,Math.PI* 2,false);
        pincel.fillStyle = this.color;
        pincel.fill();
    }

}
const x = canvas.width/2;
const y = canvas.height/2
const player = new Player(x,y,30,'blue');
player.draw();
