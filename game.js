const regionMessage = document.getElementById("regionMessage");
const countryCard = document.querySelectorAll(".countryCard");
const flagOne = document.getElementById("flagOne");
const flagTwo= document.getElementById("flagTwo");
const flagThree = document.getElementById("flagThree");
const questionCountry = document.getElementById("questionCountry");
const btnSubmitAnswer =document.getElementById("btnSubmitAnswer");
const pointsMessage = document.getElementById("pointsMessage");



flagOne.addEventListener("click", handleFlagOneClick);
flagTwo.addEventListener("click", handleFlagTwoClick);
flagThree.addEventListener("click", handleFlagThreeClick);
btnSubmitAnswer.addEventListener("click", handleSubmit);

let clickedFlag;
let winningCountry;
let answerCountry;

const countriesForRound = [];
let actualQuestionNumber  = parseInt(localStorage.getItem("actualQuestionNumber"));
const actualPlayer = JSON.parse(localStorage.getItem("actualPlayer"));


initialDisplay();
drawCountriesForQuestion();


function initialDisplay(){
    pointsMessage.innerText=`${actualPlayer.username} you scored ${actualPlayer.actualScore}/${actualQuestionNumber} `;
    btnSubmitAnswer.disabled=true;
    btnSubmitAnswer.classList.add("btnSubmitAnswerDisabled");
    const region = localStorage.getItem("region");
    regionMessage.innerText = "Region is " + region  + ".";
}

function handleFlagOneClick(e){
    handleClickedFlags(e);
    clickedFlag = e.target.dataset.flag;
    answerCountry = countriesForRound[0];
}

function handleFlagTwoClick(e){
    handleClickedFlags(e);
    clickedFlag = e.target.dataset.flag;
    answerCountry = countriesForRound[1];
}

function handleFlagThreeClick(e){
    handleClickedFlags(e);
    clickedFlag = e.target.dataset.flag;
    answerCountry = countriesForRound[2];
}


function handleClickedFlags(e){
    btnSubmitAnswer.disabled=false;
    btnSubmitAnswer.classList.remove("btnSubmitAnswerDisabled");
    countryCard.forEach(b =>{
        b.classList.remove("countryCardClicked");
        b.innerText="";});
    e.target.classList.add("countryCardClicked");
    e.target.innerText="✓";
}


// randomly select 3 countries to be displayed and removed from round countries

function drawCountriesForQuestion(){
    const drawnCountries = JSON.parse(localStorage.getItem("drawnCountries"));
    const flags = [flagOne, flagTwo, flagThree];

    for(let i=0; i<=2; i++)
    {
        const random = Math.floor(Math.random()*drawnCountries.length);
        countriesForRound.push(drawnCountries[random]);
        flags[i].style.backgroundImage = `url('${drawnCountries[random].flagPath}')`;
        drawnCountries.splice(random, 1);
    }
    localStorage.setItem("drawnCountries", JSON.stringify(drawnCountries));
    drawWinningCountry(countriesForRound);
}

// randomly select 1 wining country;

function drawWinningCountry (countriesForRound){
    const random = Math.floor(Math.random()*countriesForRound.length);
    winningCountry = countriesForRound[random];
    questionCountry.innerText= winningCountry.name + ".";
    localStorage.setItem("winningCountry", JSON.stringify(winningCountry));
}


// handle if correct flag is chosen
function handleSubmit (){

    if(!clickedFlag)
    {
        alert("Please click on flag you think is a correct answer.");
    }
    else
    {
        handlingScore();
        actualQuestionNumber +=1;
        localStorage.setItem("actualQuestionNumber", actualQuestionNumber.toString());
        localStorage.setItem("answerCountry", JSON.stringify(answerCountry));

        //function is used to create time for local storage to be updated
        setTimeout(()=>{
           window.location = "./result.html";
        }, 500)

    }

function handlingScore(){

    if(winningCountry.name === answerCountry.name)
    {
        actualPlayer.actualScore +=1;
        handlingTopScore();
    }
    localStorage.setItem("actualPlayer",JSON.stringify(actualPlayer));
}


function handlingTopScore()
{

    if(actualPlayer.topScore <actualPlayer.actualScore)
    {
        actualPlayer.topScore =actualPlayer.actualScore;

        let playersArray = JSON.parse(localStorage.getItem("playersArray"));
        playersArray.map(p=>{
            if(p.username === actualPlayer.username || !p.topScore)
            {
                p.topScore =actualPlayer.actualScore;
            }
            localStorage.setItem("playersArray", JSON.stringify(playersArray));
        });
    }
}

}




