const btnLogin = document.getElementById("btnLogin");
const btnRegister= document.getElementById("btnRegister");
const pointsMessage = document.getElementById("pointsMessage");
const nameInput = document.getElementById("nameInput");
const passwordInput= document.getElementById("passwordInput");


let player ={};

// login page and register page
if (btnLogin || btnRegister) {
        pointsMessage.innerText = "Welcome";
    nameInput.addEventListener('input', (e) => {
        player.name  = e.target.value;
        });
    passwordInput.addEventListener("input", (e)=>{
        player.password = e.target.value;
    })

}


// login page

if (btnLogin){
    btnLogin.addEventListener("click", handleLogin);
}



//register page

if(btnRegister)
{
    btnRegister.addEventListener("click", handleRegister);
}



function handleLogin() {
    const playersLocalStorageArray = JSON.parse(localStorage.getItem("playersArray"));

    if(playersLocalStorageArray)
    {
        playersLocalStorageArray .map(p=>{
            if(p.name === player.name && p.password === player.password)
            {
                window.location="./chooseRegion.html";
            }
            else
            {
                alert("Sorry you credentials do not match please try again.")
            }
        })

    }
    else
    {
        alert("Sorry, we are not able to find your profile please create new one.")
    }

}


function handleRegister(e){

    window.location="./chooseRegion.html";
}

