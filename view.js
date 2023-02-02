const attackButton = document.getElementById("attack-button");
const runButton = document.getElementById("run-button");
const startFightButton = document.getElementById("start-fight-button");
const monsterHealth = document.getElementById("monster-health-label");
const playerHealth = document.getElementById("player-health-label");
const playerDamage = document.getElementById("player-damage");
const monsterDamage = document.getElementById("monster-damage");
const villageButton = document.getElementById("village-button");
const newButton = document.getElementById("new-game-button");



function updateScreenStats(player , monster) {
    monsterHealth.innerText = monster.health + " hp";
    playerHealth.innerText = player.health + " hp";
}