const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = fancyArray => {
    let domString = "";
    fancyArray.forEach((planet) => {
        domString += `<div class="card">`;
        domString += `<img src="${planet.imageUrl}">`;
        domString += `</div>`;
    });
    printToDom(domString, 'card-holder');
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", planets.json);
    myRequest.send();
}

function executeThisCodeIfXHRFails () {
    console.log("something broke")
}

function executeThisCodeAfterFileLoaded () {
    const data = JSON.parse(this.responseText);
}

startApplication();