const regionCardBtn = document.querySelectorAll(".regionCard");
const btnSubmitRegion = document.getElementById("btnSubmitRegion");


let region;
btnSubmitRegion.disabled=true;
btnSubmitRegion.classList.add("btnSubmitAnswerDisabled");

regionCardBtn.forEach(btn =>{
        btn.addEventListener("click", (e) => {
            regionCardBtn.forEach(b => {
                b.innerText=b.dataset.region;
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
            getRandomGameCountesses(json, region);});
            window.location="./game.html";
    });



// randomly pick 30 countries for given region
// for one game round;
function getRandomGameCountesses(countries, region){
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



function randomHandler(regionCountries){
 const drawnCountries=[];
 const regionCountriesForDrawing =[...regionCountries];

    //TODO change number of drawn countries to 30

    if(regionCountriesForDrawing.length>= 15)
    {
        //TODO change number of drawn countries to 29
        for(let i=0; i<=14; i++)
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
