let canvas = document.querySelector('canvas');
let pincel = canvas.getContext('2d');
let somAtirando =

    canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    };
    draw() {
        let largura = this.x;
        let altura = this.y;
        let diametro = this.radius;
        let cor = this.color;
        pincel.beginPath();
        pincel.arc(largura, altura, diametro, 0, Math.PI * 2, false);
        pincel.fillStyle = this.color;
        pincel.fill();
    };

};


const projectTiles = [];
class ProjectTile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.audio = new Audio('tiro.mp3');
    };
    draw() {
        pincel.beginPath();
        pincel.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        pincel.fillStyle = this.color;
        pincel.fill();
    };
    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    };
    atirarSom() {
        this.audio.play();
    }

};

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    };
    draw() {
        pincel.beginPath();
        pincel.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        pincel.fillStyle = this.color;
        pincel.fill();
    };
    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    };
};
const enemies = [];
function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * 30;
        let x;
        let y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        }
        else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }

        const colors =
            [
                '#C0C0C0',
                '#808080',
                '#00FFFF',
                '#008080',
                '#FF00FF',
                '#800080',
                '#0000FF',
                '#000080',
                '#00FF00',
                '#008000',
                '#FFFF00',
                '#808000',
                '#FF0000',
                '#800000']

        const color = colors[Math.round(Math.random() * 11)];
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
        const velocity = {
            x: Math.cos(angle), y: Math.sin(angle)
        };


        enemies.push(new Enemy(x, y, radius, color, velocity));


    }, 2000);
};


const widthPlayer = canvas.width / 2;
const heightPlayer = canvas.height / 2
const player = new Player(widthPlayer, heightPlayer, 15, 'white');

player.draw();



var animationId;
function animate() {

    animationId = requestAnimationFrame(animate);
    pincel.fillStyle = 'rgba(0,0,0,0.3)';
    pincel.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();

    projectTiles.forEach((projectTile, index) => {
        projectTile.update();
        if (projectTile.x - projectTile.radius < 0 || projectTile.x - projectTile.radius > canvas.width ||
            projectTile.y + projectTile.radius < 0 || projectTile.y - projectTile.radius > canvas.height) {
            setTimeout(() => {
                projectTile.splice(index, 1);
            }, 0);
        }

    });



    enemies.forEach((enemy, index) => {
        enemy.update();
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId);
            alert('oi');
        }

        projectTiles.forEach((projectile, projectileIndex) => {

            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            if (dist - enemy.radius - projectile.radius < 1) {

                setTimeout(() => {
                    enemies.splice(index, 1);
                    projectTiles.splice(projectileIndex, 1);

                }, 10)

            }

        })
    });

};

window.addEventListener('click', (event) => {
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2
    )
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5,
    }
    const projectTile2 = new ProjectTile(canvas.width / 2, canvas.height / 2, 5, 'red', {
        x: velocity.x,
        y: velocity.y
    })
    projectTiles.push(
        projectTile2
    );
    projectTile2.atirarSom();



});

animate();
spawnEnemies();