const startGameButton = document.getElementById("btn-intro");
const playerNameInput = document.getElementById("player-name-input");

startGameButton.addEventListener("click" , ()=> {
    let playerName;
    if(playerNameInput.value === ""){
        playerName = "Player";
    }
    else{
        playerName = playerNameInput.value;
    }
    createData(playerName);
})

function createData(playerName){
    const playerStrength = Math.floor(Math.random()*10 + 1 );
    const playerDefense = Math.floor(Math.random()*10 + 1 );
    const playerDexterity = Math.floor(Math.random()*10 + 1 );
    const playerHealth = Math.floor(Math.random()*100 + 50 );
    const player = {
        name : playerName,
        strength : playerStrength,
        defense : playerDefense ,
        dexterity : playerDexterity,
        gold : 0,
        health : playerHealth,
        xp : 0,
        level : 1,
    }

    const locationNames = [  "Gloomwood Forest",  "Shadowcave",  "Thunderpeak Mountain",
      "Dragonfire River",  "Necro Valley",  "Mystic Meadow",  "Elderspire",  "Stormwatch Hill",
        "Moonlit Ruins",  "Frostfang Glacier",  "Bloodroot Forest",  "Sunburst Valley", 
         "Celestial Glade",  "Deadly Swamp",  "Blackcliff Mountain"];

    //use the array above an get 5 of the names in randomLocations[]
    const randomLocations = [];
    const remainingLocations = locationNames.slice();
    for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * remainingLocations.length);
    randomLocations.push(remainingLocations[randomIndex]);
    remainingLocations.splice(randomIndex, 1);
    }

    //random monsters names
    const monsterNames = [  "Goblin",  "Orc",  "Troll",  "Dragon",
      "Hydra",  "Kraken",  "Giant Spider",  "Mummy",  "Zombie",
        "Vampire",  "Werewolf",  "Skeleton",  "Witch",  "Demon",
          "Necromancer",  "Siren",  "Medusa",  "Minotaur",  "Gorgon",
            "Chimera",  "Phoenix",  "Unicorn",  "Griffin",  "Roc",
              "Giant",  "Harpy",  "Manticore",  "Basilisk",  "Drakon",
                "Cerberus"];

    //create array of locations
    const locations = [];
    for(let i=0 ; i< randomLocations.length ; i++){
        const monsters = [];
        for(let j =0 ; j<3 ; j++){
            const monsterStrength = Math.floor(Math.random()*5 + 1 );
            const monsterDefense = Math.floor(Math.random()*5 + 1 );
            const monsterDexterity = Math.floor(Math.random()*5 + 1 );
            const monsterHealth = Math.floor(Math.random()*50 + 25 );
            const monsterGold = Math.floor(Math.random()*50 + 25 );
            const randomIndex = Math.floor(Math.random() * monsterNames.length);
            const monsterName = monsterNames[randomIndex];
            monsterNames.splice(randomIndex , 1);
            const monster = {
                name : monsterName,
                strength : monsterStrength,
                defense : monsterDefense ,
                dexterity : monsterDexterity,
                gold : monsterGold,
                health : monsterHealth,
                xp : monsterHealth,
                level : 1,
            }
            monsters.push(monster);
        }
        locations.push({name:randomLocations[i] , monsters});
    }
    const data = {
        player , locations
    }
    localStorage.setItem("rpg-game-data" , JSON.stringify(data));
    console.log(JSON.stringify(data));
}