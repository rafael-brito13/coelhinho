const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  air = loadSound("air.wav")
  cut = loadSound("rope_cut.mp3")
  eating = loadSound("eating_sound.mp3")
  triste = loadSound("sad.wav")
  fundo = loadSound("sound1.mp3")
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile){
    canW = displayWidth 
    canH = displayHeight    
    createCanvas(displayWidth+80,displayHeight);
  } else {
    canW = windowWidth
    canH = windowHeight
    createCanvas(windowWidth,windowHeight)
  }

  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(80,160);
  button2.size(50,50);
  button2.mouseClicked(drop2);  

  button3 = createImg('cut_btn.png');
  button3.position(340,100);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(400,canH-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,canH,600,20);

  rope2 = new Rope(7,{x:80,y:160});

  rope3 = new Rope(7,{x:370,y:100});
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
  fundo.play()
  fundo.setVolume(0.5)

  balao = createImg("balloon.png")
  balao.position(10,300)
  balao.size(150,100)
  balao.mouseClicked(ar)

  mute = createImg("mute.png")
  mute.position(440,80)
  mute.size(50,50)
  mute.mouseClicked(mutar)
}

function draw() 
{
  background(bg_img);
  //image(bg_img,0,0,displayWidth,displayHeight);
  push()
  imageMode(CENTER)
  
  if (fruit != null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show()
  rope3.show()
  Engine.update(engine);
  ground.show();

  if (collide(fruit,bunny) == true){
    bunny.changeAnimation('eat')
    eating.play()
  }

  if (collide(fruit,ground.body) == true){
    bunny.changeAnimation('crying')
    triste.play()
  }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cut.play()
}

function collide (body,sprite){
  if (body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (d <= 80){
      World.remove(engine.world,fruit)
      fruit = null
      return true
    }  
    else {
      return false
    } 
  }
}

function ar(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air.play()
}

function mutar(){
  if (fundo.isPlaying()){
    fundo.stop()
  }
  else {
    fundo.play()
  }
}

function drop2()
{
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
  cut.play()
}

function drop3()
{
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
  cut.play()
}