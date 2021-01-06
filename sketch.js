var player;

gameState = 0;

score = 0;

function preload() {
  flockOfBats1 = loadImage("flock of bats 1.png");
  flockOfBats2 = loadImage("flock of bats 2.png");
  flockOfBats3 = loadImage("flock of bats 3.png");
  playerImg = loadImage("player image.png");
  startButtonImg = loadImage("start button.png");

  groundImage = loadImage("ground2.png");

  winningSound = loadSound("audio clip.wav");
}

function setup() {
  createCanvas(800,500);
  startButton = createSprite(400,320);
  startButton.addImage(startButtonImg);
  startButton.scale = 0.25;

  player = createSprite(200,340);
  player.addImage(playerImg);
  player.scale = 0.3;
  player.visible=false;

  invisibleGround = createSprite(390,470,770,10);
  invisibleGround.visible = false;

  ground = createSprite(350,450,770,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(9);

  batsGroup = createGroup();
}

function draw() {
  background("tan");
  player.collide(invisibleGround);


  if(mousePressedOver(startButton)) {
    gameState = 1;
    startButton.visible = false;
  }
  if(gameState === 1) {
    textSize(15);
    fill("black");
    text("Score: " + score, 600,50);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    player.visible = true;

    if(keyDown("space") && player.y>200) {
      player.velocityY = -11;
    }
     
    player.velocityY = player.velocityY + 0.8

    if(batsGroup.isTouching(player)) {
      score = score + 5;
      batsGroup.destroyEach();
    }

    if(score=== 100) {
      winningSound.play();
      textSize(15);
      fill("black");
      text("You Won!", 390,300);
      player.destroy();
      ground.destroy();
      invisibleGround.destroy();
      batsGroup.destroyEach();
    }

    spawnBats();
  }

  if(gameState === 0) {
    textSize(24);
    fill("black");
    text ("Capture the bats to finish the game!", 200,200);
    textSize(20);
    text ("Click the start button to start", 275,250);
  }

  drawSprites();
}

function spawnBats() {
  if (frameCount % 60 === 0) {
    var bats = createSprite(600,120,40,10);
    bats.y = Math.round(random(50,300));
    bats.addImage(flockOfBats1);
    bats.scale = 0.4;
    bats.velocityX = -10;
    bats.lifetime = 600;
    batsGroup.add(bats);
    bats.setCollider("circle",20,20,20);
  }
}