const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("tasks");
const footerMsg = document.getElementById("footer-msg");
const listContainer = document.querySelector(".todo-list");

function saveTasks() {
  const tasksArr = [];

  document.querySelectorAll("#tasks li").forEach((li) => {
    tasksArr.push({
      text: li.querySelector("span").textContent,
      completed: li.querySelector("span").classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach((task) => {
    const taskItem = createTaskItem(task.text, task.completed);
    taskList.appendChild(taskItem);
  });

  if (savedTasks.length > 0) {
    listContainer.classList.remove("hidden");
  }
}

function createTaskItem(taskText, isCompleted = false) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");

  span.textContent = taskText;
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete-btn");

  if (isCompleted) {
    span.classList.add("completed");
  }

  li.appendChild(span);
  li.appendChild(deleteBtn);

  li.addEventListener("click", () => {
    span.classList.toggle("completed");
    saveTasks();
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();

    if (!taskList.children.length) {
      listContainer.classList.add("hidden");
    }
  });

  return li;
}

function addTasks() {
  todoInput.focus();
  const taskText = todoInput.value.trim();

  if (!taskText) {
    footerMsg.textContent = `Please enter the task!`;
    return;
  }

  const taskItem = createTaskItem(taskText);
  taskList.appendChild(taskItem);
  listContainer.classList.remove("hidden");

  todoInput.value = "";
  todoInput.focus();
  footerMsg.textContent = "Manage your tasks effectively";

  saveTasks();
}

addBtn.addEventListener("click", addTasks);

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTasks();
  }
});

document.addEventListener("DOMContentLoaded", loadTasks);
