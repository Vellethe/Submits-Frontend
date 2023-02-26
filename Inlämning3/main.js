let tasks = [];
let textbox = document.getElementById("textbox")
let button = document.getElementById("button")
let tasksList = document.getElementById("tasks");
let inputField = document.getElementById("userInput");
let allButton = document.querySelector(".all");
let activeButton = document.querySelector(".active");
let completedButton = document.querySelector(".completed");

function addListItem() 
{
  let task = {
    description: inputField.value,
    completed: false
  };
  tasks.push(task);

  let listItem = document.createElement("li");
  listItem.innerHTML = 
  ` <input type="checkbox">
    <span>${task.description}</span>
    <button class="delete">X</button>`
    ;
  tasksList.appendChild(listItem);

  inputField.value = "";

  updateItemCount();
}

function updateItemCount() 
{
  let activeTasks = tasks.filter(task => !task.completed);
  let itemsLeft = document.querySelector(".itemsLeft");
  itemsLeft.innerText = `${activeTasks.length} item${activeTasks.length === 1 ? "" : "s"} left`;
}

function filterTasks() {
  let activeTasks = tasks.filter(task => !task.completed);
  let completedTasks = tasks.filter(task => task.completed);

  switch (this.classList[0]) 
  {
    case "all":
      displayTasks(tasks);
      break;
    case "active":
      displayTasks(activeTasks);
      break;
    case "completed":
      displayTasks(completedTasks);
      break;
  }
}

function displayTasks(tasks) 
{
  tasksList.innerHTML = "";
  tasks.forEach(task => {
    let listItem = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    let taskDescription = document.createElement("span");
    taskDescription.innerText = task.description;
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.classList.add("delete");

    listItem.appendChild(checkbox);
    listItem.appendChild(taskDescription);
    listItem.appendChild(deleteButton);

    tasksList.appendChild(listItem);
  });
}

function toggleTaskCompletion(event) 
{
  let checkbox = event.target;
  let listItem = checkbox.parentElement;
  let taskDescription = listItem.querySelector("span");
  let taskIndex = Array.from(tasksList.children).indexOf(listItem);

  tasks[taskIndex].completed = checkbox.checked;
  taskDescription.classList.toggle("completed");

  updateItemCount();
}

function deleteTask(event) 
{
  let deleteButton = event.target;
  let listItem = deleteButton.parentElement;
  let taskIndex = Array.from(tasksList.children).indexOf(listItem);

  tasks.splice(taskIndex, 1);
  listItem.remove();

  updateItemCount();
}

allButton.addEventListener("click", filterTasks);
activeButton.addEventListener("click", filterTasks);
completedButton.addEventListener("click", filterTasks);
tasksList.addEventListener("click", event => {
  if (event.target.type === "checkbox") {
    toggleTaskCompletion(event);
  } else if (event.target.classList.contains("delete")) {
    deleteTask(event);
  }
});

  
