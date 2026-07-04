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
let editTransactionId = null;




let savedTransaction = JSON.parse(localStorage.getItem("savedTransaction"))||[];

//-------------------Show transaction form------------------------//
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


// ----------------Add transaction data to localStorage--------------//
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
renderTransaction();
updateDashboard();
transactionForm.reset();
modal.style.display = "none";

});



// -----------------update transactions like balance,income ---------//

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

}
//---------------------clear all data btn ---------------------//
clearAllBtn.addEventListener("click",function(){
const confirmClear = confirm("Are you sure you want to delete all transactions?");
if (!confirmClear) return;
localStorage.removeItem("savedTransaction");
 savedTransaction = [];
 updateDashboard();
 renderTransaction();
});


// ----------------------render the transactions----------------//


function renderTransaction(){
      transactionBody.innerHTML = "";
      let html = "";
    savedTransaction  
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



// ======================== delete Transaction ========================//

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
        renderTransaction();
        updateDashboard();
    }

});

//-----------------edit functinality----------------------//

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
 
searchInput.addEventListener("input", function () {
const searchText = searchInput.value;
// const filteredTransactions = savedTransaction.filter(...);
});


updateDashboard();
renderTransaction();