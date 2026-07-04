const RegisterForm = document.querySelector('#register-form');
const LoginForm = document.querySelector('#login-form');
const LogoutBtn = document.querySelector('#logoutBtn');

 let users = JSON.parse(localStorage.getItem("users")) || [];

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
user? window.location.href = "dashboard.html" : alert("Invalid email or password");
});

}
//--------------------logout button-------------------//
if(LogoutBtn){
    LogoutBtn.addEventListener("click",function(event){
window.location.href = "LoginPage.html";

    })
}


