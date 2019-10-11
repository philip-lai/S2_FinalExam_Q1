const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const data = []
const classifyNav = document.querySelector('#classify-list')
const dataPanel = document.getElementById('data-panel')
const movieClassify = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}
const test = '1'
console.log(Number(test))


const classifyIndex = Object.keys(movieClassify)
const classifyNames = Object.values(movieClassify)

console.log(classifyIndex)
console.log(movieClassify['1'])

axios.get(INDEX_URL).then((response) => {
  data.push(...response.data.results)
  //console.log(data)
}).catch((err) => console.log(err))

function makeClassifyNav(classifylist) {
  for (let classify of classifylist) {
    classifyNav.innerHTML += ` <li class="nav-item">
    <a class="nav-link" data-toggle="pill" href="#">${classify}</a>
  </li>`
  }
}

function filterMovie(data, classifyIndex) {
  let htmlContent = ''
  data.forEach(function (item, index) {
    let genresContent = ''
    if (item.genres.indexOf(classifyIndex) !== -1) {
      for (let genres of item.genres) {
        genresContent += `<p>${classifyNames[genres - 1]}</p>`
      }

      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-3">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h6>
            </div>
            <div class="genres">
              ${genresContent}
            </div>
          </div>
        </div>      
      `
      console.log(item.title)
    }
  })
  return htmlContent
}

classifyNav.addEventListener('click', function () {
  const classifyName = event.target.textContent
  const index = classifyNames.indexOf(classifyName) + 1
  let filterHTMLcontent = ''
  console.log(index)
  filterHTMLcontent = filterMovie(data, index)
  dataPanel.innerHTML = filterHTMLcontent

  //const songURL = urlGenerate(songName)
  //axios.get(songURL)
  // .then(response => {
  //lyricsPanel.innerHTML

  // })
})



makeClassifyNav(classifyNames)