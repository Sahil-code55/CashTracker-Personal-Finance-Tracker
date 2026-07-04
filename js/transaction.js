const modal = document.querySelector(".modal-overlay");
const openBtn = document.querySelector("#TransitionButton");
const closeBtn = document.querySelector("#close-btn");
const transactionForm = document.querySelector("#addTransaction-form");
const  CurrentBalance = document.querySelector("#CurrentBalance");
const totalIncome = document.querySelector("#totalIncome");
const totalExpenses = document.querySelector("#totalExpenses");
const transactionCount= document.querySelector("#transactionCount");
const clearAllBtn= document.querySelector("#clearAllBtn");
const transactionBody = document.querySelector("#transactionBody")
const deleteBtn = document.querySelector(".delete")
const editBtn = document.querySelector(".edit")



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

 let type = event.target[0].value;
 let description = event.target[1].value;
let amount = Number(event.target[2].value);
 let transactionDate = event.target[3].value;
 let category = event.target[4].value;

savedTransaction.push({ 
    id : Date.now(),
    type,
    description,
    amount,
    transactionDate,
    category});

localStorage.setItem("savedTransaction", JSON.stringify(savedTransaction))
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

<td class="actions">
<i class="ri-pencil-fill edit" data-id="${transaction.id}"></i>

<i class="ri-delete-bin-fill delete" data-id="${transaction.id}"></i>
</td>

</tr>`

    })

transactionBody.innerHTML = html;
}








 
updateDashboard();
renderTransaction();