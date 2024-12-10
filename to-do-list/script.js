document.addEventListener("DOMContentLoaded", () => {
  const toDoInput = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const toDoList = document.getElementById("todo-list");

  // Load tasks from localStorage or initialize an empty array
  let tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];

  // Render all tasks on page load
  tasksArr.forEach((task) => renderTask(task));

  // Add task button click handler
  addTaskBtn.addEventListener("click", () => {
    const taskText = toDoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasksArr.push(newTask);
    saveTasks();
    renderTask(newTask);
    toDoInput.value = "";
  });

  // Function to render a single task
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
    <span class="task-text">${task.text}</span>
    <button class="delete-btn">Delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      li.querySelector(".task-text").classList.toggle("completed");
      toggleCompleteTask(task.id);
      saveTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));

    toDoList.appendChild(li);
  }

  // Function to save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  }

  // Function to toggle task completion
  function toggleCompleteTask(taskId) {
    tasksArr = tasksArr.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }

      return task;
    });

    saveTasks();
    refreshList();
  }

  // Function to delete a task
  function deleteTask(taskId) {
    tasksArr = tasksArr.filter((task) => task.id !== taskId);

    saveTasks();
    refreshList();
  }

  // Function to refresh the task list
  function refreshList() {
    toDoList.innerHTML = ""; // Clear the list
    tasksArr.forEach((task) => renderTask(task)); // Re-render all tasks
  }
});
