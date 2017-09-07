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
        attack() {
            // Attack enemy
            this.computerHealth -= this.calculateDamage();
            // Check if player win
            if (this.checkWin()) {
                return;
            }

            // Attack yourself
            this.playerHealth -= this.calculateDamage();
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

        log(message) {
            this.logs.push(message);
        }
    }
});