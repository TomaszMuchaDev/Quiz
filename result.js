const pointsMessage = document.getElementById("pointsMessage");
const resultFlag = document.getElementById("resultFlag");
const resultFact = document.getElementById("resultFact");
const resultBtnWiki = document.getElementById("resultBtnWiki");
const resultMsg = document.getElementById("resultMsg");
const regionMessage = document.getElementById("regionMessage");
const correctMsg = document.getElementById("correctMsg");
const btnNextQuestion = document.getElementById("btnNextQuestion");


btnNextQuestion.addEventListener("click", handleNextQuestionBtn);
const actualQuestionNumber  = parseInt(localStorage.getItem("actualQuestionNumber"));

//checkCountryData(81);
handleResult();

// TODO remove function after all countries will be added
//
// function checkCountryData (countryNumber){
//     fetch("./countries.json")
//         .then(response => response.json())
//         .then(json => {
//             const name = json[countryNumber].name;
//             const interestingFact = json[countryNumber].interestingFact;
//             const wikiLink = json[countryNumber].wikiLink;
//             const lng = json[countryNumber].longitude;
//             const lat = json[countryNumber].latitude;
//             resultFlag.src = json[countryNumber].flagPath;
//             resultFact.innerText = "Do you know that " + interestingFact;
//             resultBtnWiki.addEventListener("click", ()=>{
//                 window.open(wikiLink);
//             });
//             const regionForMessage = json[countryNumber].region === "Asia" ? "Asia and Australia" : json[countryNumber].region;
//             regionMessage.innerText = "Region is " + regionForMessage + ".";
//             resultBtnWiki.innerText = name + " info";
//             resultMsg.innerText = `This is flag of ${name}.
//             Click button below to find out more about this country.`;
//             handleMapDisplay(lng, lat);
//         });
// }


function handleNextQuestionBtn(e){
    if(actualQuestionNumber>=5)
    {
        window.location="./score.html";
    }
    else
    {
        window.location="./game.html";
    }
}


function handleResult (){
   const winningCountry = JSON.parse(localStorage.getItem("winningCountry"));
   const answerCountry = JSON.parse(localStorage.getItem("answerCountry"));
   const actualScore = parseInt(localStorage.getItem("actualScore"));

      if(winningCountry.name === answerCountry.name)
      {
          correctMsg.innerText = "Correct!!!";
      }
      else
      {
          correctMsg.innerText =  "No luck this time.";
      }

        resultFlag.src = winningCountry.flagPath;
        resultFact.innerText = "Do you know that " + winningCountry.interestingFact;
        resultBtnWiki.addEventListener("click", ()=>{
            window.open(winningCountry.wikiLink);
        });

        pointsMessage.innerText=`Score ${actualScore}/${actualQuestionNumber} `
        const regionForMessage = winningCountry.region === "Asia" ? "Asia and Australia" : winningCountry.region;
        regionMessage.innerText = "Region is " + regionForMessage + ".";
        resultBtnWiki.innerText = winningCountry.name + " info";
        resultMsg.innerText = `This is flag of ${winningCountry.name}.
        Click button below to find out more about this country.`;
        handleMapDisplay(winningCountry.longitude, winningCountry.latitude);
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


