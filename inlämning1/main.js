const api_url = "https://pixabay.com/api?key=33510753-f6643855c5ea09942a44e3e4b&per_page=10";

async function fetchData(keyWord, color, page) {

    let encodedKeyword = encodeURIComponent(keyWord);

    let modified_url = api_url + "&q=" + encodedKeyword;
    if (color != "anyColor") {
        modified_url += "&colors=" + color;
    }
    modified_url += "&page=" + page;

    let response = await fetch(modified_url)
    let data = await response.json();
    return data;
}

function CreatePicture(data) {
    let pictureList = document.querySelector("#pictureList");
    let newEntry = document.createElement("li");
    let picture = document.createElement("img");
    let tags = document.createElement("p");
    let author = document.createElement("p");

    picture.src = data.webformatURL;
    tags.innerText = data.tags;
    author.innerText = data.user;


    newEntry.append(picture)
    newEntry.append(tags)
    newEntry.append(author)

    pictureList.append(newEntry);
}


async function ShowNewData() {
    ClearData();
    let data = await fetchData(searchTerm, selectedColor, page);

    let totalPages = Math.ceil(data.totalHits / 10);

    if (page == 1) {
        document.querySelector("#previousButton").disabled = true;
    }
    else {
        document.querySelector("#previousButton").disabled = false;
    }

    if (page == totalPages) {
        document.querySelector("#nextButton").disabled = true;
    }
    else {

        document.querySelector("#nextButton").disabled = false;
    }

    for (let item of data.hits) {
        CreatePicture(item)
    }
}

function ClearData() {
    let pictureList = document.querySelector("#pictureList");
    pictureList.innerHTML = "";
}

function CreateButtons() {
    let buttonDiv = document.querySelector("#buttonDiv");

    let nextButton = document.createElement("button");
    let previousButton = document.createElement("button");

    nextButton.textContent = "Next";
    previousButton.textContent = "Previous";

    nextButton.id = "nextButton";
    previousButton.id = "previousButton";

    nextButton.onclick = event => {
        page += 1;
        ShowNewData()
    }
    previousButton.onclick = event => {
        page -= 1;
        ShowNewData()
    }



    buttonDiv.append(nextButton, previousButton)

}

let searchTerm = "";
let selectedColor = "";
let page = 1;

let form = document.querySelector("form");
form.onsubmit = event => {
    event.preventDefault();
    page = 1;
    searchTerm = form.searchQuerry.value;
    selectedColor = form.colorSelect.value;

    maxPages = Math.ceil()


    ClearData();


    CreateButtons();

    ShowNewData();
};

