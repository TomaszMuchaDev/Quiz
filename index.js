const btnLogin = document.getElementById("btnLogin");
const btnRegister= document.getElementById("btnRegister");
const usernameInput = document.getElementById("usernameInput");
const passwordInput= document.getElementById("passwordInput");
const btnHamburgerMenu = document.getElementById("btnHamburgerMenu");
const hamburgerMenu = document.getElementById("hamburgerMenu");


let player ={};

btnHamburgerMenu.addEventListener("click", ()=>{
    hamburgerMenu.classList.toggle("menuMobile")});


const playersLocalStorageArray = JSON.parse(localStorage.getItem("playersArray"));

// login page and register page
if (btnLogin || btnRegister) {
    usernameInput.addEventListener('input', (e) => {
        player.username  = e.target.value;
        });
    passwordInput.addEventListener("input", (e)=>{
        player.password = e.target.value;
    });

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
        // when is no username or no password
        if(!player.username || !player.password)
        {
            alert("Please provide your username and password!");
        }
        else
        {
            playersLocalStorageArray.map(p=>{
                // when all is ok
                if(p.username === player.username && p.password === player.password)
                {
                    localStorage.setItem("actualPlayer", JSON.stringify(p));
                    window.location="./chooseRegion.html";
                }});
        }

        //this function gives time for local storage to be updated with actual player data.
        setTimeout(()=>{
              if(player.username && player.password)
                {
                    alert("Sorry your credentials are not correct!");
                }
        }, 500);
    }
    else
    {
        alert("Sorry, we are not able to find your profile please create new one.");
    }

}


function handleRegister(){
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
                player.actualScore = 0;
                player.topScore = 0;
                playersArray.push(player);
                localStorage.setItem("actualPlayer", JSON.stringify(player));
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

