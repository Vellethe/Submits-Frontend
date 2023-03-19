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

function findOutsideOfCricle(radians, centerX, centerY, radius) {
    let x = centerX + radius * Math.sin(radians);
    let y = centerY - radius * Math.cos(radians);

    return { x: x, y: y }
}

function makePieSlice(c, startAngle, endAngle, centerX, centerY, radius, color, text) {
    c.beginPath();
    c.moveTo(centerX, centerY);

    //draw a pie slice
    c.arc(centerX, centerY, radius, degreeToRadian(startAngle - 90), degreeToRadian(endAngle - 90));
    c.closePath();
    c.fillStyle = color;
    c.fill();
    c.stroke();

    //draw line from outside of circle
    let differnce = (endAngle - startAngle);
    let outsideOfCircle = findOutsideOfCricle(degreeToRadian(startAngle + (differnce / 2)), centerX, centerY, radius);


    let outsideOfCircle2 = findOutsideOfCricle(degreeToRadian(startAngle + (differnce / 2)), centerX, centerY, radius + 20);
    c.beginPath();
    c.moveTo(outsideOfCircle.x, outsideOfCircle.y);
    c.lineTo(outsideOfCircle2.x, outsideOfCircle2.y);
    c.stroke();

    //add text to line

    c.strokeText(text,outsideOfCircle2.x,outsideOfCircle2.y);
}


const app = Vue.createApp({
    data() {
        return {

            testNum: 0,
            transactionList: this.readFromLocalStorage() ?? getSeedData(),
            name: "",
            amount: 0,
            date: "",
            category: "",
            totalSpent: 0,
            categories: ["Food", "Utilities", "Saving", "Leisure", "Housing", "Other"],
            pieColors: ["Green", "Yellow", "Purple", "Blue", "Orange", "Gray"]
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
                category: this.category
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

        // computed: {
        //     sortedItems: function () {
        //         return this.items.sort((a, b) => new Date(a.date) - new Date(b.date))
        //     }
        // },

getgroupOnMonth(){
    let output = {};
    this.transactionList.forEach(function(item,index){

        let dateObj = new Date(item.date);
        let propName = dateObj.getFullYear()+" "+dateObj.getMonth();
        if(output.hasOwnProperty(propName))
        {
            output[propName].push({data:item,index:index});
        }
        else{
            output[propName] = [{data:item,index:index}];
        }
    });

    return output;
},


        sortListByDate()
        {
            this.transactionList = this.transactionList.sort((a, b) => 
            new Date(b.date) - new Date(a.date));
        },

        updatePie() {

            this.totalSpent = this.transactionList.reduce((total, expense) => total + expense.amount, 0);

            let canvas = document.querySelector("#pieCanvas");
            let c = canvas.getContext("2d");
            let radius = c.canvas.width/4;
            let centerOfPie = c.canvas.width/2;
            let startRotation = 0;
            c.clearRect(0, 0, c.canvas.width, c.canvas.height);

            for (let category of this.categories) {
                let itemsOfCategory = this.transactionList.filter(x => x.category == category);
                if (itemsOfCategory.length > 0) {
                    let costOfItmes = itemsOfCategory.map(x => x.amount);
                    let totalCategoryCost = costOfItmes.reduce((accunulator, currentValue) => accunulator + currentValue);

                    let procentageOfTotal = totalCategoryCost / this.totalSpent;

                    let curentIndex = this.categories.indexOf(category);

                    makePieSlice(c, startRotation, startRotation + (360 * procentageOfTotal), centerOfPie, centerOfPie, radius, this.pieColors[curentIndex],category);
                    startRotation += 360 * procentageOfTotal;
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