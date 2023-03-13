const app = Vue.createApp({
    data() {
        return {
            testNum:0
            







        }
    },
    methods:{
        test(){
            this.testNum++;
            console.log("this is test"+ this.testNum);
        }
    }
}).mount('#app');