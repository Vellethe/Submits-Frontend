function getSeedData() {
    let seedData = {
        "data": [
            {
                "transactionAmount": 20,
                "transactionDate": "2023-03-13",
                "transactionName": "apple"
            },
            {
                "transactionAmount": 20,
                "transactionDate": "2023-03-14",
                "transactionName": "book"
            }
        ]
    }
    return seedData.data;
}

const app = Vue.createApp({
    data() {
        return {

            testNum: 0,
            transactionList: this.readFromLocalStorage() ?? getSeedData(),
            name: "",
            amount: 0,
            date: "",
            totalSpent:

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





        writeToLocalStorage(data) {
            let stringJson = JSON.stringify(data);
            window.localStorage.setItem("data", stringJson);
        },
        readFromLocalStorage() {
            JSON.parse(window.localStorage.getItem("data"));
        },
    }
}).mount('#app');