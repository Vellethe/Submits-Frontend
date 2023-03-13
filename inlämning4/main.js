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
            transactionList: this.readFromLocalStorage() ?? getSeedData()







        }
    },
    methods: {
        writeToLocalStorage(data) {
            let stringJson = JSON.stringify(data);
            window.localStorage.setItem("data", stringJson);
        },
        readFromLocalStorage() {
            JSON.parse(window.localStorage.getItem("data"));
        },

        test() {
            this.testNum++;
            console.log("this is test" + this.testNum);
            console.log(this.transactionList)
        }
    }
}).mount('#app');