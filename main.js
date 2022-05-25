const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))

console.log(cities)

function findMatches(wordToMatch, cities){ // pure function
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi') 
        return place.city.match(regex) || place.state.match(regex)
        
    })
}

function numberWithCommas(x) {
   return (x * 1).toLocaleString(); 
   // [x*1] → 表示将字符串转化为数字，toLocaleString只支持number
}

function displayHandler(){
    const matchArray = findMatches(this.value, cities)
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi')
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `
    }).sort().join('') 
    suggestions.innerHTML = html 
}

const suggestions = document.querySelector('.suggestions')

const search = document.querySelector('.search')
search.addEventListener('change', displayHandler) 
search.addEventListener('keyup', displayHandler)

