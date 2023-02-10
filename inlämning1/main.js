let form = document.querySelector("form");


let searchTerm = "";
let selectedColor = "";

form.onsubmit = event => {
    event.preventDefault();

    searchTerm = form.searchQuerry.value;
    selectedColor = form.colorSelect.value;


};

