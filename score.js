const pointsMessage = document.getElementById("pointsMessage");
const scoreMsg= document.getElementById("scoreMsg");
const scoreTable= document.getElementById("scoreTable");


const actualQuestionNumber  = parseInt(localStorage.getItem("actualQuestionNumber"));
const playersArray = JSON.parse(localStorage.getItem("playersArray"));

const {username, actualScore} = JSON.parse(localStorage.getItem("actualPlayer"));
pointsMessage.innerText=`${username} you scored ${actualScore}/${actualQuestionNumber} `;


scoreMsg.innerText=`You scored ${actualScore} out of ${actualQuestionNumber} !
    Your personal best is ${actualScore} !!!`;



playersArray.forEach(p=>{
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(`${p.username} top score ${p.topScore ? p.topScore : "0"} points`));
    scoreTable.appendChild(li);
})

