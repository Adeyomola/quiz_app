// declare and assign DOM elements
const question = document.getElementById("question");
const options = document.querySelectorAll(".option-text");
const questionCounterText = document.getElementById("questionCounterText");
const scoreText = document.getElementById("scoreText");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

// declare list, objects, and variables
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// fetch questions object from questions.json file
fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const formattedAnswers = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      formattedAnswers.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );
      formattedAnswers.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      return formattedQuestion;
    });

    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

// Constants
const correct_bonus = 10;
const max_questions = 5;

// startGame function
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  game.classList.remove("hidden");
  loader.classList.add("hidden");
  getNewQuestion();
};

// getNEwQuestion function
getNewQuestion = () => {
  // store score value in local storage with key "currentScore"
  localStorage.setItem("currentScore", score);

  // condition to take player to the end page when there are no more questions or when player exceeds number of questions
  if (availableQuestions === 0 || questionCounter >= max_questions) {
    // go to end page
    return window.location.assign("./last_page.html");
  }

  //   question counter
  questionCounter++;
  questionCounterText.innerText = `Question: ${questionCounter}/${max_questions}`;

  //   Update Progress Bar as question counter increments
  let progressBarWidth = (questionCounter / max_questions) * 100 + "%";
  progressBarFull.style.width = progressBarWidth;

  //   getting current question randomly from availableQuestions array
  let questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  //   looping through options DOM class to get each option from current question object
  options.forEach((option) => {
    const number = option.dataset["number"];
    option.innerHTML = currentQuestion["choice" + number];
  });
  //   remove the current question object from the available questions array
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// event listener for when you click on any of the options
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    // if not accepting answers, return
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    // get option details from event object target key
    const userChoice = e.target;
    const userAnswer = userChoice.dataset["number"];

    // verifying if option is correct: initialize the option as incorrect, then change to correct if condition is met
    let optionVerification = "incorrect";
    if (userAnswer == currentQuestion.answer) {
      optionVerification = "correct";
      score += correct_bonus;
      scoreText.innerText = `${score}`;
    }

    /* add the value of the optionVerification as a class to the parent element of the option (<div class="option-container">).
    Then go to CSS file then and assign background color to the two possible values of optionVerification */
    userChoice.parentElement.classList.add(optionVerification);

    /* set a timeout to remove the value of the optionVerification from the parent element of the option (<div class="option-container">)
    then getNewQuestion*/
    setTimeout(() => {
      userChoice.parentElement.classList.remove(optionVerification);
      getNewQuestion();
    }, 1000);
  });
});
