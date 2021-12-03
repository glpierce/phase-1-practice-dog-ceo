const breedArray = []

document.addEventListener('DOMContentLoaded', event => {
    fetchPictures()
    fetchBreeds()
    document.querySelector("#breed-dropdown").addEventListener('change', (event) => changeList(event))
})

function fetchPictures() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(data => addPictures(data))
}

function addPictures(data) {
    for (i = 0; i < data.message.length; i++) {
        const img = document.createElement('img')
        img.src = data.message[i]
        document.getElementById('dog-image-container').appendChild(img)
    }
}

function fetchBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(resp => resp.json())
    .then(data => addBreeds(data))
}

function addBreeds(data) {
    Object.keys(data.message).forEach(breed => {
        const li = document.createElement('li')
        li.textContent = breed
        li.style.cursor = "pointer"
        li.addEventListener('click', (event) => changeColor(event))
        document.getElementById('dog-breeds').appendChild(li)
        breedArray.push(li)
        if (data.message[breed].length !== 0) {
            data.message[breed].forEach((subBreed) => {
                const li = document.createElement('li')
                li.textContent = subBreed + " " + breed
                li.style.cursor = "pointer"
                li.addEventListener('click', (event) => changeColor(event))
                document.getElementById('dog-breeds').appendChild(li)
                breedArray.push(li)
            })
        }
    })
}

function changeColor(event) {
    event.target.style.color = "red"
}

function changeList(event) {
    const breedDisplay = document.getElementById('dog-breeds')
    const selectedLetter = event.target.value
    const displayArray = breedArray.filter(breed => breed.textContent.charAt(0).toLowerCase() === selectedLetter)
    while (breedDisplay.firstChild) {
        breedDisplay.removeChild(breedDisplay.firstChild);
    }
    displayArray.forEach(breed => {
        breedDisplay.appendChild(breed)
    })
}