const btnLogin = document.getElementById("btnLogin");
const btnCreate = document.getElementById("btnCreate");
const btnHome = document.getElementById("btnHome");
const pointsMessage = document.getElementById("pointsMessage");
const nameInput = document.getElementById("nameInput");
const btnHowToPlayPage = document.getElementById("btnHowToPlay");
const btnAbout = document.getElementById("btnAbout");

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
// all other pages
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