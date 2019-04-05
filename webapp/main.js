// // // > RESOURCES
// const axios = require('axios');
const API_KEY = '1ebc87f464422af0b44036ffb35a4c24';
const API_BASE = 'http://data.fixer.io/api/latest?access_key=';
const STORAGE_HISTORY_KEY = "pwanime.history"
const API_FIXER = `${API_BASE}${API_KEY}&base=EUR`;

async function getData() {
    const response = await axios.get(API_FIXER)
    // const { results } = await response
    console.log('RES', response)
    return response.data
} 

// getData()

async function installServiceWorkerAsync() {
    let storage = JSON.parse(localStorage.getItem(STORAGE_HISTORY_KEY));
    if (storage) {
        mangaHistory = storage;
        addMangaToMarkupSelector(mangaHistory, "#history");
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
    document.querySelector("#search").addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            // document.querySelector("#button-search").click();
        }
    });

    installServiceWorkerAsync()
});
