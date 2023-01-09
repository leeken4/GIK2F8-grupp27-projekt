/****** EventListeners som "lyssnar" på när en användare markerar ett fält, skriver i ett fält, och lämnar ett fält ******/
/****** keyup - när en tangent trycks ned OCH upp igen. blur - när fältet lämnas. ******/
/****** Eventlyssnarna bakas in i en arrow-function, då parenteser inte går att använda. ******/
playerForm.fname.addEventListener('keyup', (e) => validateField(e.target));
playerForm.fname.addEventListener('blur', (e) => validateField(e.target));
playerForm.ename.addEventListener('keyup', (e) => validateField(e.target));
playerForm.ename.addEventListener('blur', (e) => validateField(e.target));
playerForm.shirtnr.addEventListener('keyup', (e) => validateField(e.target));
playerForm.shirtnr.addEventListener('blur', (e) => validateField(e.target));
playerForm.position.addEventListener('keyup', (e) => validateField(e.target));
playerForm.position.addEventListener('blur', (e) => validateField(e.target));
playerForm.lenght.addEventListener('keyup', (e) => validateField(e.target));
playerForm.lenght.addEventListener('blur', (e) => validateField(e.target));
playerForm.weight.addEventListener('keyup', (e) => validateField(e.target));
playerForm.weight.addEventListener('blur', (e) => validateField(e.target));
playerForm.snabbhet.addEventListener('input', (e) => validateField(e.target));
playerForm.snabbhet.addEventListener('blur', (e) => validateField(e.target));
playerForm.styrka.addEventListener('input', (e) => validateField(e.target));
playerForm.styrka.addEventListener('blur', (e) => validateField(e.target));
playerForm.passningar.addEventListener('input', (e) => validateField(e.target));
playerForm.passningar.addEventListener('blur', (e) => validateField(e.target));
playerForm.skott.addEventListener('input', (e) => validateField(e.target));
playerForm.skott.addEventListener('blur', (e) => validateField(e.target));
playerForm.greppsäkerhet.addEventListener('input', (e) => validateField(e.target));
playerForm.greppsäkerhet.addEventListener('blur', (e) => validateField(e.target));
playerForm.positionsspel.addEventListener('input', (e) => validateField(e.target));
playerForm.positionsspel.addEventListener('blur', (e) => validateField(e.target));

/****** Här lyssnar den efter ett click-event via submit-knappen. ******/
playerForm.addEventListener('submit', onSubmit);
const todoListElement = document.getElementById('todoList');



/****** Validering av formulär ******/
/****** Följande talar om för applikationen om de olika fälten i formulären har fått godkänd input.  ******/
/****** Alla är satta till true pga problem med liveServer, men skall väl egentligen vara false ******/
let fnameValid = true;
let enameValid = true;
let shirtnrValid = true;
let positionValid = true;
let lenghtValid = true;
let weightValid = true;
let snabbhetValid = true;
let styrkaValid = true;
let passningarValid = true;
let skottValid = true;
let greppsäkerhetValid = true;
let positionsspelValid = true;


const api = new Api('http://localhost:5001/players');

