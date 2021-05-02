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

};

class ProjectTile {
    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    };
    draw(){
        pincel.beginPath();
        pincel.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        pincel.fillStyle = this.color;
        pincel.fill();
    };
    update(){
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    };

};


const widthPlayer = canvas.width/2;
const heightPlayer = canvas.height/2
const player = new Player(widthPlayer,heightPlayer,30,'blue');
player.draw();

const projectTile = new ProjectTile(
    canvas.width/2,
    canvas.height/2,
    5,
    'red',
    {
    x: 1,
    y: 1
   }
   );
  

function animate(){
    requestAnimationFrame(animate);
    projectTile.draw();
    projectTile.update();
}

window.addEventListener('click', ()=> {
  
})

animate();
