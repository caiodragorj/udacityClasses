let allEnemies = [],
    allVidas = [],
    player,
    vida,
    vidas = 3;

// Enemies our player must avoid
var Enemy = function(x,y,vel, nm) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = vel;
    this.name = nm;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   this.x = this.x +this.speed * dt;
   
   if (this.x > 520) {
       this.x = 0;
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Vida = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
}

Vida.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.speed = 100;
    this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   // console.log("this y", this.y)
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.y <= -25) {
        this.y = 400;
        alert("Parabéns você ganhou!")
        location.reload();
    }
    if (this.x > 400) {
        this.x = 400 ;
    }
    if (this.x < 0) {
        this.x = 0 ;
    }
    collision(this.x, this.y);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
   // console.log("key",key);
    if (key === 'down') {
        this.y = this.y+85;
    }
    if (key === 'up') {
        this.y = this.y-85;
    }
    if (key === 'left') {
        this.x = this.x-100;
    }
    if (key === 'right') {
        this.x = this.x+100;
    }
}
Player.prototype.die = function(){
    this.x = 0;
    this.y = 400;
    vidas--;
    allVidas.pop();
    if (vidas==0) {
        alert("Game Over")
        location.reload();
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let callEnemies = function(){

    let enemy = new Enemy (0, Math.floor((Math.random() * 63) + 45), 200,'enemy');
    let enemy1 = new Enemy (0, Math.floor((Math.random() * 100) + 45), 60,'enemy1');
    let enemy2 = new Enemy (0, Math.floor((Math.random() * 116) + 85), 100,'enemy2');
    let enemy3 = new Enemy (0, Math.floor((Math.random() * 130) + 120), 300,'enemy3');
    let enemy4 = new Enemy (0, Math.floor((Math.random() * 100) + 80), 500,'enemy4');
    let enemy5 = new Enemy (0, Math.floor((Math.random() * 100) + 80), 700,'enemy5');
    // allEnemies.push(enemy,enemy1);
    allEnemies.push(enemy,enemy1,enemy2,enemy3,enemy4, enemy5);
};

let summonPlayer = function(){
    player = new Player(200,400);
}
let initVida = function(){
    let vida1 = new Vida(420,0);
    let vida2 = new Vida(380,0);
    let vida3 = new Vida(340,0);

    allVidas.push(vida1,vida2,vida3);
}

let collision = function(playerX, playerY){
    allEnemies.forEach(function(item){
        if ((item.x < playerX +35 && item.x +35 > playerX) && (item.y < playerY +35 && item.y +35 > playerY)) {
            // //console.log("Racabau!")
            player.die();
        }
    })
}
callEnemies();
initVida();
summonPlayer();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
