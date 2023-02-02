const villageName = document.querySelector(".village-name");
const monster1 = document.querySelector(".monsters1");
const monster2 = document.querySelector(".monsters2");
const monster3 = document.querySelector(".monsters3");
// const wooHooSound = document.querySelector('#woo-hoo-sound')
const data = JSON.parse(localStorage.getItem("rpg-game-data"));
const wooHooSound = new Audio(`/sound/epic_battle_music_1-6275 (1).mp3`);
const villagePicked = localStorage.getItem("village-picked");
const village = data.locations[villagePicked];

function storePage(){
  location.href=`./store.html`
}

function backToMap(){
    location.href = './map.html';
  }
  
villageName.innerText += village.name;

monster1.innerHTML = `<div>${village.monsters[0].name}</div><div>${village.monsters[0].gold}</div><button  class="choose-monster-button glow">Choose</button>`;
monster2.innerHTML = `<div>${village.monsters[1].name}</div><div>${village.monsters[1].gold}</div><button class="choose-monster-button glow">Choose</button>`;
monster3.innerHTML = `<div>${village.monsters[2].name}</div><div>${village.monsters[2].gold}</div><button class="choose-monster-button glow">Choose</button>`;

const chooseMonsterButtons = document.querySelectorAll(".choose-monster-button");

for (let i = 0; i < chooseMonsterButtons.length; i++) {
    chooseMonsterButtons[i].addEventListener("click", function () {
        wooHooSound.play()
        handleMonsterClick(i);
    });
}

for (let i = 0; i < chooseMonsterButtons.length; i++) {
    if (village.monsters[i].health > 0) {
        chooseMonsterButtons[i].addEventListener("click", function () {
            handleMonsterClick(i);
        });
    } else {
        chooseMonsterButtons[i].disabled = true;
        const monster = document.querySelector(`.monsters${i + 1}`);
        monster.classList.add("replace");
    }
}
function handleMonsterClick(index) {
    console.log("Monster chosen:", village.monsters[index].name);
    localStorage.setItem("monsterName", index);
    location.href = './index.html';
}

