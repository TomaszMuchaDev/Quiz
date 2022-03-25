const btnLogin = document.getElementById("btnLogin");
const btnRegister= document.getElementById("btnRegister");
const pointsMessage = document.getElementById("pointsMessage");
const usernameInput = document.getElementById("usernameInput");
const passwordInput= document.getElementById("passwordInput");


let player ={};
const playersLocalStorageArray = JSON.parse(localStorage.getItem("playersArray"));

// login page and register page
if (btnLogin || btnRegister) {
    usernameInput.addEventListener('input', (e) => {
        player.username  = e.target.value;
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


    if(playersLocalStorageArray)
    {
        playersLocalStorageArray.map(p=>{
            if(p.username=== player.username && p.password === player.password)
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

   let playersArray=[];
   if(playersLocalStorageArray)
   {
       playersArray = [...playersLocalStorageArray];
   }

     if(player.username && player.password)
      {

        const userExist =  playersArray.filter(p=>p.username === player.username);
            if (userExist.length >0)
            {
                alert("Sorry " + player.username + " is already used, please choose another username.");
            }
            else
            {
                playersArray.push(player);
                localStorage.setItem("playersArray", JSON.stringify(playersArray));
                alert("Your account created successfully.");
                window.location="./chooseRegion.html";
            }
      }
     else
      {
          alert("Please input username and password.");
      }


}

