// // // > RESOURCES
const API_KEY = '1ebc87f464422af0b44036ffb35a4c24';
const API_BASE = 'http://data.fixer.io/api/latest?access_key=';
const STORAGE_KEY = "xeu.data"
const DEFAULT_VALUE = 'EUR'
const API_FIXER = `${API_BASE}${API_KEY}`;

let currentData = [];

async function initData() {
    const response = await axios.get(`${API_FIXER}&base=${DEFAULT_VALUE}&symbols=USD,TND,GBP,JPY,BOB`)

    
    console.log('response >>>>', response)

    currentData = response.data.rates

    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData))
    
    console.log(currentData)

    // > Init select From
    // ------------------------
    let optionFrom = document.createElement("option");
    optionFrom.text = 'EUR'
    optionFrom.value = 'EUR'
    let selectFrom = document.getElementById('convertFrom')
    selectFrom.appendChild(optionFrom)



    for(let key in currentData){
        if(currentData.hasOwnProperty(key)) {
            let optionTo = document.createElement("option");
            optionTo.text = key;
            optionTo.value = key;
          
            let selectTo = document.getElementById('convertTo')
            selectTo.appendChild(optionTo);
        }
     }

     document.getElementById('convertionSubmit').onsubmit = function(e) {
         e.preventDefault();

         let convertingTo = document.getElementById('convertTo').value
         console.log('convertingTo', convertingTo);

         toRate = currentData[convertingTo],
         amount = document.getElementById('currencyValue').value;

         let calculation = amount * toRate;
        console.log(calculation);

         if(calculation === 0) {
            document.getElementById('output').innerHTML = 'Please enter a valid amount.';
         } else {
            document.getElementById('output').innerHTML = parseFloat(calculation).toFixed(3) + ' ' + convertingTo;
         }
    }

    // return currentData
} 

async function installServiceWorkerAsync() {
    let storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storage) {
        currentData = storage;
    }

    if ("serviceWorker" in navigator) {
        try {
            const sw = await navigator.serviceWorker.register('/service-worker.js');
            console.log('service registered: ', sw);

        } catch (err) {
            console.log(`failed to install sw . ERROR : ${err}`);

        }
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    // installServiceWorkerAsync()
});


