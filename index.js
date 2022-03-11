const btnLogin = document.getElementById("btnLogin");
const btnCreate = document.getElementById("btnCreate");
const btnHome = document.getElementById("btnHome");
const pointsMessage = document.getElementById("pointsMessage");
const nameInput = document.getElementById("nameInput")

let name;

nameInput.addEventListener('input', (e) => {
    name = e.target.value;
});

// use only on index page
    if (btnLogin) {
        pointsMessage.innerText = "Welcome";
        btnLogin.addEventListener("click", handleLogin)


    }
// use with about and how to play pages
    else if (btnHome) {
        pointsMessage.innerText = "Welcome!!!";
        btnHome.addEventListener("click", handleHome);
    }
// all other pages
    else {
        const player = localStorage.getItem("player");
        pointsMessage.innerText = `${player}`;
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

