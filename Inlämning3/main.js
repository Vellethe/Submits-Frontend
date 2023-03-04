let tasks = [];

let textbox = document.getElementById("textbox");
let tasksList = document.getElementById("tasks");
let inputField = document.getElementById("userInput");
let allButton = document.querySelector("[name=\"all\"]");
let activeButton = document.querySelector("[name=\"active\"]");
let completedButton = document.querySelector("[name=\"completed\"]");
let form = document.querySelector("form");
let todoFooter = document.querySelector(".todoFooter");
let toggleButton = document.querySelector(".toggleButton");
let deleteAllButton = document.querySelector("#deleteAll");

let curentFilterMode = "all";

form.onsubmit = event => {
  event.preventDefault();
  addListItem();
  todoFooter.classList.remove("hidden");
  toggleButton.classList.remove("hidden");
}


function addListItem() {
  let task = {
    description: inputField.value,
    completed: false
  };
  tasks.push(task);

  inputField.value = "";
  filterTasks(curentFilterMode);
  updateItemCount();
}

function updateItemCount() {
  let activeTasks = tasks.filter(task => !task.completed);
  let itemsLeft = document.querySelector(".itemsLeft");

  itemsLeft.textContent = `${activeTasks.length} item${activeTasks.length === 1 ? "" : "s"} left`;
}

function filterTasks(filterMode = "") {
  console.log(tasks)
  let activeTasks = tasks.filter(task => !task.completed);
  let completedTasks = tasks.filter(task => task.completed);

  deleteAllButton.hidden = completedTasks.length == 0;

  if (filterMode.target != undefined) {
    filterMode = filterMode.target.name;
  }

  switch (filterMode) {
    case "all":
      displayTasks(tasks);
      break;
    case "active":
      displayTasks(activeTasks);
      break;
    case "completed":
      displayTasks(completedTasks);
      break;
    default:
      return;
  }
  curentFilterMode = filterMode
}

function displayTasks(tasks) {
  tasksList.innerHTML = "";
  tasks.forEach(task => {
    let listItem = document.createElement("li");
    listItem.classList.add("task");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () { filterTasks(curentFilterMode); console.warn("testign") });

    // checkbox class connects with the buttons so it works no matter what "view"
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

function toggleTaskCompletion(event) {
  let checkbox = event.target;
  let listItem = checkbox.parentElement;
  let taskDescription = listItem.querySelector("span");
  let taskIndex = Array.from(tasksList.children).indexOf(listItem);

  tasks[taskIndex].completed = checkbox.checked;
  taskDescription.classList.toggle("completed");

  updateItemCount();
}

function deleteTask(event) {
  let deleteButton = event.target;
  let listItem = deleteButton.parentElement;
  let taskIndex = Array.from(tasksList.children).indexOf(listItem);

  tasks.splice(taskIndex, 1);
  listItem.remove();

  if (tasks.length == 0) {
    todoFooter.classList.add("hidden");
    toggleButton.classList.add("hidden");
  }

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

toggleButton.addEventListener("click", function () {
  let targetValue = !tasks.every(x=> x.completed);
      
  for(let task of tasks){
    task.completed = targetValue;
  }
  filterTasks(curentFilterMode);
  updateItemCount();
});


deleteAllButton.addEventListener("click", function () {
  let newList = [];
  for(let task of tasks){
    if(task.completed == false){
      newList.push(task);
    }
  }
  tasks = newList;
  filterTasks(curentFilterMode);
  updateItemCount();
});

