const modal = document.querySelector(".modal-overlay");
const openBtn = document.querySelector("#TransitionButton");
const closeBtn = document.querySelector("#close-btn");
const transactionForm = document.querySelector("#addTransaction-form");
const  CurrentBalance = document.querySelector("#CurrentBalance");
const totalIncome = document.querySelector("#totalIncome");
const totalExpenses = document.querySelector("#totalExpenses");
const transactionCount= document.querySelector("#transactionCount");
const clearAllBtn= document.querySelector("#clearAllBtn");
const transactionBody = document.querySelector("#transactionBody");
const saveTransactionBtn = document.querySelector("#saveTransactionBtn");
const typeInput = document.querySelector("#type");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const dateInput = document.querySelector("#transactionDate");
const categoryInput = document.querySelector("#category");
const searchInput = document.querySelector("#searchInput");
const typeFilter = document.querySelector("#typeFilter");
const settingsSaveBtn = document.querySelector(".settingSaveChanges");
const settingsName = document.querySelector("#settingsName");
const settingsCurrency = document.querySelector("#settingsCurrency");
let editTransactionId = null;
const dashboardBtn = document.querySelector("#dashboardBtn");
const settingBtn = document.querySelector("#settingBtn");




let savedTransaction = JSON.parse(localStorage.getItem("savedTransaction"))||[];

//-------------------Show transaction form-----------------------------------------------------------------------------------------//
openBtn.addEventListener("click", () => {
 modal.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
     modal.style.display = "none";
    }
});

// -----------------------------------setting feature------------------------------------------------------------------------------//

if (settingsSaveBtn) {

    settingsSaveBtn.addEventListener("click", saveSettings);

}




function saveSettings(){
const settings = {
    name: settingsName.value,
    currency: settingsCurrency.value
};
localStorage.setItem("settings", JSON.stringify(settings));

loadSettings();

}

function loadSettings(){
    const settings = JSON.parse(localStorage.getItem("settings"));

    if (!settings) return;
    document.querySelector("#userName").textContent = settings.name;
    document.querySelector("#welcomeUser").textContent =
    `Welcome, ${settings.name}`;

    document.querySelectorAll(".currency-symbol").forEach(symbol => {
        symbol.textContent = settings.currency;
    });

    document.querySelector("#settingContent").classList.add("hidden");
    document.querySelector("#dashboardContent").classList.remove("hidden");

    if (dashboardBtn && settingBtn) {
        dashboardBtn.classList.add("active");
        settingBtn.classList.remove("active");
    }
}

// ==========================dark mode-=============================//

const themeToggle = document.querySelector(".toggle-switch input");

// Load theme when page opens
loadTheme();

if (themeToggle) {
    themeToggle.addEventListener("change", toggleTheme);
}

function toggleTheme() {

    if (themeToggle.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }

}

function loadTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark");
        themeToggle.checked = true;
    } else {
        document.body.classList.remove("dark");
        themeToggle.checked = false;
    }

}



// -------------------------------------------------Add transaction data to localStorage------------------------------------------//
transactionForm.addEventListener("submit",(event)=>{
 event.preventDefault();

let type = typeInput.value;
let description = descriptionInput.value;
let amount = Number(amountInput.value);
let transactionDate = dateInput.value;
let category = categoryInput.value;

if(editTransactionId === null){
savedTransaction.push({ 
    id : Date.now(),
    type,
    description,
    amount,
    transactionDate,
    category});

localStorage.setItem("savedTransaction", JSON.stringify(savedTransaction))
}
else{
    const transaction = savedTransaction.find(
    transaction => transaction.id === editTransactionId
);
transaction.type = type;
transaction.description = description;
transaction.amount = amount;
transaction.transactionDate = transactionDate;
transaction.category = category;

localStorage.setItem(
    "savedTransaction",
    JSON.stringify(savedTransaction)
);
saveTransactionBtn.textContent = "Save Transaction";
editTransactionId = null;
}
applyFilters();
updateDashboard();
transactionForm.reset();
modal.style.display = "none";
updateChart();
});



