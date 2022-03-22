const resultFlag = document.getElementById("resultFlag");
const resultFact = document.getElementById("resultFact");
const resultBtnWiki = document.getElementById("resultBtnWiki");
const resultMsg = document.getElementById("resultMsg");
const regionMessage = document.getElementById("regionMessage");


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

// result page
if(resultFlag){
    handleResult(70);
}
