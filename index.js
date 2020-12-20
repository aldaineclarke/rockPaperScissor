"use strict;";


/*
 **Start the Game**
 collect the node for start button
 when the page is loaded it should show the start game section.
 when the button for start game is clicked. the start game section should be hidden.
 the choices for hand signs should then be visible as it awaits user choice.
 add events to each hand sign.
 after the hand sign is chosen then the computer will select a random hand choice;
 assign the image of the hand sign chosen to the right image. while assign the image of the computer chosen to the left image tag.. Then have a count down from three to add the active class to the image elements in the clash.
 if the choice selected by the user is the same as the choice selected by the computer then there is a draw, z-index=4 to the left image.
 else if the choice selected by the user has a weakness to the one selected by the computer then the user wins add the z-index=4 to the right image.
 else if the choice selected by the computer has a weakness to the one selected by the user then the computer wins.
 if the computer wins then add one to the score of the computer
 if the user wins then add one to the score of the user
 if there is a draw then no one gets a score.
 display result on the screen.

 **Update Score**
 gets the score for 

// Using OOP
 **Player object**

 create a class for a which will take no parameter.
 player must have a score
 player must have a name;
 player must have a method to update score.
 player must have a method to reset score.
 player must also have a method called autoDecide. which will make the computer decide.


 **Choice Object**
create a class for the choice 
choice should have a name 
choice should have a weakness
choice must have a method called victory.

//functions
hideOrshow:
takes in an element and then checks to see if there is a class attached with the name hidden
if there is then it will show that element by removing the hidden class
if not then it will add the hidden class to that element that was passed in.

startClash:
this will add active to the images that are encased in the clash class primarily 
before doing this there will be a countdown 3 2 1 then both images will begin rolling to the center.
there may also be other effects included which will take place in this function.

calculateClash:
this will check to see if the choice of both the user and the computer are similar or whoever wins.
this will call the methods to update scores etc.


identify all the icons for the game.
check to see which of the hand signs that was selected.
*/

class Player{
    constructor(name="comp1"){
        this.name = name;
        this.score = 0;   
        this.choice;   
    }
    updateScore(){
        this.score++;
    }
    resetScore(){
        this.score = 0;
    }
    autoDecide(){
        let choices = [rock,paper,scissor]
        let randChoice = Math.floor(Math.random()*choices.length);
        this.choice = choices[randChoice];
    
    }
}

let rock = {
    name:"rock",
    weakness:"paper",
    strength:"scissor",
}
let paper = {
    name:"paper",
    weakness:"scissor",
    strength:"rock",
}
let scissor = {
    name:"scissor",
    weakness:"rock",
    strength:"paper",
}

// dom collections
const user_name = document.querySelector("#userName");
const handSign = document.querySelector(".hand-signs");
const iconScreen = document.querySelector(".icons");
const overlay = document.querySelector(".overlay");
const new_game = document.querySelector(".start-game");
const controls = document.querySelector(".controls");
const winner_screen = document.querySelector(".winner");
let rightBrawler = document.querySelector(".roll-left");
let leftBrawler = document.querySelector(".roll-right");
let userScore = document.querySelector("#p1Score");
let compScore = document.querySelector("#p2Score");
let result = document.querySelector(".result");
let root = document.documentElement;
let styles = getComputedStyle(root);
let rightTransOG = styles.getPropertyValue("--rrTransValue");
let leftTransOG = styles.getPropertyValue("--rlTransValue");
let iconWidth = styles.getPropertyValue('--iconWidth');
let comp1 = new Player();
let player1;






let selected_sign;

// add event listener to each hand sign in the choice menu
    handSign.addEventListener("click",(event)=>{
        selected_sign = event.target.getAttribute("title");
        if ( selected_sign === "rock"){
            player1.choice = rock;
        }else if( selected_sign === "paper"){
            console.log("This was a paper selected;");
            player1.choice = paper;
            console.log(player1.choice);

        }else if ( selected_sign === "scissor"){
            console.log("This was a scissor selected;");
            player1.choice = scissor;

        }else{
            return;
        }
        comp1.autoDecide();
        hideOrshow(overlay);
        hideOrshow(iconScreen);
        startClash()        
        
    });


//FUNCTION DEFINITIONS 
function startClash(){
    assignBrawlers();
    let displayMessage = calculateClash(player1, comp1);
    activateClash();
    setTimeout(()=>{
        result.innerText = displayMessage;
        userScore.innerText =`${player1.score}`;
        compScore.innerText = `${comp1.score}`;
        hideOrshow(controls);
        if(player1.score === 5 || comp1.score === 5){
            hideOrshow(overlay); 
            if (player1.score === 5){
                winner_screen.innerText = ` Congratulations ${player1.name} you won.`;
            }else if(comp1.score ===5 ){
                winner_screen.innerText = "You lost the war."
            }
            setTimeout(()=>{
                winner_screen.innerText = "";
                hideOrshow(overlay);
                newGame();

            },3000)
        }
    },4000)//because this is the time it takes for the animation moving signs to end.



}
function assignBrawlers(){
    rightBrawler.setAttribute("src",`/${comp1.choice.name}.jpg`);
    leftBrawler.setAttribute("src", `/${player1.choice.name}.jpg`);
    console.log(rightBrawler);

}
function calculateClash(player, computer){
    let message;
    console.log(player.name);
    switch(player.choice.name){
        case computer.choice.name:
            drawAnimation();
            message = "There was a draw";
            break;
        case computer.choice.weakness:
            makeImportant(leftBrawler);
            player.updateScore()
            message = "You won"
            // message = `${player.name} won`;
            break;
        case computer.choice.strength:
            makeImportant(rightBrawler);
            message = "Computer won.";
            computer.updateScore();
            break;
    }
    return message;
}

function getUserName(){
    user_name.innerText = document.getElementById("username").value;
    // should in some way leave the start screen to selecting screen
    player1 = new Player(user_name.innerText);
    hideOrshow(new_game);
    hideOrshow(iconScreen);
    
}
function hideOrshow(element){
    element.classList.toggle("hidden");
}
function makeImportant(sign){
    sign.classList.add("bold");
}
function drawAnimation(){  
    root.style.setProperty("--rrTransValue", `${iconWidth}`);
    root.style.setProperty("--rlTransValue", `-${iconWidth}`);


}
function activateClash(){
    leftBrawler.classList.add("active");
    rightBrawler.classList.add("active");
    
}

function playAgain(){
    resetAnimation();
    hideOrshow(overlay);
    hideOrshow(iconScreen);
    hideOrshow(controls);

}
function newGame(){
    resetAnimation();
    hideOrshow(overlay);
    hideOrshow(new_game);
    hideOrshow(controls);
    resetScore();

}
function resetScore(){
    player1.resetScore();
    comp1.resetScore();
    userScore.innerText = 0;
    compScore.innerText = 0;


}
function resetAnimation(){
    root.style.setProperty("--rrTransValue", `${rightTransOG}`);
    root.style.setProperty("--rlTransValue", `${leftTransOG}`);
    leftBrawler.classList.toggle("active");
    rightBrawler.classList.toggle("active");
    leftBrawler.classList.remove("bold");
    rightBrawler.classList.remove("bold");
    result.innerText = " ";
    console.log(result)

}
function finalResult(){
    hideOrshow(overlay);

}

