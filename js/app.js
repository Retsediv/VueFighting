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
            this.logs = [];

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

        attack(min, max) {
            // Attack enemy
            let damage = this.calculateDamage(min, max);
            this.computerHealth -= damage;
            this.log(`You beat a computer to ${damage} health points`, 'player');
            // Check if player win
            if (this.checkWin()) {
                return;
            }

            // Attack yourself
            damage = this.calculateDamage(min, max);
            this.playerHealth -= damage;
            this.log(`Computer beat you to ${damage} health points`, 'computer');
            // Check if computer win
            this.checkWin();
        },

        specialAttack(){
            return this.attack(2, 25);
        },

        heal(){
            // Attack enemy
            let healingPoints = this.calculateDamage();
            this.playerHealth += healingPoints;
            this.log(`You healed yourself for ${healingPoints} health points`, 'player');
            // Check if player win
            if (this.checkWin()) {
                return;
            }

            // Attack yourself
            let damage = this.calculateDamage();
            this.playerHealth -= damage;
            this.log(`Computer beat you to ${damage} health points`, 'computer');
            // Check if computer win
            this.checkWin();
        },

        checkWin() {
            if(this.playerHealth <= 0){
                this.playerHealth = 0;
                this.gameStarted = false;
                if(confirm("You lose. New game?")){
                    this.startGame();
                }

                return true;
            } else if (this.computerHealth <= 0){
                this.computerHealth = 0;
                this.gameStarted = false;
                if(confirm("You win! New game?")){
                    this.startGame();
                }

                return true;
            }

            return false
        },

        calculateDamage(min = 5, max = 12) {
            return parseInt(Math.random() * (max - min) + min);
        },

        log(message, who) {
            this.logs.unshift({message, who});
        }
    }
});