const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
const dashboardContent = document.querySelector("#dashboardContent");
const settingsContent = document.querySelector("#settingContent");
const dashboardBtn = document.querySelector("#dashboardBtn");
const settingBtn = document.querySelector("#settingBtn");




if(currentUser){
  
    document.getElementById("welcomeUser").textContent = `Welcome ${currentUser.name}`;
    document.getElementById("userName").textContent = currentUser.name;

    
    // ================dashboard & setting shifting============//
}

dashboardBtn.onclick = () => {
    dashboardContent.classList.remove("hidden");
    settingsContent.classList.add("hidden");
    dashboardBtn.classList.add("active");
    settingBtn.classList.remove("active");
};

settingBtn.onclick = () => {
    settingsContent.classList.remove("hidden");
    dashboardContent.classList.add("hidden");
    settingBtn.classList.add("active");
    dashboardBtn.classList.remove("active");
};

loadSettings();