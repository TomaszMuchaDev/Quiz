const btnLogin = document.getElementById("btnLogin");
const btnRegister= document.getElementById("btnRegister");
const usernameInput = document.getElementById("usernameInput");
const passwordInput= document.getElementById("passwordInput");
const btnHamburgerMenu = document.getElementById("btnHamburgerMenu");
const hamburgerMenu = document.getElementById("hamburgerMenu");


btnHamburgerMenu.addEventListener("click", ()=>{
    hamburgerMenu.classList.toggle("menuMobile")});


let player ={};
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
        if(!player.username || !player.password)
        {
            alert("Please provide your username and password!");
            return
        }
        else
        {
            playersLocalStorageArray.map(p=>{
                if(p.username === player.username && p.password === player.password)
                {
                    localStorage.setItem("actualPlayer", JSON.stringify(p));
                    setTimeout(()=>{
                        window.location="./chooseRegion.html";
                    }, 200);

                }
                else if(p.username === player.username  && p.password !== player.password)
                {
                    alert("Sorry your password is not correct!");
                }
            });
        }
        alert("Sorry your credentials are not correct!");
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

