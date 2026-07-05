const RegisterForm = document.querySelector('#register-form');
const LoginForm = document.querySelector('#login-form');
const LogoutBtn = document.querySelector('#logoutBtn');

 let users = JSON.parse(localStorage.getItem("users")) || [];

// -----------Authentication & Access Control Check----------//
if (window.location.pathname.toLowerCase().includes("dashboard.html")) {
    if (!localStorage.getItem("loggedInUser")) {
        const usersList = JSON.parse(localStorage.getItem("users")) || [];
        if (usersList.length === 0) {
            window.location.href = "Registration.html";
        } else {
            window.location.href = "LoginPage.html";
        }
    }
}

// -----------------Registration form---------------------//
if(RegisterForm){
RegisterForm.addEventListener("submit",function(event){
    event.preventDefault();
    let name = event.target[0].value;
    let email = event.target[1].value;
    let password = event.target[2].value;   

    // Save user to localStorage
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "LoginPage.html";
});
}

// --------------login form ------------------------//
if(LoginForm){
    LoginForm.addEventListener("submit",function(event){
    event.preventDefault();

 let userEmail = event.target[0].value;
 let userPassword = event.target[1].value;

let user = users.find( u => u.email === userEmail &&  u.password === userPassword); 
if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "Dashboard.html";
} else {
    alert("Invalid email or password");
}
});

}
//--------------------logout button-------------------//
if(LogoutBtn){
    LogoutBtn.addEventListener("click",function(event){
        localStorage.removeItem("loggedInUser");
        window.location.href = "LoginPage.html";
    })
}
