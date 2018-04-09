/*---------------------------------------- UNIVERSAL FX ----------------------------------------*/
// universal print to dom function

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

/*---------------------------------------- INITIAL CARDS ----------------------------------------*/

// initial domString to load on page

const buildDomString = fancyArray => {
    let domString = "";
    fancyArray.forEach((planet) => {
        domString += `<div class="card">`;
        domString += `<div class="name">${planet.name}</div>`;
        domString += `<div class="middle">`;
        if (`${planet.name}` === `Jupiter`) {
            domString += `<img src="${planet.imageUrl}" id='jupiter planet' class="image">`;
        } else if (`${planet.name}` === `Saturn`) {
            domString += `<img src="${planet.imageUrl}" id='saturn planet' class="image">`;
        } else {
            domString +=    `<img src="${planet.imageUrl}" id='planet' class="image">`;
        }
        domString += `</div> </div>`;
    });
    printToDom(domString, 'card-holder');
    addPlanetEventListeners();
}

// XHR for Initial Dom String

function executeThisCodeIfXHRFails () {
    console.log("something broke")
}

function executeThisCodeAfterFileLoaded () {
    const data = JSON.parse(this.responseText);
    buildDomString(data.planets);
}

const runSmallCards = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}

runSmallCards();

/*------------------------------------------ BIG CARDS ----------------------------------------*/

const modal = document.getElementById('myModal');

// domString for big cards

const buildBigCard = fancierArray => {
    let newDomString = "";
    fancierArray.forEach((planet) => {
        newDomString += `<div class="modal-content">`;
        newDomString +=     `<span class="close">&times;</span>`;
        newDomString +=     `<h1>${planet.name}</h1>`;
        newDomString +=     `<img src="${planet.imageUrl}" class="image">`;
        if (`${planet.isGasPlanet}`) {
            newDomString +=     `<h3>Gas Planet</h3>`;
        } else {
            newDomString +=     `<h3>Terrestrial Planet</h3>`;
        } 
        newDomString +=     `<h3>Number of Moons: ${planet.numberOfMoons}</h3>`;
        newDomString +=     `<h3>Name of Largest Moon: ${planet.nameOfLargestMoon}</h3>`;
        newDomString +=     `<p>${planet.description}</p>`;
        newDomString += `</div>`;
    });
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
}

const displayModalBox = (input) => {

    // XHR for Big Cards
    const xhrForBigCard = () => {
        let myNewRequest = new XMLHttpRequest();
        myNewRequest.addEventListener("load", printSinglePlanet);
        myNewRequest.addEventListener("error", executeThisCodeIfXHRFails);
        myNewRequest.open("GET", "planets.json");
        myNewRequest.send();
    }

    function printSinglePlanet() {
        const newData = JSON.parse(this.responseText).planets;
        for(let i=0; i < newData.length; i++) {
            if (newData[i].name == input) {
                buildBigCard(newData[i]);
            }
        }
    }
}

const planetClick = (e) => {
    let planet = "";
    if (e.target.classList.contains("image")) {
        planet = e.target.parentNode.parentNode.children[0].innerHTML;
    }
    e.target.parentNode.children[0].innerHTML;
    displayModalBox(planet);
    console.log(e);
}

// Event Listener for each card

const addPlanetEventListeners = () => {
    const planetButtons = document.getElementsByClassName('card');
    for(let i=0; i < planetButtons.length; i++) {
        planetButtons[i].addEventListener('click', planetClick);
    }
};
