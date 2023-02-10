const api_url = "https://pixabay.com/api?key=33510753-f6643855c5ea09942a44e3e4b";

async function fetchData(keyWord, color) {

    let encodedKeyword = encodeURIComponent(keyWord);

    let modified_url = api_url + "&q=" + encodedKeyword;


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


async function ShowNewData(data) {
    for (let item of data.hits) {
        CreatePicture(item)
    }
}

function ClearData() {
    let pictureList = document.querySelector("#pictureList");
    pictureList.innerHTML ="";
}

let searchTerm = "";
let selectedColor = "";


let form = document.querySelector("form");
form.onsubmit = async event => {
    event.preventDefault();

    searchTerm = form.searchQuerry.value;
    selectedColor = form.colorSelect.value;



    ClearData();

    let x = fetchData(searchTerm, selectedColor);
    ShowNewData(await x)

};

