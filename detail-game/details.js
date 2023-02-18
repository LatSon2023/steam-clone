const search = window.location.search
const appId = search.slice(`${search.indexOf('=') + 1}`)
const URL = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${appId}`
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const renderGame = async () => {
    try {
        const response = await fetch(URL)
        const dataObj = await response.json()
        const data = dataObj.data

        $('.title').textContent = `${data.name}`
        $('.cost').textContent = `${data.price}$`
        $('.detail-wrap').style.backgroundImage = `url(${data.background})`
        $('.img img').src = `${data["header_image"]}`
        $('.desc').textContent = `${data.description}`
        $('.desc2 span').textContent = `${data.developer}`
        const tags = data['steamspy_tags']
        tags.forEach((tag) => {
            const newTag = document.createElement('a')
            newTag.className = 'tagg'
            newTag.textContent = tag
            newTag.href = '#'
            $('.tags-wrap').appendChild(newTag)
        })
    } catch (error) {
        console.log(error)
        return []
    }
}

renderGame()