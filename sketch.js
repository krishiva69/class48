var bg, bgImage;
var car, carImage, car2, car2Img, car3, bus;
var coins, coinsImage;
var coinsG, obstaclesG;
var score = 0;
var gameState = "PLAY"
var goImage, go;
//var x = ["fodder", "oep", 1]
//nsole.log(x[2])
//console.log(x.length)

function preload(){
bgImage = loadImage("bg&road.png")
carImage = loadImage("car.png")
coinsImage = loadImage("coin.png")
car2Img = loadImage("car1.png")
car3 = loadImage("car2.png")
bus = loadImage("bus.png")
  goImage = loadImage("go.png")
}

function setup(){
createCanvas(650, 400)
bg = createSprite(400, 200)
bg.addImage(bgImage)
  bg.scale = 1.4;
  bg.velocityX = -4
  
  
car = createSprite(80, 340)
car.addImage(carImage);
car.scale = 0.2
car.velocityY = 0;
 // car.debug = true;
  //car.setCollider("circle", 0, 0, 1)
  
  go = createSprite(325, 200);
  go.addImage(goImage)
  
coinsG = new Group();
obstaclesG = new Group();
}

function draw(){
background("green")
  
  if(bg.x < 230){
bg.x = bg.width/1.5;
}
  
if(gameState === "PLAY"){
  
  go.visible = false;
  
if(keyDown("up")&& car.y >= 300){
car.y = car.y -2;
}
  
if(keyDown("down")&& car.y <= 340){
car.y = car.y + 5;
}
  

  
spawnCoins();
spawnObstacles();
  
for(var i = 0; i < coinsG.length; i++)
{  
if(car.isTouching(coinsG[i])){
score = score + 5;
coinsG[i].destroy();
}
}
  if(obstaclesG.isTouching(car)){
gameState = "END"
  }
}
else if(gameState === "END"){
  go.visible = true;
obstaclesG.setVelocityXEach(0)
coinsG.setVelocityXEach(0)
coinsG.destroyEach();
car.velocityY = 0;
  bg.velocityX = 0;

}
drawSprites();

fill("white");
textSize(20);
text("Score " + score, 550, 65)
  
}

function spawnCoins (){
if(frameCount%60 === 0){
coins = createSprite(620, 300, 10, 10);
coins.y = Math.round(random(300, 340))
coins.addImage(coinsImage)
coins.velocityX = -3;
coins.scale = 0.15;
  coins.lifetime = 300;
  coinsG.add(coins)
}
}

function spawnObstacles(){
if(frameCount%120 === 0){
car2 = createSprite(600, 350, 40, 20)
car2.velocityX = -4
var r = Math.round(random(1,3))
switch(r){
  case 1: car2.addImage(car2Img)
    break;
    case 2: car2.addImage(car3)
  break;
  case 3: car2.addImage(bus)
break; 
default: break
}
car2.scale = 0.4;
    car2.lifetime = 300
    obstaclesG.add(car2)
}
}