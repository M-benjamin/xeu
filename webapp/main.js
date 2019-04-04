// > RESOURCES
let mangaHistory = [];
const API_BASE = 'https://api.jikan.moe/v3';
const STORAGE_HISTORY_KEY = "pwanime.history"
const API_MANGA = `${API_BASE}/search/manga?limit=12&genre=1`;

function addMangaMarkup({ image_url, title }) {
    return `
        <div class="column is-1"> 
            <div class="card is-shady">
                <div class="card-image"> 
                    <figure class="image">
                        <img src="${image_url}">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <h4>${title}</h4> 
                    </div>
                </div>
            </div>               
        </div>
    `
}

function updateHistory(arrayManga) {
    mangaHistory = mangaHistory.concat(arrayManga)
    addMangaToMarkupSelector(arrayManga, '#history')
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(mangaHistory))

}

function addMangaToMarkupSelector(arrayManga, selector) {
    let el = document.querySelector(selector)

    arrayManga.forEach(manga => {
        el.innerHTML = addMangaMarkup(manga) + el.innerHTML
    });
}

async function searchManga() {
    const query = document.querySelector('#search').value

    try {
        const response = await fetch(`${API_MANGA}&q=${query}`)

        if (!response.ok) {
            return;
        }

        const { results } = await response.json()

        // > Reset search
        document.querySelector('#current').innerHTML = ''
        addMangaToMarkupSelector(results, '#current')
        updateHistory(results)

    } catch (error) {
        console.log('ERROR', error)
    }
}
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
            document.querySelector("#button-search").click();
        }
    });

    installServiceWorkerAsync()
});

