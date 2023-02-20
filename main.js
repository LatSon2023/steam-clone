
const URL_GAMES = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?&limit=28`
const URL_GENRES = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres?&limit=15`
const gamesBox = document.querySelector('.games-box')

// get games data
const getGames = async () => {
    try {
        const response = await fetch(URL_GAMES)
        if (response.ok) {
            const data = await response.json()
            return data.data
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

// render games
const renderGames = async (list) => {
    try {
        const data = await list()
        gamesBox.innerHTML = ''
        data.forEach((game) => {
            const gameBox = document.createElement('div')
            gameBox.className = 'game-box'
            gameBox.setAttribute('appid',`${game.appid}`)
            gameBox.innerHTML = `
            <div class="img">
            <img src="${game["header_image"]}" alt="" class="game-img">
            </div>
            <div class="game-info"> 
            <span class="price-game"> Price:${game.price}$</span>
            </div>
            `
            gamesBox.appendChild(gameBox)
            gameBox.addEventListener('click', () => {
                window.location.href = `https://steam-freestyle-vuduc.netlify.app/detail-game/details.htm?appId=${game.appid}`
            })
        })
    } catch (error) {
        console.log(error)
    }
}

renderGames(getGames)


const getSearchingData = async (inputValue) => {
    try {
        let queryString = `&q=${inputValue}`
        const url = `${URL_GAMES}${queryString}`
        console.log(url)
        const response = await fetch(url)
        const data = await response.json()
        return data.data
    } catch (error) {
        console.log(error)
    }
}

const renderSearch = async () => {
    const inputValue = document.querySelector('.input-field').value
    if (inputValue) {
        gamesBox.innerHTML = ''
        const data = await getSearchingData(inputValue)
        data.forEach((game) => {
            const gameBox = document.createElement('div')
            gameBox.className = 'game-box'
            gameBox.setAttribute('appid',`${game.appid}`)
            gameBox.innerHTML = `
                <div class="img">
                    <img src="${game["header_image"]}" alt="" class="game-img">
                </div>
                <div class="game-info">
                    <span class="price-game"> Price:${game.price}$</span>
                </div>
            `
            gamesBox.appendChild(gameBox)
            gameBox.addEventListener('click', () => {
                window.location.href = `https://steam-freestyle-vuduc.netlify.app/detail-game/details.htm?appId=${game.appid}`
            })
        })
    }
    document.querySelector('.title').textContent = `Search: ${inputValue}`
}

const button = document.querySelector('.btn-search')
button.addEventListener('click', renderSearch)

const sideItems = document.querySelector('.side-items')

//get genres data
const getGenres = async () => {
    try {
        const response = await fetch(URL_GENRES)
        if (response.ok) {
            const data = await response.json()
            return data.data
        }
    } catch (error) {
        console.log(error)
    }
}

//render genre
const renderGenres = async () => {
    const data = await getGenres()
    data.forEach((genre) => {
        const genreList = document.createElement('li')
            genreList.className = 'side-item'
            genreList.innerHTML = `
            <a class="${genre.name.replaceAll(' ', '-')}" href="#">${genre.name}</a>
            `
        sideItems.appendChild(genreList)
    })
    return document.querySelectorAll('.side-item')
}

let urlByGenres = `${URL_GAMES}`
const title = document.querySelector('.title')


const convertGenre = async () => {
    // title.textContent = ''
    const genresList = await renderGenres()
    const addGenreUrl = (genre) => {
        urlByGenres += `&genres=${genre}`
    }
    const subGenreUrl = (genre) => {
        urlByGenres = urlByGenres.replace(`&genres=${genre}`, '')
    }
    // const addTitle = (genre) => {
    //     title.textContent += `Genre: - ${genre}`
    // }
    genresList.forEach((genre) => {
        genre.addEventListener('click', (e) => {
           genre.classList.toggle('on')
           const textOrigin = e.target.textContent
           const text = textOrigin.replaceAll(' ', '%20')
           if (genre.classList.contains('on')) {
               addGenreUrl(text)
            //    addTitle(textOrigin)
            } else {
                subGenreUrl(text)
            }
            renderGenreGameList()
        })
    })
}
const renderGenreGameList = async () => {
    const response = await fetch(urlByGenres)
    const data = await response.json()
    const arrData = data.data
    gamesBox.innerHTML = ''
    arrData.forEach((game) => {
        const gameBox = document.createElement('div')
            gameBox.className = 'game-box'
            gameBox.setAttribute('appid',`${game.appid}`)
            gameBox.innerHTML = `
                <div class="img">
                    <img src="${game["header_image"]}" alt="" class="game-img">
                </div>
                <div class="game-info">
                    <span class="price-game"> Price:${game.price}$</span>
                </div>
            `
            gamesBox.appendChild(gameBox)
        gameBox.addEventListener('click', () => {
                window.location.href = `https://steam-freestyle-vuduc.netlify.app/detail-game/details.htm?appId=${game.appid}`
            })
    })
}

convertGenre()


