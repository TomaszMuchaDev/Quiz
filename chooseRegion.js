const regionCardBtn = document.querySelectorAll(".regionCard");
const btnSubmitRegion = document.getElementById("btnSubmitRegion");
const pointsMessage = document.getElementById("pointsMessage");
const btnHamburgerMenu = document.getElementById("btnHamburgerMenu");
const hamburgerMenu = document.getElementById("hamburgerMenu");

let region;
initialSetup();

regionCardBtn.forEach(btn =>{
    btn.addEventListener("click", (e) => {
        regionCardBtn.forEach(b => {
            if (b.dataset.region === "Asia")
            {
                b.innerText = "Asia and Australia";
            }
            else
            {
                b.innerText=b.dataset.region;
            }
            b.classList.remove("regionCardClicked")});

        btnSubmitRegion.disabled=false;
        btnSubmitRegion.classList.remove("btnSubmitAnswerDisabled");
        e.target.classList.add("regionCardClicked");
        e.target.innerText="✓";
        region = e.target.dataset.region;
    });});



btnSubmitRegion.addEventListener("click", ()=>{
    localStorage.setItem("region", region);
    fetch("./countries.json")
        .then(response => response.json())
        .then(json =>{
            getRandomGameCountries(json, region);})
        .then(r =>  window.location="./game.html")
        .catch(err=>{
            alert("Sorry we are not able to connect to DB please try later.");
            console.log(Error + err);
        })
});


btnHamburgerMenu.addEventListener("click", ()=>{
    hamburgerMenu.classList.toggle("menuMobile")});



function initialSetup(){
    let actualPlayer = JSON.parse(localStorage.getItem("actualPlayer"));
    actualPlayer.actualScore = 0;
    localStorage.setItem("actualPlayer", JSON.stringify(actualPlayer));
    localStorage.setItem("actualQuestionNumber", "0");
    btnSubmitRegion.disabled=true;
    btnSubmitRegion.classList.add("btnSubmitAnswerDisabled");
    pointsMessage.innerText=`${actualPlayer.username} you scored 0/0`;
}




// get countries by chosen region
function  getRandomGameCountries(countries, region){
    let regionCountries=[];

    if(!region || region === "World")
    {
        regionCountries = [...countries];
    }
    else
    {
        //if region is other than world
        countries.map(c=>{
            c.region === region ? regionCountries.push(c) : null;
        });
    }

    randomHandler(regionCountries);
}


// randomly pick 30 countries for given region
function randomHandler(regionCountries){
 const drawnCountries=[];
 const regionCountriesForDrawing =[...regionCountries];

    if(regionCountriesForDrawing.length>= 30)
    {
        for(let i=0; i<=29; i++)
        {
            const random =  Math.floor(Math.random()*regionCountriesForDrawing.length);
            drawnCountries.push(regionCountriesForDrawing[random]);
            regionCountriesForDrawing.splice(random, 1);
        }
    }
    else
    {
        alert("Number of countries is not sufficient. Please try later.")
    }

    localStorage.setItem("drawnCountries",JSON.stringify(drawnCountries));
}
