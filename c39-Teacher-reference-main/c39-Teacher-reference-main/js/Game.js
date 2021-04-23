class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_image);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_image);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_image);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_image);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
            background(rgb(198,135,103));
            image(track, 0, displayHeight*4, displayWidth, displayHeight*5)

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200+(index*200)+allPlayers[plr].xPosition;
        //x = allPlayers[plr].xPosition
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
  if(player.distance<2150){

    if(keyIsDown(38) && player.index !== null){
      Yvelocity+=0.9;
     
      if(keyIsDown(37)){
        Xvelocity-=0.2
      }
      if(keyIsDown(39)){
        Xvelocity+=0.2
      }
      Yvelocity-=0.1
    }

     else if(keyIsDown(38) && Yvelocity>0 && player.index!== null){
       Xvelocity*=0.9
     }

     else{
       Xvelocity*=0.985
       Yvelocity*=0.985
     }
    }

      //player.distance +=10
      player.distance+=Yvelocity
      Yvelocity*=0.98
      player.xPosition+=Xvelocity
      XVelocity*=0.985
      player.update();

    //if(player.distance > 3860){ 
      //gameState = 2; player.rank +=1 
      //Player.updateCarsAtEnd(player.rank) 
      //}

    drawSprites();
}
  end() {
    console.log("End Of Game");
    console.log(player.rank);
  }
}
