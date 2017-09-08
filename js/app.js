const HEAL_MIN = 4,
    HEAL_MAX = 16,
    ATTACK_MIN = 6,
    ATTACK_MAX = 12,
    SPECIAL_ATTACK_MIN = 2,
    SPECIAL_ATTACK_MAX = 25;

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

        attack(min=ATTACK_MIN, max=ATTACK_MAX) {
            // Attack enemy
            let damage = this.calculateDamage(min, max);
            this.computerHealth -= damage;
            this.log(`You beat a computer to ${damage} health points`, 'player');
            // Check if player win
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack(min, max);
        },

        specialAttack(){
            return this.attack(SPECIAL_ATTACK_MIN, SPECIAL_ATTACK_MAX);
        },

        heal(){
            // Heal yourself
            let healingPoints = this.calculateDamage(HEAL_MIN, HEAL_MAX);
            if (this.playerHealth + healingPoints > 100){
                this.playerHealth = 100;
            } else {
                this.playerHealth += healingPoints;
            }
            this.log(`You healed yourself for ${healingPoints} health points`, 'player');

            this.monsterAttack(ATTACK_MIN, ATTACK_MAX)
        },

        monsterAttack(min, max){
            // Computer attack you
            let damage = this.calculateDamage(min, max);
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

        calculateDamage(min, max) {
            return parseInt(Math.random() * (max - min) + min);
        },

        log(message, who) {
            this.logs.unshift({message, who});
        }
    }
});