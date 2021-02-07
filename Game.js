/* 

Game object should be able to hold the state of the game. 

It should be able to display form when game state is 0(WAIT) 
or the game when the game state is 1(PLAY) 
or leaderboard when the game state is 2(END).

For now, we will only consider the case when game state is 0

*/

class Game {
    constructor() {

    }

    /*
       function definition to get/read/retrieve existing value of gameState from database
   */
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        });
    }


    /*
            -> databaseReference.update() will update the database reference.
            Here "/" refers to the main database inside which gameState is created.
        */
    /*
       function definition to change existing value of gameState to a 
       new one based on the value of paramter passed in the database
    */
    updateState(stateInput) {
        database.ref('/').update({
            gameState: stateInput
        });
    }

    async start() {
        if (gameState == 0) {
            player = new Player();//creating a new player object
            player.getCount();//get the existing value of the field:**playerCount**from the database and assign it to variable = playerCount

            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount(); //get the number of players registered
            }

            form = new Form();//creatng a new form object
            form.display();
        }
        trex1 = createSprite(50, 180, 20, 50);
        trex1.addAnimation("running", trex_running);
        trex1.addAnimation("collided", trex_collided);
        trex1.scale = 0.5;

        trex2 = createSprite(50, 180, 20, 50);
        trex2.addAnimation("running", trex_running);
        trex2.addAnimation("collided", trex_collided);
        trex2.scale = 0.5;

        trexes = [trex1, trex2];

        ground = createSprite(200, 180, 400, 20);
        ground.addImage("ground", groundImage);
        ground.x = ground.width / 2;
        ground.velocityX = -(6 + 3 * score / 100);

        gameOver = createSprite(300, 100);
        gameOver.addImage(gameOverImg);

        restart = createSprite(300, 140);
        restart.addImage(restartImg);

        gameOver.scale = 0.5;
        restart.scale = 0.5;

        gameOver.visible = false;
        restart.visible = false;

        invisibleGround = createSprite(200, 190, 400, 10);
        invisibleGround.visible = false;

        //cloudsGroup = new Group();
       // obstaclesGroup = new Group();
       score = 0;
    }
    play() {
        form.hide();


        // textSize(30);
        // text("Game Start", 120, 100);

        /*
            static function call to retrieve existing player records: name and distance 
            value for all registered players according to the index in the database  
        */
        Player.getPlayerInfo();

        if (allPlayers !== undefined) {
            //var display_position = 130;



            // background(rgb(198, 135, 103));
            // image(track, 0, - displayHeight * 4, displayWidth, displayHeight * 5);

            //index of the array
            var index = 0;

            //x and y position of the cars
            var x = 275;
            var y;

            //for every player object inside allPlayers
            for (var plr in allPlayers) {

                //add 1 to the index for every loop
                index = index + 1;

                //position the cars a little away from each other in x direction
                x = x + 200;

                //use data from the database to display the cars in y direction
                y = displayHeight - allPlayers[plr].score;

                //trexes[index - 1].x = x;
                //trexes[index - 1].y = y;


                if (index === player.index) {
                    stroke(10);
                    fill("yellow");
                    ellipse(x, y, 60, 60);
                   // trexes[index - 1].shapeColor = "red";
                   // trex2[index - 1].shapeColor = "red";
                   // camera.position.x = displayWidth / 2;
                  //  camera.position.y = trexes[index - 1].y;
                } else {                     
                    //trexes[index - 1].shapeColor = "black";
                  // trex2[index - 1].shapeColor = "black";
                }

                //display_position += 20;
                //textSize(15);
                //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, display_position);
                if (gameState === 1) {
                    score = score + Math.round(getFrameRate() / 60);
                    ground.velocityX = -(6 + 3 * score / 100);

                    if (keyIsDown(32) && trex1.y <= 162) {
                        trex1.velocityY = -12;
                    }        
                                                                   
                    trex1.velocityY = trex1.velocityY + 0.8;

                    if (ground.x < 0) {
                        ground.x = ground.width / 2;
                    }

                    trex1.collide(invisibleGround);
                   // spawnClouds();
                   // spawnObstacles();

                   // if (obstaclesGroup.isTouching(trex)) {
                   //     gameState = 2;
                    //}
                }
                else if (gameState === 2) {
                    gameOver.visible = true;
                    restart.visible = true;

                    //set velcity of each game object to 0
                    ground.velocityX = 0;
                    trex.velocityY = 0;
                    obstaclesGroup.setVelocityXEach(0);
                    cloudsGroup.setVelocityXEach(0);

                    //change the trex animation
                    trex1.changeAnimation("collided", trex_collided);
                    trex2.changeAnimation("collided", trex_collided);


                    //set lifetime of the game objects so that they are never destroyed
                    obstaclesGroup.setLifetimeEach(-1);
                    cloudsGroup.setLifetimeEach(-1);

                    if (mousePressedOver(restart)) {
                        reset();
                    }
                }
            }
        }

        drawSprites();
    }
}