function validateField(field) {
  const { name, value } = field;
  let = validationMessage = '';    
  switch (name) {   
    case 'fname': {   
      if (value.length < 2) {       
        fnameValid = false;
        validationMessage =
        "Fältet 'Förnman' är obligatorisk.";
      } else {         
        fnameValid = true;
      }
      break;
    }
    case 'ename': {  
      if (value.length < 2) {
        enameValid = false;
        validationMessage =
        "Fältet 'Efternamn' är obligatorisk.";
      } else {
        enameValid = true;
      }
      break;
    }
    case 'shirtnr': {   
      if (value.length < 1) {
        shirtnrValid = false;
        validationMessage =
          "Fältet 'Tröjnummer' är obligatorisk.";
      } else {
        shirtnrValid = true;
      }
      break;
    }
    case 'position': {   
      if (value.length < 2) {
        positionValid = false;
        validationMessage =
          "Fältet 'Position' är obligatorisk.";
      } else {
        positionValid = true;
      }
      break;
    }
    case 'lenght': {   
      if (value.length < 1) {
        lenghtValid = false;
        validationMessage =
          "Fältet 'Längd' är obligatorisk.";
      } else {
        lenghtValid = true;
      }
      break;
    }
    case 'weight': {   
      if (value.length < 1) {
        weightValid = false;
        validationMessage =
          "Fältet 'Vikt' är obligatorisk.";
      } else {
        weightValid = true;
      }
      break;
    }
    case 'snabbhet': {
      if (value.length === 0) {
        snabbhetValid = false;
        validationMessage = "Fältet 'Snabbhet' är obligatorisk.";
      } else {
        snabbhetValid = true;
      }
      break;
    }
    case 'styrka': {   
      if (value.length === 0) { 
        styrkaValid = false;
        validationMessage = "Fältet 'Styrka' är obligatorisk.";
      } else {
        styrkaValid = true;
      }
      break;
    }
    case 'passningar': {   
      if (value.length === 0) { 
        passningarValid = false;
        validationMessage = "Fältet 'Passningar' är obligatorisk.";
      } else {
        passningarValid = true;
      }
      break;
    }
    case 'skott': {   
      if (value.length === 0) { 
        skottValid = false;
        validationMessage = "Fältet 'Skott' är obligatorisk.";
      } else {
        skottValid = true;
      }
      break;
    }
    case 'greppsäkerhet': {   
      if (value.length === 0) { 
        greppsäkerhetValid = false;
        validationMessage = "Fältet 'Greppsäkerhet' är obligatorisk.";
      } else {
        greppsäkerhetValid = true;
      }
      break;
    }
    case 'positionsspel': {   
      if (value.length === 0) { 
        positionsspelValid = false;
        validationMessage = "Fältet 'Positionsspel' är obligatorisk.";
      } else {
        positionsspelValid = true;
      }
      break;
    }
  }
  
  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove('hidden');
}

/* UPPGIFT 2A
1.2
Här definieras en funktion kallad onSubmit, vilken initiellt används som Event Handler för ett formulärelement. 
Den kollar om flera variabler som representerar validiteten av olika formulärfält är True eller False.
Om alla dessa variabler är True, kommer funktionen logga ett meddelande till konsollen och kalla en annan funktion; savePlayer.
*/

function onSubmit(e) { 
  e.preventDefault();
  if ( fnameValid && enameValid && shirtnrValid && positionValid && lenghtValid && weightValid && styrkaValid && snabbhetValid && positionsspelValid && greppsäkerhetValid && skottValid && passningarValid ) { 
    console.log('Submit');
    savePlayer();
  }
}

 /* UPPGIFT 2A
 1.3
 SavePlayer funktionen används för att spara en ny "player" till servern. Den gör det genom att skapa ett objekt med 11 properties: Fnamn, Enamn, tröjnummer osv .
 Till dessa egenskaper så tilldelar vi värdet av tre av våra formulär fält.
 "player"-objektet skickas sen vidare till en api.create function, som sänder en HTTP POST request för att skapa en ny "player" i servern.
 Om förfrågan är lyckad, så kallas funktionen renderList för att uppdatera listan med "players"
 */

function savePlayer() {
  const player = {
    fname: playerForm.fname.value,
    ename: playerForm.ename.value,
    shirtnr: playerForm.shirtnr.value,
    position: playerForm.position.value,
    lenght: playerForm.lenght.value,
    weight: playerForm.weight.value,
    snabbhet: playerForm.snabbhet.value,
    styrka: playerForm.styrka.value,
    passningar: playerForm.passningar.value,
    skott: playerForm.skott.value,
    greppsäkerhet: playerForm.greppsäkerhet.value,
    positionsspel: playerForm.positionsspel.value,
  };
  api.create(player).then((player) => {
    if (player) {
      renderList();
    }
  });
}
/*  Uppgift 2A
 1.1.0
 I denna funktion så printar vi ut listan i frontend genom att anropa metoden getAll som är vår get-metod, se filen Api.js. 
 1.1.2
 Vi sorterar även listan i nummerordning på tröjnummer.
 If satsen sker när parametern players och längden på players är större än 0, Då har vi en for each loop som ittererar genom listan
 och då anropar vi renderPlayer och skapar dessa div-ar när man klickar på Lägg till knappen och på så sätt sker detta dynamiskt.
 Och bara för att visa att spara-knappen är länkad med renderList-funktionen så kan vi visa det här ovan. (1.2) */
