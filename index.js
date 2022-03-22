const btnLogin = document.getElementById("btnLogin");
const btnCreate = document.getElementById("btnCreate");
const pointsMessage = document.getElementById("pointsMessage");
const nameInput = document.getElementById("nameInput");


// index page
if (btnLogin) {
        pointsMessage.innerText = "Welcome";
        nameInput.addEventListener('input', (e) => {
        btnLogin.playerName  = e.target.value;
        });
        btnLogin.addEventListener("click", handleLogin);
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








