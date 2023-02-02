const village1 = document.querySelector('.village1');
const village2 = document.querySelector('.village2');
const village3 = document.querySelector('.village3');
const village4 = document.querySelector('.village4');
const village5 = document.querySelector('.village5');

const data = JSON.parse(localStorage.getItem("rpg-game-data"))
village1.innerHTML = data.locations[0].name
village2.innerHTML = data.locations[1].name
village3.innerHTML = data.locations[2].name
village4.innerHTML = data.locations[3].name
village5.innerHTML = data.locations[4].name



village1.addEventListener('click', (e) => {
  localStorage.setItem("village-picked", 0)
  location.href = './village.html';
});
village2.addEventListener('click', (e) => {
  localStorage.setItem("village-picked", 1)
  location.href = './village.html';

});
village3.addEventListener('click', (e) => {
  localStorage.setItem("village-picked", 2)
  location.href = './village.html';

});
village4.addEventListener('click', (e) => {
  localStorage.setItem("village-picked", 3)
  location.href = './village.html';

});
village5.addEventListener('click', (e) => {
  localStorage.setItem("village-picked", 4)
  location.href = './village.html';

});