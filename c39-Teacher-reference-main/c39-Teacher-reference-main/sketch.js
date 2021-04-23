var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_image, car2_image, car3_image, car4_image, ground_image;

function preload() {
  track=loadImage("images/track.jpg");
  car1_image=loadImage("images/car1.png");
  car2_image=loadImage("images/car2.png");
  car3_image=loadImage("images/car3.png");
  car4_image=loadImage("images/car4.png");
  ground_image=loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  gameState=0;
  distance=0;
  Yvelocity=0;
  Xvelocity=0;
  Xset=false;
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