// -----------------------------------update transactions like balance,income --------------------------------------------------//

function updateDashboard() {
    let income = 0;
let expense = 0;
savedTransaction.forEach((transaction) => {

 if( transaction.type === "Income"){
    income += Number(transaction.amount);
 }
 else{
    expense += Number(transaction.amount);
 }
});

let balance = income - expense;
let totalTransaction = savedTransaction.length; 


 CurrentBalance.textContent = balance ;
  totalIncome.textContent = income ;
  totalExpenses.textContent =  expense;
 transactionCount.textContent =  totalTransaction;
 updateChart();

}
//------------------------------------------------clear all data btn -------------------------------------------------------------//
clearAllBtn.addEventListener("click",function(){
const confirmClear = confirm("Are you sure you want to delete all transactions?");
if (!confirmClear) return;
localStorage.removeItem("savedTransaction");
 savedTransaction = [];
 updateDashboard();
applyFilters();
updateChart();
});


// -------------------------------------------------------------render the transactions---------------------------------------------//


function renderTransaction(transactions){
      transactionBody.innerHTML = "";
      let html = "";
    transactions  
         .slice()
        .reverse()
        .forEach((transaction)=>{
        html +=`<tr>

<td>${transaction.transactionDate}</td>

<td>${transaction.description}</td>

<td>
<span class="category ${
    transaction.type === "Income"
        ? "category-income"
        : "category-expense"
}">
${transaction.category}
</span>
</td>

<td class="${transaction.type.toLowerCase()}">
 ${transaction.type === "Income" ? "+" : "-"}$${transaction.amount}     
</td>

<td>
    <div class="actions">
        <i class="ri-pencil-fill edit" data-id="${transaction.id}"></i>
        <i class="ri-delete-bin-fill delete" data-id="${transaction.id}"></i>
    </div>
</td>

</tr>`

    })

transactionBody.innerHTML = html;
}



// ========================----------------------------- delete Transaction ------------------------------------========================//

transactionBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
        const id = Number(event.target.dataset.id);
        const confirmDelete = confirm("Are you sure you want to delete this transaction?");
        if (!confirmDelete) return;
        savedTransaction = savedTransaction.filter(
            transaction => transaction.id !== id
        );
        localStorage.setItem(
            "savedTransaction",
            JSON.stringify(savedTransaction)
        );
       applyFilters();
        updateDashboard();
        updateChart();
    }

});

//--------------------------------------------------------edit functinality--------------------------------------------------------------//

transactionBody.addEventListener("click", function (event) {

    if (event.target.classList.contains("edit")) {

        const id = Number(event.target.dataset.id);

        const transaction = savedTransaction.find(
            transaction => transaction.id === id
        );
        if (!transaction) return;

        editTransactionId = id;

        typeInput.value = transaction.type;
        descriptionInput.value = transaction.description;
        amountInput.value = transaction.amount;
        dateInput.value = transaction.transactionDate;
        categoryInput.value = transaction.category;

        modal.style.display = "flex";
        saveTransactionBtn.textContent = "Update Transaction";


    }

});

// ========================--------------------------------------search feature------------------------------------====================//
 

function applyFilters(){
    const searchText = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const filteredTransactions = savedTransaction.filter((transaction)=>{
        // for searching condition 
        const matchesSearch = transaction.description.toLowerCase().includes(searchText) ||
                             transaction.category.toLowerCase().includes(searchText) ;

        const matchesType =
            selectedType === "All" ||
            transaction.type === selectedType;
               return matchesSearch && matchesType;

    })

    renderTransaction(filteredTransactions);
}
searchInput.addEventListener("input", applyFilters);
typeFilter.addEventListener("change", applyFilters);









updateDashboard();
applyFilters();
updateChart();