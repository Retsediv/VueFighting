new Vue({
    el: "#app",
    data: {
        gameStarted: false,
        logs: [],
        playerHealth: 20,
        computerHealth: 30,
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.computerHealth = 100;

            this.gameStarted = true;
        },

        giveUp(){
            if(confirm("Are you sure that you want to give up?")){
                this.playerHealth = 50;
                this.computerHealth = 50;
                this.logs = [];

                this.gameStarted = false;
            }
        },

        attack() {
            // Attack enemy
            let damage = this.calculateDamage();
            this.computerHealth -= damage;
            this.log(`You beat a computer to ${damage} health points`, 'player');
            // Check if player win
            if (this.checkWin()) {
                return;
            }

            // Attack yourself
            damage = this.calculateDamage();
            this.playerHealth -= damage;
            this.log(`Computer beat you to ${damage} health points`, 'computer');
            // Check if computer win
            this.checkWin();
        },

        checkWin() {
            if(this.playerHealth <= 0){
                this.playerHealth = 0;
                alert("Computer win(");

                return true;
            } else if (this.computerHealth <= 0){
                this.computerHealth = 0;
                alert("You win!");

                return true;
            }

            return false
        },

        calculateDamage(min = 5, max = 12) {
            return parseInt(Math.random() * (max - min) + min);
        },

        log(message, who) {
            this.logs.push({message, who});
        }
    }
});