let storeLocations = [];

if (localStorage.getItem('storeStorage')) {
    const storeStorage = JSON.parse(localStorage.getItem('storeStorage'));
    storeLocations = storeStorage.map(store => store.storeLocation);
    // Remove duplicates
    storeLocations = Array.from(new Set(storeLocations));
}

const storeLocationSelect = document.getElementById('locationSelect');

storeLocations.forEach(storeLocation => {
    const option = document.createElement('option');
    option.textContent = storeLocation;
    storeLocationSelect.appendChild(option);
});

storeLocationSelect.addEventListener('change', function () {
    const selectedLocation = this.value;
    renderData(selectedLocation);
});

document.addEventListener("DOMContentLoaded", function () {
    renderData("all");
});

function renderData(selectedLocation) {
    const stores = JSON.parse(localStorage.getItem("storeStorage")) || [];
    const storeDisplayHorizontal = document.getElementById('stores-display-horizontal');
    const storeDisplayVertical = document.getElementById('stores-display-vertical');
    storeDisplayHorizontal.innerHTML = "";
    storeDisplayVertical.innerHTML = "";

    let filteredStores;
    if (selectedLocation === "all") {
        filteredStores = stores;
    } else {
        filteredStores = stores.filter(store => store.storeLocation === selectedLocation);
    }

    filteredStores.forEach(function (store) {
        const newCard = document.createElement("div");
        newCard.classList.add("horizontal-card");
        const newVerticalCard = document.createElement("div");
        newVerticalCard.classList.add("vertical-card");

        newCard.innerHTML = `
            <div class="store-img">
                <img src="./assets/img/aswa9-salam.jpg">
            </div>
            <div class="store-detail-holder">
                <h3> ${store.storeName} </h3>
                <p> ${store.storeLocation}</p>
            </div>
        `;

        newVerticalCard.innerHTML = `
            <div class="store-img">
                <img src="./assets/img/aswa9-salam.jpg">
            </div>
            <div class="store-detail-holder">
                <h3> ${store.storeName} </h3>
                <p> ${store.storeLocation}</p>
            </div>
        `;

        storeDisplayHorizontal.appendChild(newCard);
        storeDisplayVertical.appendChild(newVerticalCard);
    });
}

function toggleDisplay(displayMode) {
    const verticalDisplay = document.getElementById('stores-display-vertical');
    const horizontalDisplay = document.getElementById('stores-display-horizontal');
    if (displayMode === "vertical") {
        verticalDisplay.style.display = "flex";
        horizontalDisplay.style.display = "none";
    } else {
        verticalDisplay.style.display = "none";
        horizontalDisplay.style.display = "flex";
    }
}

document.getElementById("btn").addEventListener("click", () => {
    toggleDisplay("vertical");
});

document.getElementById("btn1").addEventListener("click", () => {
    toggleDisplay("horizontal");
});
