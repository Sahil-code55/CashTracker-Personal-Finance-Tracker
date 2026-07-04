const currentUser = JSON.parse(localStorage.getItem("users"));

console.log(currentUser)


if(currentUser){
  
    document.getElementById("welcomeUser").textContent = `Welcome ${currentUser[0].name}`;
    document.getElementById("userName").textContent = currentUser[0].name;
    
}