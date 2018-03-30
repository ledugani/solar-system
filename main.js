const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = fancyArray => {
    let domString = "";
    fancyArray.forEach((planet) => {
        domString += `<div class="card">`;
        domString += `<img src="${planet.imageUrl}" class="image">`;
        domString += `<div class="middle">`
        domString +=    `<div class="name">${planet.name}</div>`;
        domString += `</div> </div>`;
    });
    printToDom(domString, 'card-holder');
}

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