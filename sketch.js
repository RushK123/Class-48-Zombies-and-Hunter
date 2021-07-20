var bg, bgImg;
var player, shooterImg, shooter_shooting, zombieGroup;
var gameState = 1;
var bulletGroup, bullet;
var playerLife = 3;
var heart1, heart2, heart3, playerLDisplay;
var score = 0;
var bulletCount1 = 15;
var bulletCount2 = 110;


function preload() {

  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
  heart1 = loadImage("assets/heart_1.png");
  heart2 = loadImage("assets/heart_2.png");
  heart3 = loadImage("assets/heart_3.png");
}

function setup() {


  createCanvas(windowWidth, windowHeight);

  player = createSprite(windowWidth / 4, windowHeight - 180, 50, 50);
  player.addImage("dashooter", shooterImg);
  player.addImage("shooting", shooter_shooting);
  player.scale = 0.3;

  playerLDisplay = createSprite(player.x, player.y -90, 50, 50);
  playerLDisplay.scale = 0.2;
  playerLDisplay.addImage("heartone", heart1);
  playerLDisplay.addImage("hearttwo", heart2);
  playerLDisplay.addImage("heartthree", heart3);
  playerLDisplay.changeImage("heartthree")

  zombieGroup = new Group()
  bulletGroup = new Group();
}

function draw() {
  background(bgImg);
  playerLDisplay.x = player.x
  playerLDisplay.y = player.y-90

  if (gameState == 1) {
    gameOn();
  }

  drawSprites();

  fill("green")
  textSize(25);
  text("Slain Zombies = " + score, windowWidth/2-80, 150);

  fill("white");
  textSize(15);
  text(bulletCount1+"/"+bulletCount2,player.x-30, player.y+90, 50, 50)

  if (score >= 5){

    fill("green")
    textSize(10)
    text("Great Job! 5 Slain (Achievement! Next at 20)", windowWidth/2 - 80, 200)

  }
  if (score >= 20){

    fill("green")
    textSize(10)
    text("Great Job! 20 Slain (Achievement! Next at 100)", windowWidth/2 - 80, 220)

  }
  if (score >= 100){

    fill("green")
    textSize(10)
    text("Great Job! 100 Slain (Achievement! Pro Stage!)", windowWidth/2 - 80, 230)

  }
}




function gameOn() {

  if (keyDown(RIGHT_ARROW)) {
    player.x += 4;
  }
  if (keyDown(LEFT_ARROW)) {
    player.x -= 4;
  }
  if (keyDown(UP_ARROW)) {
    player.y -= 4;
  }
  if (keyDown(DOWN_ARROW)) {
    player.y += 4;
  }
  if (keyWentDown("space") && bulletCount2 >= 0) {
    player.changeImage("shooting");
    shootBullets();
    bulletCount1 -= 1

    if(bulletCount1 == 0){
      bulletCount2 -= 15;
      bulletCount1 += 15;
    }

    if(bulletCount2 <= 0){
      bulletCount2 = 0;
      bulletCount1 = 0;
      playerLife = 0;
    }
  }
  if (keyWentUp("space")) {
    player.changeImage("dashooter");
  }
  spawnZombies();

  if (player.isTouching(zombieGroup)){
    for (var i=0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy();
        playerLife -= 1;
      }
    }
  }

  if (bulletGroup.isTouching(zombieGroup)){
    for (var i=0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        score += 1;
      }
    }
  }

  if (playerLife === 0){
    playerLDisplay.destroy();
    player.destroy();
    zombieGroup.destroyEach();
    fill ("red");
    textSize(30);
    text ("Game Over", windowWidth/2-50, 100);

  }

  if (playerLife === 1){
    playerLDisplay.changeImage("heartone")
  }
  if (playerLife === 2){
    playerLDisplay.changeImage("hearttwo")
  }
  if (playerLife === 3){
    playerLDisplay.changeImage("heartthree")
  }

}


function spawnZombies() {

  if (frameCount % 100 == 0){
    zombie = createSprite(random(windowWidth-300, windowWidth-400), random(windowHeight-200, windowHeight- 500), 50, 50);
    zombie.addImage(zombieImg);
    zombie.scale = 0.13;
    zombie.lifetime = 300;
    zombie.velocityX = -2;
    zombieGroup.add(zombie);
  }

}  


function shootBullets() {
  bullet = createSprite(player.x, player.y-10, 7, 3);
  bullet.lifetime = 140;
  bullet.velocityX = 20;
  bulletGroup.add(bullet);

}