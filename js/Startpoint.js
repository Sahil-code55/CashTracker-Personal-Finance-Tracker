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
    dashboardBtn.style.backgroundColor = "#DBEAFE"
    dashboardBtn.style.color = "#1E40AF"
    settingBtn.style.backgroundColor = "#F0F0F0"
    settingBtn.style.color = "#000000"
};

settingBtn.onclick = () => {
    settingsContent.classList.remove("hidden");
    dashboardContent.classList.add("hidden");
     settingBtn.style.backgroundColor = "#DBEAFE"
    settingBtn.style.color = "#1E40AF"
     dashboardBtn.style.backgroundColor = "#F0F0F0"
    dashboardBtn.style.color = "#000000"

};

loadSettings();