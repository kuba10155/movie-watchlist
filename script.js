const getBtn = document.getElementById("get-btn")
const main = document.getElementById("main")
const search = document.getElementById("search")

getBtn.addEventListener('click', function() {
  const title = search.value
  search.textContent = ""
  fetch(`http://www.omdbapi.com/?apikey=1336ac2d&s=${title}`)
    .then(res => res.json())
    .then(data => {
      fetchAgain(data)
    })
    search.value = ""
})

function fetchAgain(data) {
  main.innerHTML = ""
  for (let i=0; i<data.Search.length; i++){
    console.log(data.Search[i].Title)
    fetch(`http://www.omdbapi.com/?apikey=1336ac2d&t=${data.Search[i].Title}`)
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
      <h5><i class="star fa-solid fa-star"></i> ${data.Ratings[0].Value.slice(0,3)}</h5>
      </div>
      <div class="first-row">
      <h5>${data.Runtime}</h5>
      <h5>${data.Genre}</h5>
      <button class="watchlist-btn"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
      </div>
      <p>${data.Plot}</p>
      </div>
    </div>
    `
}

// tylko mnie kochaj
/*
<div class="movie">
  <img class="poster" src="${data.Poster}"></img>
  <div class="first-row">
    <h3>${data.Title}</h3>
    <h5><i class="star fa-solid fa-star"></i>${data.Ratings} </h5>
  </div>
  <div class="second-row">
    <h5>${data.Runtime}</h5>
    <h5>${data.Genre}</h5>
    <button class="watchlist-btn"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
  </div>
  <div class="third-row">
    <p>${data.Plot}</p>
  </div>
</div>




*/
