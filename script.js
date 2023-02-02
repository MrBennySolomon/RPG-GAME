const data =JSON.parse(localStorage.getItem("rpg-game-data"));
const villagePicked = localStorage.getItem("village-picked");
const monsterIndex = localStorage.getItem("monsterName");
// get the chosen monster
const monster = data.locations[villagePicked].monsters[monsterIndex];
//get the data of the player
const player = data.player;

function startFight(player, monster) {
    console.log("fight starts ... ");
    updateScreenStats(player, monster);
    fight(player, monster);
}

async function fight(player, monster) {
    villageButton.style.display = "none";
    newButton.style.display = "none";
    // here is the fight prosecdure 
    let isPlayerTurn = doesPlayerStart(player, monster);
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (player.health <= 0) {
            //player lose
            console.log("Player Lost");
            updateData();
            animateInfo(playerDamage , "PLAYER DIED" , true);
            newButton.style.display = "inline";
            return;
        }
        else if (monster.health <= 0) {
            // monster is dead player win
            console.log("Monster is dead");
            const gold = monster.gold;
            monster.gold = 0;
            const xp = monster.xp;
            monster.xp = 0;
            player.xp += xp;
            player.gold += gold;
            console.log(player);
            updateData();
            animateInfo(monsterDamage , "MONSTER DIED" , true);
            villageButton.style.display = "inline";
            return;
        }
        if (isPlayerTurn) {
            // wait for instructions from the UI (attack / run)
            console.log("Waiting for users action");
            let decision;
            await new Promise(resolve => {
                attackButton.addEventListener("click", () => {
                    decision = 0;
                    resolve();
                });
                runButton.addEventListener("click", () => {
                    decision = 1;
                    resolve();
                });

            });

            if (decision === 1) {
                //player end the fight and run
                console.log("Player ran away");
                updateData();
                animateInfo(playerDamage , "PLAYER RAN AWAY" , true);
                villageButton.style.display = "inline";
                return;
            }
            else if (decision === 0) {
                //player attack the monster
                console.log("player attacked");
                const damage = attack(player, monster);
                // the player was damaged x 
                animateInfo(monsterDamage , damage);
                isPlayerTurn = !isPlayerTurn;
                updateScreenStats(player, monster);
                continue;
            }
        }
        else {
            //mosnter attack 
            //wait 1500 ms then attack 
            console.log("monster attacked");
            const damage = attack(monster, player);
            animateInfo(playerDamage , damage);
            // display that with animation
            isPlayerTurn = !isPlayerTurn;
            updateScreenStats(player, monster);
            continue;
        }
    }
}

function attack(attacker, defender) {
    let damage = Math.floor(Math.random() * 20 + 1);
    console.log(`random number to attak is ${damage}`);
    damage += attacker.strength;
    console.log(`after adding strength ${damage}`);
    damage *= attacker.level;
    console.log(`multiplyed by level ${damage}`);
    damage -= defender.defense;
    console.log(`after sybstracting defense ${damage}`);
    if (damage < 0) {
        damage = 0;
    }
    if (damage > defender.health) {
        damage = defender.health;
    }
    defender.health -= damage;
    console.log(`damage done was ${damage}`);
    console.log(`health of ${defender.name} is down to ${defender.health}`);
    return damage;
}

function doesPlayerStart(player, monster) {
    const playerLuck = Math.random() * 20;
    const monsterLuck = Math.random() * 20;
    if (playerLuck + player.dexterity > monsterLuck + monster.dexterity) {
        return true;
    }
    if (playerLuck + player.dexterity < monsterLuck + monster.dexterity) {
        return false;
    }
    // if it equals do it again 
    return doesPlayerStart(player, monster);
}

function updateData(){
    data.locations[villagePicked].monsters[monsterIndex] = monster;
    data.player = player;
    localStorage.setItem("rpg-game-data" , JSON.stringify(data));
}

function animateInfo(uiElement , messege , keep){
    uiElement.innerText = messege;
    
    if(keep === undefined){
        uiElement.classList.add("animate")
        setTimeout(()=>{
            uiElement.classList.remove("animate");
            uiElement.innerText = "";
        } , 2000);
    }
    else{
        setTimeout(()=>{
            uiElement.classList.remove("animate");
            uiElement.innerText = messege;
        } , 2000);
    }
}

newButton.addEventListener("click" , ()=>{
    location.href = './intro.html';
});

villageButton.addEventListener("click" , ()=>{
    location.href = './village.html';
})

console.log(monster);
//for now will start the fight automaticly 
startFight(player, monster);