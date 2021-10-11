

var whale,whale_image
var ground, invisibleGround, groundImage;
var ran;
var cloudImage,balloon,balloon_image;
var bggroundImage;
var obstacle,obstacleImg1,obstacleImg2;
var rand,obstacleGroup1,obstacleGroup2;
var whaleSad,edges;
var gameState="serve", restart,restartImg;
var score=0;


//Preload function to load Images, Sounds,Animation
function preload(){
  whale_image = loadAnimation("whale_original_wob1.png","whale2_wob1.png","whale_wob3.png");
  whale_image2=loadAnimation("whale_right.png","whale2_right.png","whale3_right.png")
  whaleSad=loadAnimation("whale_sad_left.png");

  bggroundImage = loadImage("stillwater_background.jpg");
 
  obstacleImg1=loadImage("cargoShip.png");
  obstacleImg2=loadImage("garbage2.png");
  obstacleImg3=loadImage("cargoShip1.png")
  obstacleImg3=loadImage("net.png");
   
  oilSpill=loadImage("oilSpill.png");
  oilPipe=loadImage("oil_spill.png");
  netImg=loadImage("net.png");

  restartImg=loadImage("refresh.png");

  //Sounds
  introSound=loadSound("introSound.wav");
  jump=loadSound("jump.wav");
  loseSound=loadSound("loseSound.wav");
  gameOverSound=loadSound("gameOver.wav");
}

//For initial setup
function setup() {

 createCanvas(800,600)
  obstacleGroup1=new Group() //Create groups to put all the related obstacles in one unit.
  obstacleGroup2=new Group()
  
  //create a ground sprite
  ground = createSprite(650,350,100,20); //Create ground
  ground.visible=false //make the ground invisible
  
  

  whale = createSprite(650,300,20,50);  //Create the whale Sprite
  whale.addAnimation("running", whale_image); //Add animations
  whale.addAnimation("right",whale_image2);
  whale.addAnimation("soSad",whaleSad);
  whale.scale = 0.14;
  
  //whale.debug=true
  whale.setCollider("circle",0,0,40)  // To change the collider's shape to circle
 
  industryWastePipe=createSprite(700,250,20,40); // To display the industrial waste draining pipe
  industryWastePipe.addAnimation("oil",oilPipe);
  industryWastePipe.scale=0.6
  industryWastePipe.visible=false;

  restart=createSprite(400,200,20,20);  //For restart icon
  restart.addImage("restart",restartImg);
  restart.visible=false;  // To make invisible
  restart.scale=0.14;   // To scale it's size 

}

function draw() {
  
  edges=createEdgeSprites();
  whale.collide(edges);
//GAMESTATE SERVE
 if(gameState=="serve"){    

      background("aqua");
      introSound.play();
      restart.visible=false;
      textSize(20);
      strokeWeight(10);
      fill("coral")
      textFont("Comic Sans MS")
      text(" Marine ecosystem is very sensitive.",30,30);
      text(" Even 1 degree rise in temperature is very dangerous to the marine life.",30,60);
      text(" Erie, the whale, is trying to escape from the perils of pollution.",30,90)
      text(" Help Erie!!!SAVE THE WHALE!!!",30,120);
      textSize(40)
      text("   Press ENTER to Start.",20,240);
      text("   For right: Right Arrow.",20,300);
      text("   For left: Left Arrow.",20,370)
      
      whale.addAnimation("running", whale_image);
      whale.scale=.25

      if(keyDown("enter")&&gameState=="serve"){
        gameState="play"
      }
  
 }

 //GAME STATE SERVE
 if(gameState=="play"){
  
    background(bggroundImage);
    score=score+1;
    textSize(20);
      strokeWeight(10);
      fill("yellow")
      textFont("Comic Sans MS")
    text("Score: "+score,50,50);
      
    whale.scale=0.14;
    //whale.collide(ground);
    if(keyDown("left")&& whale.y >= 300) {
        jump.play();
        whale.velocityY = -10;
        whale.velocityX=-2;
        ground.velocityX=whale.velocityX;
        whale.changeAnimation("running", whale_image);
    }

    if(keyDown("right")&&whale.y>=300){
        jump.play();
        whale.changeAnimation("right",whale_image2);
        whale.velocityY = -10;
        whale.velocityX=2;
        ground.velocityX=whale.velocityX;
        industryWastePipe.visible=true;
       
    }
    
      whale.velocityY = whale.velocityY + 0.2
      

      SpawnObstacle()

    if(industryWastePipe.visible==true){
       rightSideDanger()
    }

   if(obstacleGroup1.isTouching(whale)||obstacleGroup2.isTouching(whale)){
    
      score=score;
      loseSound.play()
      whale.changeAnimation("soSad",whaleSad);
      whale.velocityY=4; 
      ground.destroy()
      whale.velocityX=0
     
    
    }

   if(whale.y>500){
     gameState="end"
  }
     //stop whale from falling down
    whale.collide(ground);

 }

 //GAME STATE END
 if(gameState=="end"){
   
   score=0;

    whale.velocityX=0;
    whale.velocityY=0; 
    whale.changeAnimation("soSad",whaleSad);
    
    restart.visible=true;
  
    obstacleGroup1.setVelocityXEach(0);
    obstacleGroup1.setLifetimeEach(-1);
    obstacleGroup2.setVelocityXEach(0);
    obstacleGroup2.setLifetimeEach(-1); 
    if(mousePressedOver(restart)){
      whale.destroy();
    
      restart1()
    }
}

  drawSprites();
  
}

function SpawnObstacle(){

  if(frameCount%350==0){
    var obstacle=createSprite(10,300,20,40);
    obstacle.velocityX=2
    obstacle.scale=0.3
    obstacle.lifetime=550

    ran= Math.round(random(1,4))
    switch(ran){
      case 1: obstacle.addImage("ship",obstacleImg1);
              break;
      case 2: obstacle.addImage("garbage",obstacleImg2);
              break; 
      case 3: obstacle.addImage("fishingNet",netImg)
               break;
      case 4: obstacle.addImage("cargo2",obstacleImg3);
               break;           
      default: break                
    }
    obstacleGroup1.add(obstacle)
  }
}

function rightSideDanger(){

  if(frameCount%227==0){
    var obstacle2=createSprite(590,330,20,40);
    obstacle2.addImage("oil",oilSpill)
    obstacle2.velocityX=-2
    obstacle2.scale=0.3
    obstacle2.lifetime=550
    obstacleGroup2.add(obstacle2)
    
  }
}

function restart1(){
  whale=createSprite(650,300,20,50);
  whale.addAnimation("running", whale_image);
  whale.addAnimation("right",whale_image2);
  whale.addAnimation("soSad",whaleSad);
  whale.changeAnimation("running", whale_image);
  whale.setCollider("circle",0,0,30);
  ground=createSprite(whale.x,whale.y+50,100,20);

  ground.visible=false;
  whale.scale=0.4;
  whale.collide(ground);
  obstacleGroup1.destroyEach();
  obstacleGroup2.destroyEach();
  industryWastePipe.visible=false;
  gameState="serve"
}
