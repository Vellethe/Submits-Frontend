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
