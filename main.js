// universal print to dom function
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

// initial domString to load on page

const buildDomString = fancyArray => {
    let domString = "";
    fancyArray.forEach((planet) => {
        domString += `<div class="card">`;
        domString += `<div class="name">${planet.name}</div>`;
        domString += `<div class="middle">`;
        if (`${planet.name}` === `Jupiter`) {
            domString += `<img src="${planet.imageUrl}" id='jupiter' class="image">`;
        } else if (`${planet.name}` === `Saturn`) {
            domString += `<img src="${planet.imageUrl}" id='saturn' class="image">`;
        } else {
            domString +=    `<img src="${planet.imageUrl}" class="image">`;
        }
        domString += `</div> </div>`;
    });
    printToDom(domString, 'card-holder');
}

// XHR for Initial Dom String

function executeThisCodeIfXHRFails () {
    console.log("something broke")
}

function executeThisCodeAfterFileLoaded () {
    const data = JSON.parse(this.responseText);
    buildDomString(data.planets);
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}

startApplication();

// domString for big cards

const buildBigCard = fancyArray => {
    let newDomString = "";
    fancyArray.forEach((planet) => {
        newDomString += `<div id="myModal" class="modal">`;
        newDomString +=     `<div class="modal-content">`;
        newDomString +=         `<span class="close">&times;</span>`;
        newDomString +=         `<h1>${planet.name}</h1>`;
        newDomString +=         `<img src="${planet.imageUrl}" class="image">`;
        if (`${planet.isGasPlanet}`) {
            newDomString +=         `<h3>Gas Planet</h3>`;
        } else {
            newDomString +=         `<h3>Terrestrial Planet</h3>`;
        } 
        newDomString +=         `<h3>Number of Moons: ${planet.numberOfMoons}</h3>`;
        newDomString +=         `<h3>Name of Largest Moon: ${planet.nameOfLargestMoon}</h3>`;
        newDomString +=         `<p>${planet.description}</p>`;
        newDomString += `</div> </div>`;
    });
    printToDom(domString, 'card-holder');
}

// XHR for Big Cards

function exeThisIfLoads () {
    const newData = JSON.parse(this.responseText);
    buildBigCard(newData.planets);
}

const xhrForBigCard = () => {
    let myNewRequest = new XMLHttpRequest();
    myNewRequest.addEventListener("load", exeThisIfLoads);
    myNewRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myNewRequest.open("GET", "planets.json");
    myNewRequest.send();
}

xhrForBigCard();