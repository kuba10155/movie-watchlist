const main = document.getElementById("main2")
const search = document.getElementById("search")
const data = JSON.parse(localStorage.getItem("myMovies"))


function check() {

  if(data.length != 0) {
    console.log(data)
    main.innerHTML = ""
    for(let i=0; i<data.length; i++) {
      render(data[i])
    }
  }
  else {
    main.innerHTML = `
    <div class="empty">
      <p class="first-message">Your watchlist is looking a little empty...</p>
      <a class="but watchlist-btn" href="index.html"><i class="fa-solid fa-circle-plus"></i> Let's add some movies!</a>
    </div>
    `
  }
}

document.addEventListener('click', function(e){
  console.log(e.target)
  if(e.target.dataset.btn){
    remove(e.target.dataset.btn)
  }
})

function remove(movieId) {
  const chosenMovie = data.filter(movie => movie.imdbID == movieId)[0]
  const index = data.indexOf(chosenMovie)
  data.splice(index, 1)
  localStorage.setItem('myMovies', JSON.stringify(data))
  check()
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
      <button data-btn="${data.imdbID}" class="watchlist-btn"><i class="fa-solid fa-circle-minus"></i> Remove</button>
      </div>
      <p>${data.Plot}</p>
      </div>
    </div>
    `
}

check()
/*

document.getElementById(`${data.imbdID}`).addEventListener("click", function() {
  localStorage.removeItem("myMovies")
  main.innerHTML = `
  <p class="first-message">Your watchlist is looking a little empty...</p>
  <a class="but watchlist-btn" href="index.html"><i class="fa-solid fa-circle-plus"></i> Let's add some movies!</a>
  `
})

*/
