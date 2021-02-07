/*
    Form should contain the input box and a button to log in.
    
    ● When the button is pressed, the player's name should be registered in the database and a new 
    player should be created.



    The body of an HTML page can contain several different types of elements-
    - h1, h2, h3, h4, h5, h6: display headings of different scales.

    - input: to collect input from the user. INPUT BOX
    - button: to display a button. and perform update on click

    This model of an HTML page is called Document object Model (or DOM).
    We will be using the p5 Dom library to create the form.


*/




class Form {

    /*   
      writing code to create objects even though the blueprint/CONSTRUCTOR isn't
      defined yet. This is called writing code using abstraction 
  */
    constructor() {
        this.title = createElement("h2");
        this.greeting = createElement("h2");
        this.inputbox = createInput("Name");
        this.playButton = createButton("Play");
    }

    hide() {
        this.title.hide();
        this.greeting.hide();
        this.inputbox.hide();
        this.playButton.hide();
    }

    /*
        function call to receive all the input to all parameters on FORM

        For 'this' to continue to refer to the form object, we use arrow functions
        Arrow functions bind the function to the original object which calls it.

        Here mousePressed is called inside the display function which is called by
        the form object. ()=> Arrow function ensures that 'this' remains bound to
        the form object.
    */
    display() {
        this.title.html("Car Racing Game");

        this.title.position(displayWidth / 2 - 50, 0);
        this.inputbox.position(displayWidth / 2 - 40, displayHeight / 2 - 80);
        this.playButton.position(displayWidth / 2 + 30, displayHeight / 2);

        this.playButton.mousePressed(() => {
            this.inputbox.hide();
            this.playButton.hide();

            player.name = this.inputbox.value();
            playerCount += 1;

            player.index = playerCount;
            /*
                function call to change existing value of NAME to a new one based based on the indes(number of the player)
                 according value of parameter passed in the database
            */
            player.updatePlayerRecord();

            /*
              function call to change existing value of playerCount to a new one based on the value of paramter passed in the database
            */
            player.updateCount(playerCount);

            this.greeting.html("Greetings, " + player.name);
            this.greeting.position(1070, 1000);
        });
    }
}