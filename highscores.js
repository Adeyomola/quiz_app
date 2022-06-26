const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores") || []);

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="highScore">${score.username} - ${score.score}</li> <hr>`;
  })
  .join(" ");