function renderList() {
  console.log('rendering'); 
  api.getAll().then((players) => { 
    todoListElement.innerHTML = '';
    players.sort(function(a, b){
      return b.shirtnr-a.shirtnr
    })
    if (players && players.length > 0) {       
      players.forEach((player) => {
          todoListElement.insertAdjacentHTML('afterbegin', renderPlayer(player));
      });
    }
  });
}

/* Uppgift 2A
1.0
I denna funktion har vi 12 parametrar, varav 11 är våra labels med samma variabelnamn.

id: en unik identifierare för spelaren
fname: spelarens förnamn
ename: spelarens efternamn
shirtnr: spelarens tröjnummer
position: spelarens position
lenght: spelarens längd i cm
weight: spelarens vikt i kg
snabbhet: en rating för spelarens snabbhet
styrka: en rating för spelarens styrka
passningar: en rating för spelarens passningar
skott: en rating för spelarens skott
greppsäkerhet: en rating för spelarens greppsäkerhet
positionsspel: en rating för spelarens positionsspel

Funktionen skapar en HTML-sträng som representerar en list-item-element med flera child-element.
Dessa element innehåller spelarens namn, tröjnummer, position och rating för olika skills.
HTML-strängen inkluderar även ett onclick-attribut för ett knapp-element som kallar funktionen deletePlayer och skickar den till spelarens id som ett argument.
Funktionen returnerar HTML-strängen så att den kan användas för att rendera spelaren på sidan.
*/

function renderPlayer({ id, fname, ename, shirtnr, position, lenght, weight, snabbhet, styrka, passningar, skott, greppsäkerhet, positionsspel}) {
  let html = `
    <li class="select-none mt-2 py-2 border-b border-blue-300">
      <div class="flex items-center p-1" id=${id}>
          <div class="flex-1 w-50%">
          <h3 class="mb-3 flex-1 text-xl font-bold text-green-800 uppercase">${fname} ${ename}</h3>
          <p class="mb-3 flex-1 font-bold text-green-600 ">Tröjnummer: ${shirtnr}</p>
          <p class="mb-3 flex-1 font-bold text-green-600 ">Position: ${position}</p>
          <p class="mb-3 flex-1 font-bold text-green-600 ">${lenght}cm | ${weight}kg</p>
          </div>
          <div class="flex-1 w-50%">
          <p class="mb-5 flex-1 font-bold text-blue-400 italic">Snabbhet: ${snabbhet}</p>
          <p class="mb-3 flex-1 font-bold text-blue-400 italic">Styrka: ${styrka}</p>
          <p class="mb-3 flex-1 font-bold text-blue-400 italic">Passningar: ${passningar}</p>
          <p class="mb-3 flex-1 font-bold text-blue-400 italic">Skott: ${skott}</p>
          <p class="mb-3 flex-1 font-bold text-blue-400 italic">Greppsäkerhet: ${greppsäkerhet}</p>
          <p class="mb-3 flex-1 font-bold text-blue-400 italic">Positionsspel: ${positionsspel}</p>
        </div>
        <div class="mr-20">
          <button onclick="deletePlayer(${id})" class="inline-block bg-green-400 px-3 py-1 text-xs border border-white rounded-md ml-2 hover:bg-green-300">Ta bort spelare</button>
          </div>
      </div>
    </li>`;
  return html;
}

function deletePlayer(id) {
  api.remove(id).then((result) => {
    renderList();
  });
}

renderList();
