let tasks = document.getElementById("tasks")
let textbox = document.getElementById("textbox")
let button = document.getElementById("button")

button.addEventListener("click", function()
{
    let newTask = document.createElement("li")
    newTask.innerHTML = textbox.value;
    tasks.appendChild(newTask);
    textbox.value = "";
});

function addListItem() {
    var userInput = document.getElementById("userInput").value;
    var listItem = document.createElement("li");
    var checkbox = document.createElement("input");
    listItem.textContent = userInput;
    checkbox.type = "checkbox";
    listItem.insertBefore(checkbox, listItem.firstChild);
    document.getElementById("tasks").appendChild(listItem);
}

  
