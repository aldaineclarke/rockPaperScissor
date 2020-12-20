"use strict;";
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
            player1.choice = paper;
        }else if ( selected_sign === "scissor"){
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
    rightBrawler.setAttribute("src",`${comp1.choice.name}.jpg`);
    leftBrawler.setAttribute("src", `${player1.choice.name}.jpg`);

}
function calculateClash(player, computer){
    let message;
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

}


