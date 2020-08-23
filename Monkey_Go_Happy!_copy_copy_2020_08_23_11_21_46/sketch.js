
var monkey,monkey_running;
var ground;
var banana,banana_image;
var forest,forest_image;
var stone,stone_image;
var StoneGroup;
var BananaGroup;
var PLAY=1;
var END =0;
score=1;
var gameState=PLAY;
var count=0;
function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
forest_image = loadImage("jungle.jpg");
banana_image = loadImage("Banana.png");
stone_image = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  forest = createSprite(200,200,20,20);
  forest.addImage("jungle",forest_image);
  
  monkey = createSprite(50,250,20,20);
  monkey.addAnimation("running",monkey_running);
  
  ground = createSprite(200,280,2000,20);
  
  stone = createSprite(650,250,20,20);
  stone.addImage("stone",stone_image);
  
  banana = createSprite(700,150,20,20);
  banana.addImage("banana",banana_image);
  

  StoneGroup=createGroup();
  BananaGroup=createGroup();
}


function draw(){
 background(255); 
  drawSprites();
  if(gameState===PLAY){
    textSize(30)
    fill("white");
  text("SCORE : "+count,200,50);
      monkey.scale =0.1;
  stone.scale = 0.1;
  banana.scale= 0.1;
  monkey.collide(ground);
  forest.velocityX = -5;
  if(forest.x<100){
  forest.x = 200;
  }
  if(ground.x<100){
  ground.x = 200;
  }
  
    if(keyDown("space") && monkey.y>= 239){
      monkey.velocityY=-15;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  spawnStones();
  spawnBananas();
    
    StoneGroup.add(stone);
    BananaGroup.add(banana);
    
    if(StoneGroup.isTouching(monkey)){
      gameState=END;
      monkey.scale=0.2;
      text("TRY AGAIN",200,200);
}
    if(BananaGroup.isTouching(monkey)){
      count=count+1;
      BananaGroup.destroyEach();
      switch(score){
        case 10:monkey.scale=0.12;
          break;
        case 20:monkey.scale=0.14;
          break;
        case 30:monkey.scale=0.16;
          break;
        case 40:monkey.scale=0.18;
          break;
        default: break;
       }
    }
  else if(gameState===END){
      BananaGroup.destroyEach();
      StoneGroup.destroyEach();
      monkey.destroy();
      if(forest.x<100){
      forest.x = 200;
      }
      text("TRY AGAIN",200,200);

  
  }
}
function spawnStones(){
if(World.frameCount % 130===0){
stone = createSprite(650,250,20,20);
  stone.addImage("stone",stone_image);
  stone.scale=0.1;
  stone.velocityX = -15;
  StoneGroup.add(stone);
}
}
function spawnBananas(){
if(World.frameCount % 120===0){
banana = createSprite(700,150,20,20);
  banana.addImage("banana",banana_image);
  banana.scale=0.1;
  banana.velocityX = -5;
  BananaGroup.add(banana);
}
}
}