const regionMessage = document.getElementById("regionMessage");
const flagOne = document.getElementById("flagOne");
const flagTwo= document.getElementById("flagTwo");
const flagThree = document.getElementById("flagThree");
const questionCountry = document.getElementById("questionCountry");
const btnSubmitAnswer =document.getElementById("btnSubmitAnswer");

const region = localStorage.getItem("region");
regionMessage.innerText = "Region is " + region  + ".";


const drawnCountries = JSON.parse(localStorage.getItem("drawnCountries"));
const countriesForRound = [];
const flags = [flagOne, flagTwo, flagThree];

// randomly select 3 countries to be displayed and remove them from round countries
for(let i=0; i<=2; i++)
{
    const random = Math.floor(Math.random()*drawnCountries.length);
    countriesForRound.push(drawnCountries[random]);
    flags[i].src=drawnCountries[random].flagPath;
    drawnCountries.splice(random, 1);
}

// randomly select 1 wining country;

const random = Math.floor(Math.random()*countriesForRound.length);
const winingCountry = countriesForRound[random];
questionCountry.innerText= winingCountry.name + "?";
localStorage.setItem("winingCountry", winingCountry.name);

// handle if correct flag is chosen


//assign eventListener to all flags

// change border of chosen flag

//save in local storage chosen flag


//after submit redirect to result page
