// declare DOM elements
const saveScore = document.getElementById("saveScore");
const username = document.getElementById("username");
const finalScore = document.getElementById("finalScore");

// get score from local storage with currentScore created in game.js
const currentScore = localStorage.getItem("currentScore");
finalScore.innerText = currentScore;

// declare localstorage key for highScores ---JSON.Parse will convert highScores to JS Object
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// event listener for what happens when you fill input username input
username.addEventListener("keyup", () => {
  saveScore.disabled = !username.value;
});

saveScore.addEventListener("click", (e) => {
  e.preventDefault();
  const score = {
    username: username.value,
    score: currentScore,
  };
  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  setInterval(() => {
    return window.location.assign("/index.html");
  }, 1000);
});
