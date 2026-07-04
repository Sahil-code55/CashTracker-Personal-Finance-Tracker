const ctx = document.getElementById("cashFlowChart");

const cashFlowChart = new Chart(ctx,{
    type:"line",

    data:{
        labels:[
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec"
        ],

        datasets:[
            {
                label:"Income",
                data:[],
                borderColor:"#22C55E",
                backgroundColor:"rgba(34,197,94,.12)",
                fill:true,
                tension:.4
            },

            {
                label:"Expense",
                data:[],
                borderColor:"#EF4444",
                backgroundColor:"rgba(239,68,68,.12)",
                fill:true,
                tension:.4
            }
        ]
    },

    options:{
        responsive:true,
        maintainAspectRatio:false,

        plugins:{
            legend:{
                display:false
            }
        }
    }
});

function updateChart(){  
let savedTransaction =JSON.parse(localStorage.getItem("savedTransaction")) || [];

const incomeArray = Array(12).fill(0);
const expenseArray = Array(12).fill(0);

savedTransaction.forEach((transaction)=>{

const month = new Date(transaction.transactionDate).getMonth();

if(transaction.type === "Income"){
    incomeArray[month] += transaction.amount;
}
else{
    expenseArray[month] += transaction.amount;
}


});


cashFlowChart.data.datasets[0].data = incomeArray;

cashFlowChart.data.datasets[1].data = expenseArray;
cashFlowChart.update();
}

updateChart();