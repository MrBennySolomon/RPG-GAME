const monsterFight = localStorage.getItem("monsterName");



const monsterTurn = document.querySelector(".monsterTurn");

monsterTurn.classList.add(`monster${+monsterFight + 1}`);