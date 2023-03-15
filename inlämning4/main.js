function getSeedData() {
    let seedData = {
        "data": [
            {
                "transactionAmount": 20,
                "transactionDate": "2023-03-13",
                "transactionName": "apple",
                "transactionCategory": "food"
            },
            {
                "transactionAmount": 20,
                "transactionDate": "2023-03-14",
                "transactionName": "book",
                "transactionCategory": "fun"
            }
        ]
    }
    return seedData.data;
}

function degreeToRadian(degree) {
    return (Math.PI / 180) * degree
}

function makePieSlice(c,startAngle, endAngle,centerX,centerY,radius, color) {
    c.beginPath();
    c.moveTo(centerX, centerY);


    c.arc(centerX, centerY, radius, degreeToRadian(startAngle-90), degreeToRadian(endAngle-90));
    c.closePath();
    c.fillStyle = "green";
    c.fill();
    c.stroke();


}


const app = Vue.createApp({
    data() {
        return {

            testNum: 0,
            transactionList: this.readFromLocalStorage() ?? getSeedData(),
            name: "",
            amount: 0,
            date: "",
            totalSpent: 0
        }
    },

    computed: {
        totalSpentFormatted(){
            return this.totalSpent.toFixed(0) + "kr";
        }
    },

    methods: {
        // Must parse amount to convert into number instead of string or totalSpent will be shown incorrectly
        addExpense() {
            let newExpense = {
                name: this.name,
                amount: parseFloat(this.amount),
                date: this.date
            }
            this.transactionList.push(newExpense),
                this.writeToLocalStorage();
                this.name = '',
                this.amount = 0,
                this.date = ''
                // reduce method sums up the amount of each expense in transactionList and then adds it to totalSpent 
                this.totalSpent = this.transactionList.reduce((total, expense) => total + expense.amount, 0)
        },

        deleteExpense(index) 
        {
            this.transactionList.splice(index, 1);
            this.writeToLocalStorage(); 
            this.totalSpent = this.transactionList.reduce((total, expense) => total + expense.amount, 0)
        },
        
        computed: {
            sortedItems: function() {
              return this.items.sort((a, b) => new Date(a.date) - new Date(b.date))
            }
          },




        updatePie() {
            let canvas = document.querySelector("#pieCanvas");
            let c = canvas.getContext("2d");
            let radius = 50;
            let centerOfPie = 100;
            let rotation = 0;

            makePieSlice(c,0,90,centerOfPie,centerOfPie,radius,"");

        },
        writeToLocalStorage(data) {
            let stringJson = JSON.stringify(data);
            window.localStorage.setItem("data", stringJson);
        },
        readFromLocalStorage() {
            if (window.localStorage.getItem("data") !== "undefined") {

                return JSON.parse(window.localStorage.getItem("data"));
            }
            return undefined;
        },
    }
}).mount('#app');