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
  if (tasks.length == 0) {
    todoFooter.classList.add("hidden");
    toggleButton.classList.add("hidden");
  }
}

function filterTasks(filterMode = "") {
  console.log(tasks)
  let tasksIndexes = [];



  tasks.forEach(function (task, index) {
    tasksIndexes.push({ index: index, data: task })
  });


  let activeTasks = tasksIndexes.filter(task => !task.data.completed);

  let completedTasks = tasksIndexes.filter(task => task.data.completed);

  deleteAllButton.hidden = completedTasks.length == 0;

  if (filterMode.target != undefined) {
    filterMode = filterMode.target.name;
  }

  switch (filterMode) {
    case "all":
      allButton.classList.add("selected");
      activeButton.classList.remove("selected");
      completedButton.classList.remove("selected");

      displayTasks(tasksIndexes);
      break;
    case "active":
      activeButton.classList.add("selected");
      allButton.classList.remove("selected");
      completedButton.classList.remove("selected");

      displayTasks(activeTasks);
      break;
    case "completed":
      completedButton.classList.add("selected");
      activeButton.classList.remove("selected");
      allButton.classList.remove("selected");

      displayTasks(completedTasks);
      break;
    default:
      return;
  }
  curentFilterMode = filterMode
}

function displayTasks(tasks) {
  tasksList.innerHTML = "";
  tasks.forEach(function (task, i) {
    let listItem = document.createElement("li");
    listItem.classList.add("task");
    if (task.data.completed) {
      listItem.classList.add("completed");
    }

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = task.data.completed;
    checkbox.addEventListener("change", function () { toggleTaskCompletion(task.index); });

    // checkbox class connects with the buttons so it works no matter what "view"
    let taskDescription = document.createElement("span");
    taskDescription.innerText = task.data.description;

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", function () { deleteTask(task.index) })

    listItem.appendChild(checkbox);
    listItem.appendChild(taskDescription);
    listItem.appendChild(deleteButton);

    tasksList.appendChild(listItem);
  });
}

function toggleTaskCompletion(index) {
  let task = tasks[index];
  task.completed = !task.completed;

  filterTasks(curentFilterMode);
  updateItemCount();
}

function deleteTask(index) {

  tasks.splice(index, 1);

  filterTasks(curentFilterMode);
  updateItemCount();
}

allButton.addEventListener("click", filterTasks);
activeButton.addEventListener("click", filterTasks);
completedButton.addEventListener("click", filterTasks);

toggleButton.addEventListener("click", function () {
  let targetValue = !tasks.every(x => x.completed);

  for (let task of tasks) {
    task.completed = targetValue;
  }
  filterTasks(curentFilterMode);
  updateItemCount();
});


deleteAllButton.addEventListener("click", function () {
  let newList = [];
  for (let task of tasks) {
    if (task.completed == false) {
      newList.push(task);
    }
  }
  tasks = newList;
  filterTasks(curentFilterMode);
  updateItemCount();
});

