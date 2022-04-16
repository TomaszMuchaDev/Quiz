import {displayPointsMessage} from "./displayHelpers.js";

const scoreMsg= document.getElementById("score-msg");
const scoreTable= document.getElementById("score-table");
const btnHamburgerMenu = document.getElementById("btnHamburgerMenu");
const hamburgerMenu = document.getElementById("hamburgerMenu");

btnHamburgerMenu.addEventListener("click", ()=>{
    hamburgerMenu.classList.toggle("menuMobile")});


updateScoreTable();

function updateScoreTable (){
    const audio = new Audio('./Assets/SoundEffects/score.mp3');
    audio.play();
    const actualQuestionNumber  = parseInt(localStorage.getItem("actualQuestionNumber"));
    const actualPlayer= JSON.parse(localStorage.getItem("actualPlayer"));
    const {username, actualScore, topScore} = actualPlayer;
    const playersArray = JSON.parse(localStorage.getItem("playersArray"));
    const sortedPlayersArray = sortPlayersArray(playersArray);
    displayPointsMessage(actualPlayer, actualQuestionNumber);
    displayMessages(actualQuestionNumber, username, actualScore, topScore);
    displayScoreBoard(sortedPlayersArray, username);
}


function displayMessages(actualQuestionNumber, username, actualScore, topScore) {
    scoreMsg.innerText=`${username} you scored ${actualScore} out of ${actualQuestionNumber} !
    Your personal best is ${topScore} !!!`;
}


function sortPlayersArray(playersArray){
let sortedPlayersArray = [...playersArray];
    sortedPlayersArray.sort((a, b) => b.topScore - a.topScore);
    return  sortedPlayersArray;
}

function displayScoreBoard (sortedPlayersArray, actualName) {
    sortedPlayersArray .forEach(p=>{
     const row = document.createElement("tr");
     const userName = document.createElement("td");
     const topScore = document.createElement("td");

     userName.innerText=p.username;
     topScore.innerText= p.topScore? p.topScore: 0;
     if(p.username === actualName)
     {
         userName.className ="score-actualPlayer";
         topScore.className= "score-actualPlayer";
     }

     scoreTable.append(row);
     scoreTable.append(userName);
     scoreTable.append(topScore);
    })
}



