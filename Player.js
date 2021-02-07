/*
-> databaseReference.on() creates a listener which keeps listening to the
gameState from the database. When the gameState is changed in
the database, the function passed as an argument to it is executed.
Note: Here the function is directly written inside the .on() listener.

-> databaseReference.update() will update the database reference.
Here "/" refers to the main database inside which gameState is created.


writing code to create objects even though the blueprint/ CLASS isn't
defined yet. This is called writing code using abstraction 
*/


/*
    A new player object should be created every time a new user logs in. It should 
    contain all the information about the player - name, distance and rank.....
    For now it can just have the name property.

    It should also be able to read and write player information to 
    the database - for example player count or player name.
*/



class Player {
    /*   
      writing code to create objects even though the blueprint/CONSTRUCTOR isn't
      defined yet. This is called writing code using abstraction 
   */
    constructor() {
        this.index = null;
        this.score = 0;
        this.name = null;
    }

    /*
      function definition to retrieve existing value of playerCount from database
    */
    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", function (data) {
            playerCount = data.val();
        });
    }


    /*
        function definition to change existing value of playerCount to a 
        new one based on the value of paramter passed in the database
    */
    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    /*
        function defintiion to change existing value of RECORDS of each player
        based on the indes(number of the player) according value of paramter passed in the database.

        .set() is used to set the value in the database
    */
    updatePlayerRecord() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            score: this.score
        });
    }

    /*
       Static functions are those common functions which are called by the
       class themselves rather than by objects of the class. We use the
       'static' keyword before the function to make it a static function. 

       function definition to retrieve existing player records: name and distance 
       value for all registered players according to the index in the database  

       The players data will be stored as JSON - since the firebase database
       structure is of JSON type
    */
    static getPlayerInfo() {
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        });
    }


}