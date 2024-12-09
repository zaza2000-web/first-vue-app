const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRaund: 0,
            winner: null,
        }
    },

    methods: {
     attackMonster(){
        this.currentRaund++
        const randomChance = Math.floor(Math.random() * (15 - 5)) + 5;
        this.monsterHealth -= randomChance
        this.attackPlayer()
     },
     attackPlayer(){
        const randomChance = Math.floor(Math.random() * (15 - 8)) + 8;
        this.playerHealth -= randomChance
     },
     specialAttack(){
        this.currentRaund++
        const randomChance = Math.floor(Math.random() * (25 - 15)) + 15;
        this.monsterHealth -= randomChance
        this.attackPlayer()
     },
     
     getHeal(){
        this.currentRaund++
        const healValue = Math.floor(Math.random() * (20 - 10)) + 10;
        if(this.playerHealth + healValue > 100){
            this.playerHealth = 100
        }else{
            this.playerHealth += healValue
        }
     },


    },

    computed: {
        monsterHealtStyle(){
            if(this.monsterHealth < 0){
                return {widt: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerHealthStyle(){
            if(this.playerHealth < 0){
                return {widt: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecial(){
            return this.currentRaund %3 !==0
        },
        mayGetHeal(){
            return this.currentRaund % 5 !==0
        }
    },

    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
               this.winner = 'Draw '
               this.monsterHealth = 100
               this.playerHealth = 100
            }else if(value <= 0){
             this.winner = 'Monster is winner'
             this.monsterHealth = 100
             this.playerHealth = 100
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
             this.winner = 'Draw'
             this.monsterHealth = 100
             this.playerHealth = 100
            }else if(value <= 0){
             this.winner = 'Player is winner'
             this.monsterHealth = 100
             this.playerHealth = 100
    
            }
        }
    }


})



app.mount('#game')