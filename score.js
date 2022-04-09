import {displayPointsMessage} from "./displayHelpers.js";

const scoreMsg= document.getElementById("scoreMsg");
const scoreTable= document.getElementById("scoreTable");
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
    const {username, actualScore} = actualPlayer;
    const playersArray = JSON.parse(localStorage.getItem("playersArray"));
    const sortedPlayersArray = sortPlayersArray(playersArray);
    displayPointsMessage(actualPlayer, actualQuestionNumber);
    displayMessages(actualQuestionNumber, username, actualScore);
    displayScoreBoard(sortedPlayersArray);
}


function displayMessages(actualQuestionNumber, username, actualScore) {
    scoreMsg.innerText=`${username} you scored ${actualScore} out of ${actualQuestionNumber} !
    Your personal best is ${actualScore} !!!`;
}


function sortPlayersArray(playersArray){
let sortedPlayersArray = [...playersArray];
    sortedPlayersArray.sort((a, b) => b.topScore - a.topScore);
    return  sortedPlayersArray;
}

function displayScoreBoard (sortedPlayersArray) {
    sortedPlayersArray .forEach(p=>{
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(`${p.username} top score ${p.topScore ? p.topScore : "0"} points`));
        scoreTable.appendChild(li);
    })
}



