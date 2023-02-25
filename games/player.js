function loadGameData() {
let gameFile = localStorage.getItem("game-file");
let gameBackground = localStorage.getItem("game-background");
let gameTitle = localStorage.getItem("game-title");
let gameDescription = localStorage.getItem("game-description");

let game = document.getElementById("gameSrc");
let gameBackgroundElem = document.getElementById("gameBackground");
let gameTitleElem = document.getElementById("gameTitle");
let gameDescriptionElem = document.getElementById("gameDescription");
let miniGameTitle = document.getElementById("miniGameTitle");

game.src = gameFile || 'https://bing.com';
gameBackgroundElem.style.backgroundImage = 'url(' + gameBackground + ')' || 'url(../assets/hero.avif)';
gameTitleElem.innerHTML = '[' + gameTitle + ']' || 'Game Title';
gameDescriptionElem.innerHTML = gameDescription || 'Game Description';
miniGameTitle.innerHTML = gameTitle || 'Game Title';

}
loadGameData();