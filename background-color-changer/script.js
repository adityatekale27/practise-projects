const button = document.querySelectorAll(".button");
const body = document.querySelector("body");
const randomButton = document.querySelector("#random");

button.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.id === "red") {
      body.style.backgroundColor = e.target.id;
      button.style.color = "white";
    } else if (e.target.id === "yellow") {
      body.style.backgroundColor = e.target.id;
    } else if (e.target.id === "blue") {
      body.style.backgroundColor = e.target.id;
      button.style.color = "white";
    } else if (e.target.id === "pink") {
      body.style.backgroundColor = e.target.id;
      button.style.color = "white";
    } else {
      body.style.backgroundColor = "white";
    }
  });
});

const randomColor = function () {
  const hex = "0123456789ABCDEF";
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[Math.floor(Math.random() * 16)];
  }
  return hexColor;
};

randomButton.addEventListener("click", () => {
  body.style.backgroundColor = randomColor();
});
