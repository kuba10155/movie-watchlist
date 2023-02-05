const getBtn = document.getElementById("get-btn")
const main = document.getElementById("main")
const search = document.getElementById("search")
let movies = []
let chosenMovies = []

document.addEventListener('click', function(e) {
  console.log(e)
  if(e.target.id === 'get-btn'){
    searchMovie()
  }
  else if(e.target.dataset.btn) {
    addToLocalStorage(e.target.dataset.btn)
  }
  else {
    console.log("INNE")
  }
})

function searchMovie() {
  const title = search.value
  search.textContent = ""
  fetch(`https://www.omdbapi.com/?apikey=1336ac2d&s=${title}`)
    .then(res => res.json())
    .then(data => {
      if (data.Response == 'False') {
        main.innerHTML = `
        <div class="empty">
        <p class="first-message">Unable to find what you're looking for. Please try another search.</p>
        </div>
        `
      }
      else {
        fetchAgain(data)
      }
    })
    search.value = ""
}

function addToLocalStorage(movieId) {
  const chosenMovie = movies.filter(function(movie){
    return movie.imdbID === movieId
  })[0]
  chosenMovies.push(chosenMovie)
  localStorage.setItem("myMovies", JSON.stringify(chosenMovies))
}

function fetchAgain(data) {
  main.innerHTML = ""
  for (let i=0; i<data.Search.length; i++){
    console.log(data)
    fetch(`https://www.omdbapi.com/?apikey=1336ac2d&t=${data.Search[i].Title}`)
      .then(res => res.json())
      .then(data => {
        render(data)
      })
  }
}

function render(data) {
    main.innerHTML += `
    <div class="movie">
    <div>
    <img class="poster" src="${data.Poster}"></img>
    </div>
      <div class="rest">
      <div class="first-row">
      <h3>${data.Title}</h3>
      <h5><i class="star fa-solid fa-star"></i> ${data.imdbRating}</h5>
      </div>
      <div class="first-row">
      <h5>${data.Runtime}</h5>
      <h5>${data.Genre}</h5>
      <button id="watchlist-btn" data-btn="${data.imdbID}" class="watchlist-btn"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
      </div>
      <p>${data.Plot}</p>
      </div>
    </div>
    `
    movies.push(data)
}
