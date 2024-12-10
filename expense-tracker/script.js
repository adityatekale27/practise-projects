// Wait for the DOM to load before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("expenseForm");
  const expenseTableBody = document.getElementById("expenseTable").querySelector("tbody");
  const expenseList = document.querySelector(".expense-list");

  // Event listener for the form submission
  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    
    expenseList.classList.remove('hidden')

    // Get the values from the form inputs
    const expenseName = document.getElementById("expenseName").value.trim();
    const expenseAmount = document.getElementById("expenseAmount").value.trim();

    // Validate inputs
    if (expenseName === "" || expenseAmount === "" || isNaN(expenseAmount) || parseFloat(expenseAmount) <= 0) {
      alert("Please enter a valid expense name and amount.");
      return;
    }

    // Add a new row to the table
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td>${expenseName}</td>
      <td>${parseFloat(expenseAmount).toFixed(2)}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    expenseTableBody.appendChild(newRow);

    // Clear the form inputs
    expenseForm.reset();

    // Add delete functionality to the delete button
    const deleteButton = newRow.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
      newRow.remove(); // Remove the row from the table
    });
  });
});
