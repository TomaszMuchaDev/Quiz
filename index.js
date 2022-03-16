const btnLogin = document.getElementById("btnLogin");
const btnCreate = document.getElementById("btnCreate");
const btnHome = document.getElementById("btnHome");
const pointsMessage = document.getElementById("pointsMessage");
const nameInput = document.getElementById("nameInput");
const btnHowToPlayPage = document.getElementById("btnHowToPlay");
const btnAbout = document.getElementById("btnAbout");
const btnScore = document.getElementById("btnScore");
const resultFlag = document.getElementById("resultFlag");
const resultFact = document.getElementById("resultFact");
const resultBtnWiki = document.getElementById("resultBtnWiki");
const resultMsg = document.getElementById("resultMsg");
const regionMessage = document.getElementById("regionMessage");


let name;


// use only on index page
    if (btnLogin) {
        pointsMessage.innerText = "Welcome";
        btnLogin.addEventListener("click", handleLogin)
        nameInput.addEventListener('input', (e) => {
            name = e.target.value;
        });

    }
// use with about and how to play pages
    else if (btnHome) {
        pointsMessage.innerText = "Welcome!!!";
        btnHome.addEventListener("click", handleHome);
    }
// rest of  pages
    else {
        // const player = localStorage.getItem("player");
        // pointsMessage.innerText = `${player}`;
    }

if(btnHowToPlayPage){
    btnHowToPlayPage.addEventListener("click", handleHowToPlayRedirection);
}


if(btnAbout){
    btnAbout.addEventListener("click", handleAboutRedirection);
}


if(btnScore){
    btnScore.addEventListener("click", handleScoreRedirection)
}

function handleLogin() {
       const userFromLocalStorage = localStorage.getItem(name);
       if(userFromLocalStorage)
       {
           let user = localStorage.getItem(name);
       }
       else
       {
           let player={name: name, score:0, topScore:0}
           localStorage.setItem("name", JSON.stringify(player));
       }
    }

function handleHome() {
        window.location.href = "./index.html";
    }

function handleHowToPlayRedirection (){
    window.location.href = "./index.html";
}

function handleAboutRedirection (){
    window.location.href = "./index.html";
}

function handleScoreRedirection (){
    window.location.href = "./chooseRegion.html";
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
            regionMessage.innerText = "Region is " + json[countryNumber].region;
            resultBtnWiki.innerText = name + " info";
            resultMsg.innerText = `This is flag of ${name}.
            Click button below to find out more about this country.`;
            handleMapDisplay(lng, lat);
        });
}

handleResult(9);


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


