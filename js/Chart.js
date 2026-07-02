const ctx = document.getElementById("cashFlowChart");

new Chart(ctx,{
    type:"line",

    data:{
        labels:["Jan","Feb","Mar","Apr","May","Jun"],

        datasets:[
            {
                label:"Income",
                data:[6000,9000,7000,12000,10000,15000],
                borderColor:"#22C55E",
                backgroundColor:"rgba(34,197,94,.12)",
                fill:true,
                tension:.4
            },

            {
                label:"Expense",
                data:[3000,4500,5000,6000,4800,7200],
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
        },

        scales:{
            x:{
                grid:{
                    display:false
                }
            },

            y:{
                beginAtZero:true
            }
        }
    }
});