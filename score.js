const pointsMessage = document.getElementById("pointsMessage");
const scoreMsg= document.getElementById("scoreMsg");
const scoreTable= document.getElementById("scoreTable");



const actualScore = parseInt(localStorage.getItem("actualScore"));
const actualQuestionNumber  = parseInt(localStorage.getItem("actualQuestionNumber"));

pointsMessage.innerText=`Score ${actualScore}/${actualQuestionNumber} `
scoreMsg.innerText=`You scored ${actualScore} out of ${actualQuestionNumber} !
    Your personal best is ${actualScore} !!!`;

scoreTable.innerText= `Tomasz ${actualScore}
Tomasz ${actualScore}
Tomasz ${actualScore}
Tomasz ${actualScore}`
