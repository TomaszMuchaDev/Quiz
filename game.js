const regionMessage = document.getElementById("regionMessage");
const  countryCard = document.querySelectorAll(".countryCard");
const flagOne = document.getElementById("flagOne");
const flagTwo= document.getElementById("flagTwo");
const flagThree = document.getElementById("flagThree");
const questionCountry = document.getElementById("questionCountry");
const btnSubmitAnswer =document.getElementById("btnSubmitAnswer");


let clickedFlag;
btnSubmitAnswer.disabled=true;
btnSubmitAnswer.classList.add("btnSubmitAnswerDisabled");

const region = localStorage.getItem("region");
regionMessage.innerText = "Region is " + region  + ".";


flagOne.addEventListener("click", handleFlagOneClick);
flagTwo.addEventListener("click", handleFlagTwoClick);
flagThree.addEventListener("click", handleFlagThreeClick);


function handleFlagOneClick(e){
    handleClickedFlags(e);
    clickedFlag = e.target.dataset.flag;
    console.log("flag one clicked");
}

function handleFlagTwoClick(e){
    handleClickedFlags(e);
    clickedFlag = e.target.dataset.flag;
    console.log("flag two clicked");
}

function handleFlagThreeClick(e){
    handleClickedFlags(e);
    clickedFlag = e.target.dataset.flag;
    console.log("flag three clicked");
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


const drawnCountries = JSON.parse(localStorage.getItem("drawnCountries"));
const countriesForRound = [];
const flags = [flagOne, flagTwo, flagThree];


// randomly select 3 countries to be displayed and remove them from round countries
for(let i=0; i<=2; i++)
{
    const random = Math.floor(Math.random()*drawnCountries.length);
    countriesForRound.push(drawnCountries[random]);
    flags[i].style.backgroundImage = `url('${drawnCountries[random].flagPath}')`;
    drawnCountries.splice(random, 1);
}

// randomly select 1 wining country;

const random = Math.floor(Math.random()*countriesForRound.length);
const winingCountry = countriesForRound[random];
questionCountry.innerText= winingCountry.name + ".";
localStorage.setItem("winingCountry", JSON.stringify(winingCountry));

// handle if correct flag is chosen
btnSubmitAnswer.addEventListener("click", ()=>{
    if(!clickedFlag)
    {
        alert("Please click on flag you think is a correct answer.");
    }
    else
    {
        // clicked flag is only id change to country object

        console.log("flag submitted is " + clickedFlag);
       // localStorage.setItem("answerCountry", JSON.stringify());
       // window.location = "./result.html";
    }

})



