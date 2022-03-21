const btnLogin = document.getElementById("btnLogin");
const btnCreate = document.getElementById("btnCreate");
const pointsMessage = document.getElementById("pointsMessage");
const nameInput = document.getElementById("nameInput");
const resultFlag = document.getElementById("resultFlag");
const resultFact = document.getElementById("resultFact");
const resultBtnWiki = document.getElementById("resultBtnWiki");
const resultMsg = document.getElementById("resultMsg");
const regionMessage = document.getElementById("regionMessage");
const regionCardBtn = document.querySelectorAll(".regionCard");
const btnSubmitAnswer =document.getElementById("btnSubmitAnswer");
const btnSubmitRegion = document.getElementById("btnSubmitRegion");


// index page
if (btnLogin) {
        pointsMessage.innerText = "Welcome";
        nameInput.addEventListener('input', (e) => {
        btnLogin.playerName  = e.target.value;
        });
        btnLogin.addEventListener("click", handleLogin);
}


// choose region Page
if(btnSubmitRegion) {
    handleChooseRegion();
}


// game page
if(btnSubmitAnswer){
    handleGame();
}

// result page
if(resultFlag){
    handleResult(45);
}



function handleLogin(event) {
    const name = event.currentTarget.playerName;
    const userFromLocalStorage = localStorage.getItem(name);
       if(userFromLocalStorage)
       {
           let player = localStorage.getItem(name);

       }
       else
       {
           let player={name: name, score:0, topScore:0}
           localStorage.setItem(name, JSON.stringify(player));
       }
    }


function handleChooseRegion(){
    let region;
    regionCardBtn.forEach(btn =>{
        btn.addEventListener("click", (e) => {
            regionCardBtn.forEach(b => b.classList.remove("regionCardClicked"));
            e.target.classList.add("regionCardClicked");
            region = e.target.dataset.region;
        });
    });
    btnSubmitRegion.addEventListener("click", ()=>{
        localStorage.setItem("region", region);
        window.location="./game.html";
    });
}



function  handleGame(){
    let allCountries;
    const region = localStorage.getItem("region");
    regionMessage.innerText="  Region is " + region + ".";
    fetch("./countries.json")
        .then(response => response.json())
        .then(json =>displayGame(getRandomGameCountesses(json, region)));

}

// randomly pick 30 countries for given region
// for all game round;
function getRandomGameCountesses(countries, region){
    let countriesFromRegion=[];

    if(!region)
    {
        alert("Sorry we have some problem with reading data please try later.")
    }
   else if(region === "World")
    {
        //if region is world
        countriesFromRegion = [...countries];
    }
    else{
        //if region is other than world
        countries.map(c=>{
            c.region === region ? countriesFromRegion.push(c) : null;
        });
    }
    return countriesFromRegion;
}

function displayGame(drawnCountries){

    localStorage.setItem("drawnCountries",JSON.stringify(drawnCountries));
}


function handleResult (countryNumber){
    fetch("./countries.json")
        .then(response => response.json())
        .then(json => {
            const name = json[countryNumber].name;
            const interestingFact = json[countryNumber].interestingFact;
            const wikiLink = json[countryNumber].wikiLink;
            const lng = json[countryNumber].longitude;
            const lat = json[countryNumber].latitude;
            resultFlag.src = json[countryNumber].flagPath;
            resultFact.innerText = "Do you know that " + interestingFact;
            resultBtnWiki.addEventListener("click", ()=>{
                window.open(wikiLink);
            });
            const regionForMessage = json[countryNumber].region === "Asia" ? "Asia and Australia" : json[countryNumber].region;
            regionMessage.innerText = "Region is " + regionForMessage + ".";
            resultBtnWiki.innerText = name + " info";
            resultMsg.innerText = `This is flag of ${name}.
            Click button below to find out more about this country.`;
            handleMapDisplay(lng, lat);
        });
}


function handleMapDisplay(lng, lat){
    mapboxgl.accessToken = 'pk.eyJ1IjoidG9tYXN6bXVjaGEiLCJhIjoiY2wwdG1zMDN6MDE4aDNjbzg3cnZqNzhwcSJ9.D5dv2MRT52aVyObLS_gAiw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [lng, lat], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav)
    new mapboxgl.Marker({ color: 'red'})
        .setLngLat([lng, lat])
        .addTo(map);
}


