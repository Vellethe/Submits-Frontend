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

function numberToMonth(num) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[num];
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

    //case 100%
    if(startAngle == 0 && endAngle == 360){
        c.beginPath();
        c.moveTo(centerX,centerY);

        let outsideOfRing = findOutsideOfCricle(0, centerX, centerY, radius - 1);

        c.lineTo(outsideOfRing.x,outsideOfRing.y);
        c.lineWidth = 2;
        c.strokeStyle = color;
        c.stroke();

        c.strokeStyle = "black";
        c.lineWidth = 1;
    }



    //draw line from outside of circle
    let differnce = (endAngle - startAngle);
    let outsideOfCircle = findOutsideOfCricle(degreeToRadian(startAngle + (differnce / 2)), centerX, centerY, radius);


    let outsideOfCircle2 = findOutsideOfCricle(degreeToRadian(startAngle + (differnce / 2)), centerX, centerY, radius + 20);
    c.beginPath();
    c.moveTo(outsideOfCircle.x, outsideOfCircle.y);
    c.lineTo(outsideOfCircle2.x, outsideOfCircle2.y);
    c.stroke();



    //add text to line
    c.font = "12px Arial"

    let textSize = c.measureText(text);
    let heightAproximation = 0;


    let temp = RelativeAnchorLocation(startAngle+(differnce/2),textSize.width,heightAproximation)
    c.strokeText(text, outsideOfCircle2.x+temp.x, outsideOfCircle2.y-temp.y);
}

function calculateIntersect(p1, p2, p3, p4) {
    //https://dirask.com/posts/JavaScript-calculate-intersection-point-of-two-lines-for-given-4-points-VjvnAj
    var c2x = p3.x - p4.x;
    var c3x = p1.x - p2.x;
    var c2y = p3.y - p4.y;
    var c3y = p1.y - p2.y;

    // down part of intersection point formula
    var d = c3x * c2y - c3y * c2x;


    var u1 = p1.x * p2.y - p1.y * p2.x; // (x1 * y2 - y1 * x2)
    var u4 = p3.x * p4.y - p3.y * p4.x; // (x3 * y4 - y3 * x4)

    // intersection point formula

    var px = (u1 * c2x - c3x * u4) / d;
    var py = (u1 * c2y - c3y * u4) / d;

    var p = { x: px, y: py };

    return p;
}

function angleIsBetween(n, a, b) {
    //https://www.xarg.org/2010/06/is-an-angle-between-two-other-angles/
	n = (360 + (n % 360)) % 360;
	a = (3600000 + a) % 360;
	b = (3600000 + b) % 360;

	if (a < b)
		return a <= n && n <= b;
	return a <= n || n <= b;
}


function RelativeAnchorLocation(angle, width, height) {
    //p1           p2    
    //
    //p3           p4
    let point1 = { x: width / 2, y: height / 2 };
    let point2 = { x: -width / 2, y: height / 2 };
    let point3 = { x: width / 2, y: -height / 2 };
    let point4 = { x: -width / 2, y: -height / 2 };


    //-90 to set 0 angle at top  +360 %360 to acaount for negative numbers
    let angleToP1 = (Math.atan2(point1.y, point1.x) * (180 / Math.PI) - 90+360)%360;
    let angleToP2 = (Math.atan2(point2.y, point2.x) * (180 / Math.PI) - 90+360)%360;
    let angleToP3 = (Math.atan2(point3.y, point3.x) * (180 / Math.PI) - 90+360)%360;
    let angleToP4 = (Math.atan2(point4.y, point4.x) * (180 / Math.PI) - 90+360)%360;


    let result = { x: 0, y: 0 };

    let centerPoint = { x: 0, y: 0 };
    let farPoint = findOutsideOfCricle(degreeToRadian(angle), 0, 0, 300);
    //top, right down left
    if (angleIsBetween(angle, angleToP1, angleToP2)) {
        result = calculateIntersect(point1, point2, centerPoint, farPoint);
    }
    else if (angleIsBetween(angle, angleToP2, angleToP3, farPoint)) {

        result = calculateIntersect(point2, point3, centerPoint, farPoint);
    }
    else if (angleIsBetween(angle, angleToP3, angleToP4)) {
        result = calculateIntersect(point3, point4, centerPoint, farPoint);
    }
    else {
        result = calculateIntersect(point4, point1, centerPoint, farPoint);
    }
    console.log({x:result.x-(width/2),y:result.y-(height/2)})
    return {x:result.x-(width/2),y:result.y-(height/2)}
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
            pieColors: ["Green", "Yellow", "Purple", "Blue", "Orange", "Gray"],
            monthToShow: "show all"
        }
    },

    computed: {
        totalSpentFormatted() {
            this.totalSpent = this.transactionList.reduce((total, expense) =>
                total + expense.amount, 0);
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
            this.name = '';
            this.amount = 0;
            this.date = '';
            // reduce method sums up the amount of each expense in transactionList and then adds it to totalSpent 
            this.totalSpent = this.transactionList.reduce((total, expense) =>
                total + expense.amount, 0);
            this.updatePie();
            this.transactionList = this.transactionList.sort((a, b) =>
                new Date(b.date) - new Date(a.date));
            this.writeToLocalStorage(this.transactionList);
        },

        deleteExpense(index) {
            this.transactionList.splice(index, 1);
            this.writeToLocalStorage();
            this.totalSpent = this.transactionList.reduce((total, expense) => total + expense.amount, 0);
            this.writeToLocalStorage(this.transactionList);
            this.updatePie();
            
        },

    //     deleteByMonth(month) {
    //   this.transactions = this.transactions.filter((transaction) => {
    //     const transactionMonth = transaction.date.split('-')[1];
    //     return transactionMonth !== month;
    //   });
    // },
          
        getgroupOnMonth() {
            let output = {};
            this.transactionList.forEach(function (item, index) {

                let dateObj = new Date(item.date);
                let propName = dateObj.getFullYear() + " " + numberToMonth(dateObj.getMonth());

                //add a category for all
                if (output.hasOwnProperty("show all")) {
                    output["show all"].push({ data: item, index: index });
                }
                else {
                    output["show all"] = [{ data: item, index: index }];
                }

                if (output.hasOwnProperty(propName)) {
                    output[propName].push({ data: item, index: index });
                }
                else {
                    output[propName] = [{ data: item, index: index }];
                }


            });

            return output;
        },

        getDataToShow() {
            return this.getgroupOnMonth()[this.monthToShow];

        },


        updatePie() {
            let toShow = this.getgroupOnMonth()[this.monthToShow].map(x=>x.data);
            this.totalSpent = toShow.reduce((total, expense) => total + expense.amount, 0);

            let canvas = document.querySelector("#pieCanvas");
            let c = canvas.getContext("2d");
            let radius = c.canvas.width / 4;
            let centerOfPie = c.canvas.width / 2;
            let startRotation = 0;
            c.clearRect(0, 0, c.canvas.width, c.canvas.height);

            for (let category of this.categories) {
                let itemsOfCategory = toShow.filter(x => x.category == category);
                if (itemsOfCategory.length > 0) {
                    let costOfItmes = itemsOfCategory.map(x => x.amount);
                    let totalCategoryCost = costOfItmes.reduce((accunulator, currentValue) => accunulator + currentValue);

                    let procentageOfTotal = totalCategoryCost / this.totalSpent;

                    let curentIndex = this.categories.indexOf(category);

                    makePieSlice(c, startRotation, startRotation + (360 * procentageOfTotal), centerOfPie, centerOfPie, radius, this.pieColors[curentIndex], category);
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