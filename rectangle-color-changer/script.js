const rectangle = document.getElementById("rectangle");
const body = document.querySelector('body');

rectangle.addEventListener("mousemove", function (details) {
  const rect = rectangle.getBoundingClientRect();
  const insideRect = Math.round(details.clientX - rect.left);

  const ratio = insideRect/rect.width;

  if (ratio < 0.25) {
    rectangle.textContent = "Red"
  } else if (ratio < 0.75) {
    rectangle.textContent = "Green";
  } else {
    rectangle.textContent = "Blue";
  }
  
  if (ratio < 0.5) {
    // Transition from red to green in the first half
    red = 255 * (1 - 2 * ratio); // Decrease red
    green = 255 * (2 * ratio); // Increase green
    blue = 0; // Keep blue at 0
  } else {
    // Transition from green to blue in the second half
    red = 0; // Keep red at 0
    green = 255 * (1 - 2 * (ratio - 0.5)); // Decrease green
    blue = 255 * (2 * (ratio - 0.5)); // Increase blue
  }

  const color = `rgb(${red}, ${green}, ${blue})`;
  body.style.backgroundColor = color;
});

rectangle.addEventListener("mouseleave", () => {
  body.style.backgroundColor = "";
  rectangle.textContent = "Move your mouse here";
});