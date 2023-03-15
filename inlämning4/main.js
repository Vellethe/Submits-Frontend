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
    methods: {
        addExpense() {
            let newExpense = {
                name: this.name,
                amount: this.amount,
                date: this.date
            }
            this.transactionList.push(newExpense),
                this.writeToLocalStorage();
            this.name = '',
                this.amount = 0,
                this.date = ''
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