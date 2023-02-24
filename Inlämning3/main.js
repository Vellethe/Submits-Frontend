let tasks = document.getElementById("tasks")
let textbox = document.getElementById("textbox")
let button = document.getElementById("button")

function addListItem() {
    let userInput = document.getElementById("userInput").value;
    let listItem = document.createElement("li");
    let checkbox = document.createElement("input");
    let deleteButton = document.createElement("button");
  
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  
    deleteButton.onclick = function() {
      this.parentNode.remove();
    };
    
    listItem.textContent = userInput;
    checkbox.type = "checkbox";
    listItem.insertBefore(checkbox, listItem.firstChild);
    listItem.appendChild(deleteButton);
    document.getElementById("tasks").appendChild(listItem);
    document.getElementById("userInput").value = "";
  
    deleteButton.classList.add("delete");
    checkbox.classList.add("checkbox");
  }

  
