// Array of questions
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2, // Index of the correct option
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: 3,
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Control Style Sheets"],
    correct: 1,
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    correct: 1,
  },
];

// Initialize variables
let currentQuestion = 0;
let score = 0;

// Select elements
const questionElement = document.getElementById("question");
const optionsButtons = document.querySelectorAll(".option-btn");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");

// Load the quiz
function loadQuiz() {
  const currentQuizData = quizData[currentQuestion];
  questionElement.textContent = currentQuizData.question;
  optionsButtons.forEach((btn, index) => {
    btn.textContent = currentQuizData.options[index];
    btn.classList.remove("selected");
  });
}

// Select an answer
optionsButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    optionsButtons.forEach((btn) => btn.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

// Submit the answer
submitButton.addEventListener("click", () => {
  const selectedOption = document.querySelector(".option-btn.selected");
  if (!selectedOption) {
    alert("Please select an answer!");
    return;
  }

  const selectedAnswer = parseInt(selectedOption.dataset.id);
  if (selectedAnswer === quizData[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});

// Show the result
function showResult() {
  resultContainer.classList.remove("hidden");
  scoreElement.textContent = `${score} / ${quizData.length}`;
  document.getElementById("quiz").classList.add("hidden");
}

// Restart the quiz
restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultContainer.classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  loadQuiz();
});

// Start the quiz
loadQuiz();