/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score,activePlayer,roundScore,gamePlaying;
init();
function init(){
    gamePlaying=true;
    score=[0,0];
    activePlayer=0;
    roundScore=0;
    document.querySelector("#name-0").textContent="Player1"
    document.querySelector("#name-1").textContent="Player2"
    document.querySelector(".dice").style.display="none";
    document.querySelector("#score-0").textContent="0";
    document.querySelector("#score-1").textContent="0";
    document.querySelector("#current-0").textContent="0";
    document.querySelector("#current-1").textContent="0";
}


document.querySelector(".btn-roll").addEventListener("click",function(){

    if(gamePlaying){
        // Random number
        var dice=Math.floor(Math.random()*6)+1;

        // Update the dice variable in images of dice.
        document.querySelector(".dice").style.display="block";
        document.querySelector(".dice").src="./static/dice-"+dice+".png";

        // Update the roundScore if the dice value is not 1
        if(dice>1){
            //Add score
            roundScore+=dice;
            document.querySelector("#current-"+activePlayer).textContent=roundScore;
        }
        else{
            nextPlayer();

        }
    }

});

document.querySelector(".btn-hold").addEventListener("click",function(){

    if(gamePlaying){
        // Global score
        score[activePlayer]+=roundScore;
        document.querySelector("#score-"+activePlayer).textContent=score[activePlayer];
        roundScore=0;
        document.querySelector("#current-"+activePlayer).textContent=roundScore;

        // Check winner
        if(score[activePlayer]>=100){
            document.querySelector("#name-"+activePlayer).textContent="Winner!";
            document.querySelector(".dice").style.display="none";
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            gamePlaying=false;
        }
        else{
                // Next player
                nextPlayer();
        }
    }


});

function nextPlayer(){
        roundScore=0;
        document.querySelector("#current-"+activePlayer).textContent=roundScore;

        document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");

        activePlayer===0 ? activePlayer=1 : activePlayer=0;

        document.querySelector(".player-"+activePlayer+"-panel").classList.add("active");

        document.querySelector(".dice").style.display="none";
}

document.querySelector(".btn-new").addEventListener("click",function(){
    document.querySelector(".player-"+activePlayer+"-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
    init();
})

