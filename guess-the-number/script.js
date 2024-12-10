document.addEventListener("DOMContentLoaded", () => {
  const guessInput = document.getElementById("guess");
  const checkBtn = document.getElementById("checkBtn");
  const resetBtn = document.getElementById("resetBtn");
  const feedbackMsg = document.getElementById("message");
  const attempts = document.getElementById("attempts");

  const numArr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
    47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
  ];

  const randomNum = Math.floor(Math.random() * numArr.length);
  let remainingAttempts = 10;

  guessInput.addEventListener("click", () => {
    feedbackMsg.textContent = "Start guessing...";
    guessInput.value = "";
  });

  checkBtn.addEventListener("click", () => {
    if (isNaN(guessInput.value.trim()) || guessInput.value.trim() === "") {
      feedbackMsg.textContent = "Please enter a valid number";
    }

    const guessNumber = Number(guessInput.value.trim());

    const msg = guessCheck(guessNumber);
    feedbackMsg.textContent = msg;

    attempts.textContent = --remainingAttempts;

    if (remainingAttempts <= 0 || msg === "Congratulations!") {
      checkBtn.disabled = true;
      guessInput.disabled = true;
    }
  });

  function guessCheck(guess) {
    let msg = "";

    for (let i = 10; i >= 1; i--) {
      if (guess === randomNum) {
        msg = "Congratulations!";
        break;
      }

      msg = "Oops! Try again.";
    }

    return msg;
  }
});
