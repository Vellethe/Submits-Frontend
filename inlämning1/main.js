const api_url = "https://pixabay.com/api/33510753-f6643855c5ea09942a44e3e4b/pictures?result=10";

async function fetchData()
{
let response = await fetch (api_url)
let data = await response.json();
return data;
}

