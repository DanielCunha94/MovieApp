const API_KEY = "09a8217caf2ed49ad1090c33deac5f40";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=09a8217caf2ed49ad1090c33deac5f40";
const imageURL = "https://image.tmdb.org/t/p/w500/";
const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");
const moviesSearchable = document.querySelector(".movies-searchable");
let moviesInformation;
load();

buttonElement.onclick = (event) => {
  event.preventDefault();
  const value = inputElement.value;
  inputElement.value = "";
  const newUrl = url + "&query=" + value;
  fetchAPIData(newUrl);
};

moviesSearchable.onclick = (event) => {
  let movie = moviesInformation[event.target.id];
  sessionStorage.setItem("movie", JSON.stringify(movie));
  window.location.href = "movieInfo.html";
};

function fetchAPIData(newUrl) {
  fetch(newUrl)
    .then((res) => res.json())
    .then((data) => {
      moviesInformation = data.results;
      sessionStorage.setItem("prevSearch", JSON.stringify(moviesInformation));
      moviesSearchable.innerHTML = "";
      load();
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
}

function load() {
  if (sessionStorage["prevSearch"] !== undefined) {
    let pv = sessionStorage.getItem("prevSearch");
    moviesInformation = JSON.parse(pv);
    const movieContainer = displayMovies(moviesInformation);
    moviesSearchable.innerHTML = "";
    moviesSearchable.appendChild(movieContainer);
    document.getElementById("loadDiv").style.display = "none";
  }
}

function displayMovies(movies) {
  const movieTemplate = movieSection(movies);
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");
  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

function movieSection(movies) {
  return movies
    .map((movie, index) => {
      if (movie.poster_path) {
        return `<div id=section${index} class="section">
      <img src=${imageURL + movie.poster_path} id=${index}>
      </div>`;
      }
    })
    .join("");
}
