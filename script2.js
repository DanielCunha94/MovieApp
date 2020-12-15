const imageURL = "https://image.tmdb.org/t/p/w500/";
let trailer = "https://youtube.com/embed/";
let movie = JSON.parse(sessionStorage.getItem("movie"));
let backButton = document.getElementById("backbutton");

if (movie["backdrop_path"] != undefined) {
  document.querySelector(".moviePoster").style.backgroundImage = `url(${
    imageURL + movie["backdrop_path"]
  })`;
  document.querySelector(".moviePoster").style.backgroundSize = "cover";
  document.querySelector(".moviePoster").style.backgroundREpeat = "no-repeat";
}

document.getElementById("title").innerHTML = movie["original_title"];
document.getElementById("overview").innerHTML = movie["overview"];
document.getElementById("movieScore").innerHTML = movie["vote_average"];
document.getElementById("movieImage").src = imageURL + movie["poster_path"];

function genereteVideoURL(movie) {
  return `https://api.themoviedb.org/3/movie/${movie["id"]}/videos?api_key=09a8217caf2ed49ad1090c33deac5f40`;
}

let videoURL = genereteVideoURL(movie);

fetch(videoURL)
  .then((res) => res.json())
  .then((data) => {
    if (data.results[0]["site"] === "YouTube")
      trailer += data.results[0]["key"];
    document.getElementById("trailer").src = trailer;
  })
  .catch((error) => {
    console.log("Error: " + error);
  });

backbutton.onclick = (event) => {
  window.location.href = "index.html";
};
