import {displayPointsMessage} from "./displayHelpers.js";

const resultFlag = document.getElementById("resultFlag");
const resultFact = document.getElementById("resultFact");
const resultBtnWiki = document.getElementById("resultBtnWiki");
const resultMsg = document.getElementById("resultMsg");
const regionMessage = document.getElementById("regionMessage");
const correctMsg = document.getElementById("correctMsg");
const btnNextQuestion = document.getElementById("btnNextQuestion");


const btnHamburgerMenu = document.getElementById("btnHamburgerMenu");
const hamburgerMenu = document.getElementById("hamburgerMenu");

btnHamburgerMenu.addEventListener("click", ()=>{
    hamburgerMenu.classList.toggle("menuMobile")});

btnNextQuestion.addEventListener("click", handleNextQuestionBtn);
const actualQuestionNumber  = parseInt(localStorage.getItem("actualQuestionNumber"));


handleResult();


function handleNextQuestionBtn(){
    if(actualQuestionNumber>=10)
    {
        window.location="./score.html";
    }
    else
    {
        window.location="./game.html";
    }
}


function handleResult(){
   const answerCountry = JSON.parse(localStorage.getItem("answerCountry"));
   const actualPlayer = JSON.parse(localStorage.getItem("actualPlayer"));
   const winingCountry = JSON.parse(localStorage.getItem("winningCountry"));

    displayWiningCountry(winingCountry, answerCountry );
    displayPointsMessage(actualPlayer, actualQuestionNumber);
    displayCountryData(winingCountry);
}


function displayWiningCountry(winingCountry, answerCountry ){
    if(winingCountry.name === answerCountry.name)
    {
        const audio = new Audio('./Assets/SoundEffects/success.mp3');
        audio.play();
        correctMsg.innerText = "Correct!!!";
    }
    else
    {
        const audio = new Audio('./Assets/SoundEffects/failure.mp3');
        audio.play();
        correctMsg.innerText =  "No luck this time.";
    }

}

function  displayCountryData(winingCountry){
    const {name, region, longitude, latitude, wikiLink, interestingFact, flagPath }=winingCountry;
    const regionForMessage = region === "Asia" ? "Asia and Australia" : region;

    resultFlag.src = flagPath;
    resultFact.innerText = "Do you know that " + interestingFact;
    resultBtnWiki.addEventListener("click", ()=>{
        window.open(wikiLink);
    });

    regionMessage.innerText = "Region is " + regionForMessage + ".";
    resultBtnWiki.innerText = name + " info";
    resultMsg.innerText = `This is flag of ${name}.
        Click button below to find out more about this country.`;

    handleMapDisplay(longitude, latitude);
}


function handleMapDisplay(lng, lat){
    mapboxgl.accessToken = 'pk.eyJ1IjoidG9tYXN6bXVjaGEiLCJhIjoiY2wwdG1zMDN6MDE4aDNjbzg3cnZqNzhwcSJ9.D5dv2MRT52aVyObLS_gAiw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [lng, lat], // starting position [lng, lat]
        zoom: 1 // starting zoom
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav)
    new mapboxgl.Marker({ color: 'red'})
        .setLngLat([lng, lat])
        .addTo(map);
}


