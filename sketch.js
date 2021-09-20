const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var arrow;
var baseimage;
var playerimage;

function preload() {
  backgroundImg = loadImage("assets/background.png");
  baseimage = loadImage("assets/base.png");
  playerimage = loadImage("assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(300,playerBase.position.y - 112, 120,120);

  arrow = new PlayerArrow(playerArcher.body.position.x,playerArcher.body.position.y,100,10);
}

function draw() {
  background(backgroundImg);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)
  Engine.update(engine);

  if(keyCode===32){
    arrow = new PlayerArrow(playerArcher.body.position.x,playerArcher.body.position.y,100,10);
    keyPressed();
    keyReleased();
  }


  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);

  playerArcher.display();
  arrow.display();
}


function keyPressed(){
  if (keyCode === 32) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle =new PlayerArrow(posX,posY,100,10,angle);

    Matter.Body.setAngle(arrow.body,angle)
    arrow.shoot(playerArcher.body.angle);
  }
}

function keyReleased(){
  if (keyCode === 32) {
    if (arrow.length){
      var angle = playerArcher.body.angle;
      arrow[arrow.length-1].shoot(angle)
    }

  }
}