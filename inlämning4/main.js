function getSeedData() {
    let seedData = {
        "data": [
            {
                "amount": 20,
                "date": "2023-03-13",
                "name": "apple",
                "category": "Food"
            },
            {
                "amount": 20,
                "date": "2023-03-14",
                "name": "book",
                "category": "Leisure"
            }
        ]
    }
    return seedData.data;
}

function degreeToRadian(degree) {
    return (Math.PI / 180) * degree
}

function makePieSlice(c, startAngle, endAngle, centerX, centerY, radius, color) {
    c.beginPath();
    c.moveTo(centerX, centerY);


    c.arc(centerX, centerY, radius, degreeToRadian(startAngle - 90), degreeToRadian(endAngle - 90));
    c.closePath();
    c.fillStyle = color;
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
            category:"",
            totalSpent:0,
            categories:["Food","Utilities","Saving","Leisure","Housing","Other"],
            pieColors:["Green","Yellow","Purple","Blue","Orange","Gray"]
        }
    },

    computed: {
        totalSpentFormatted() {
            return this.totalSpent.toFixed(0) + " kr";
        }
    },

    methods: {
        // Must parse amount to convert into number instead of string or totalSpent will be shown incorrectly
        addExpense() {
            let newExpense = {
                name: this.name,
                amount: parseFloat(this.amount),
                date: this.date,
                category:this.category
            }
            this.transactionList.push(newExpense);
            this.writeToLocalStorage(this.transactionList);
            this.name = '';
            this.amount = 0;
            this.date = '';
            // reduce method sums up the amount of each expense in transactionList and then adds it to totalSpent 
            this.totalSpent = this.transactionList.reduce((total, expense) => total + expense.amount, 0);
            this.updatePie();
        },

        deleteExpense(index) {
            this.transactionList.splice(index, 1);
            this.writeToLocalStorage();
            this.totalSpent = this.transactionList.reduce((total, expense) => total + expense.amount, 0);
            this.writeToLocalStorage(this.transactionList);
            this.updatePie();
        },

        computed: {
            sortedItems: function () {
                return this.items.sort((a, b) => new Date(a.date) - new Date(b.date))
            }
        },




        updatePie() {
            let canvas = document.querySelector("#pieCanvas");
            let c = canvas.getContext("2d");
            let radius = 50;
            let centerOfPie = 100;
            let startRotation = 0;
            c.clearRect(0,0,c.canvas.width,c.canvas.height);

            for (let category of this.categories) {
                let itemsOfCategory = this.transactionList.filter(x=>x.category == category);
                if(itemsOfCategory.length > 0){
                    let costOfItmes = itemsOfCategory.map(x => x.amount);
                    let totalCategoryCost = costOfItmes.reduce((accunulator, currentValue) => accunulator + currentValue);

                    let procentageOfTotal = totalCategoryCost / this.totalSpent;
                    makePieSlice(c, startRotation, startRotation + (360 * procentageOfTotal), centerOfPie, centerOfPie, radius, this.pieColors[this.categories.indexOf(category)]);
                    startRotation += 360*procentageOfTotal;
                }
            }

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