/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
export function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");
// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  console.log("...list", games);
  // loop over each item in the data

  for (let i = 0; i < games.length; i++) {
    // create a new div element, which will become the game card
    let game = document.createElement("div");
    // add the class game-card to the list

    game.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")

    let gameImg = document.createElement("img");
    games[i].img ? (gameImg.src = `${games[i].img}`) : null;
    gameImg.classList.add("game-img");
    game.append(gameImg);

    let gameName = document.createElement("h3");
    games[i].name ? (gameName.innerHTML = `${games[i].name}`) : null;
    game.append(gameName);

    let gameDesc = document.createElement("div");
    games[i].description
      ? (gameDesc.innerHTML = `${games[i].description}`)
      : null;
    game.append(gameDesc);

    let gameBacker = document.createElement("div");
    games[i].backers
      ? (gameBacker.innerHTML = `Backers: ${games[i].backers}`)
      : null;
    game.append(gameBacker);

    // append the game to the games-container
    gamesContainer.append(game);
  }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let totalContributions = GAMES_JSON.reduce((acc, eachGame) => {
  return acc + eachGame.backers;
}, 0);

// console.log("total Contribtions",totalContributions);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-us")}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let raisedAmount = GAMES_JSON.reduce((acc, eachGame) => {
  return acc + eachGame.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$ ${raisedAmount.toLocaleString("en-us")}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `${GAMES_JSON.length.toLocaleString("en-us")}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  let unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
  console.log("...unfunded games", unfundedGames.length);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  let fundedGames = GAMES_JSON.filter((game) => game.pledged > game.goal);

  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames);
  console.log("...funded games", fundedGames.length);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfunded = GAMES_JSON.reduce((acc, game) => {
  game.pledged < game.goal && acc++;
  return acc;
}, 0);

console.log("...num of unfunded games: ", unfunded);

// create a string that explains the number of unfunded games using the ternary operator
let description = `A total of $${raisedAmount.toLocaleString(
  "en-us"
)} has been raised for ${GAMES_JSON.length} games. Currently, ${unfunded} ${
  unfunded > 1
    ? "games remain unfunded. We need your help to fund these amazing games."
    : unfunded === 1
    ? "game remains unfunded. We need your help to fund this amazing game."
    : "all games have been funded."
}`;

// create a new DOM element containing the template string and append it to the description container
let descParagraph = document.createElement("p");
descParagraph.innerHTML = description;
descriptionContainer.append(descParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...rest] = sortedGames;
console.log(`the most funded game is: "${first.name}"`);
console.log(`the second most funded game is: "${second.name}"`);

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstGame = document.createElement("div");
firstGame.innerHTML = first.name;
firstGameContainer.append(firstGame);

// do the same for the runner up item
let secondGame = document.createElement("div");
secondGame.innerHTML = second.name;
secondGameContainer.append(secondGame);

/************************************************************************************
 * Challenge 8: Get to Our Games section from the navbar
 */

// get the header center
let headerCenter = document.querySelector(".headerCenter");

// create anchor tag

let navLink = document.createElement("a");
navLink.innerHTML = "Games";

navLink.setAttribute("href", "#ourGames");
navLink.classList.add("navLink");

headerCenter.append(navLink);

/************************************************************************************
 * Challenge 9: Search
 */

// Get header right
let headerRight = document.querySelector(".headerRight");

// create input element and append to headerRight
let search = document.createElement("input");
search.placeholder = "search";
search.classList.add("searchInput");
headerRight.append(search);

let inputValue;

// Add event listener to input element
search.addEventListener("change", (e) => {
  inputValue = e.target.value;
});
console.log(`input value ${inputValue}`);

// create search button
let searchBtn = document.createElement("button");
searchBtn.innerHTML = "Search";

headerRight.append(searchBtn);

searchBtn.addEventListener("click", () => {
  let searchFilter = GAMES_JSON.filter((obj) =>
    obj.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  deleteChildElements(gamesContainer);
  addGamesToPage(searchFilter);
});
