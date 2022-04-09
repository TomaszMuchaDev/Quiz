export function displayPointsMessage(actualPlayer, actualQuestionNumber){
    const pointsMessage = document.getElementById("pointsMessage");
    const {username, actualScore} = actualPlayer;
    pointsMessage.innerText=`${username} you scored ${actualScore}/${actualQuestionNumber} `;
}
