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


var fruit;

//variáveis para cordas, antiga e  novas (rope2, rope3)
var rope1;

//variáveis para restrições, antiga e novas (fruit_con_2, fruit_con_2)
var fruit_con_1;

//botões antigos e novos (cutB2, cutb3)
var cutB1, muteB;


var bg_img, food, rabbit;


var bunny;
var blink, eat, sad;


var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

//verificação de celular, analisar
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);



function preload() {

  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');


  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');


  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {

  //verificação para o canvas, aluno



  frameRate(80);


  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  cutB1 = createImg('cut_btn.png');
  cutB1.position(20, 30);
  cutB1.size(50, 50);
  cutB1.mouseClicked(drop);

  //btn 2 


  //btn 3 



  muteB = createImg('mute.png');
  muteB.position(450, 20);
  muteB.size(50, 50);
  muteB.mouseClicked(mute);

  //cordas. Antiga e novas (criar)
  rope1 = new Rope(8, { x: 40, y: 30 });



  blink.frameDelay = 20;
  eat.frameDelay = 20;


  bunny = createSprite(370, 600, 100, 100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope1.body, fruit);

  //links: cordas e fruta (criar)
  fruit_con_1 = new Link(rope1, fruit);



  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() {
  background(51);

  //verificação para exibição de imagem, aluno



  Engine.update(engine);

  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();


  //exibição das cordas (criar)
  rope1.show();




  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit = null;
  }
  drawSprites();
}

//function 1 drop
function drop() {
  cut_sound.play();
  rope1.break();
  fruit_con_1.detach();
  fruit_con_1 = null;
}

//funções para cortar as cordas novas (drop2, drop3)









function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}


function mute() {
  if (bk_song.isPlaying()) {
    bk_song.stop();
  }
  else {
    bk_song.play();
  }
}


