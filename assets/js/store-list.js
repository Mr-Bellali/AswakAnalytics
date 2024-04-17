let storeLocations = [];
if (localStorage.getItem('storeStorage')) {
    const storeStorage = JSON.parse(localStorage.getItem('storeStorage'));
    storeLocations = storeStorage.map(store => store.storeLocation);
}

const storeLocationSelect = document.getElementById('locationSelect');

storeLocations.forEach(storeLocation => {
    const option = document.createElement('option');
    option.textContent = storeLocation;
    storeLocationSelect.appendChild(option);
});


//function to change the id of the stores display


function ChangeID(storeId, newStoreId) {
    var storeDisplay = document.getElementById(storeId);
    storeDisplay.id = newStoreId;
}




document.addEventListener("DOMContentLoaded", function () {

    renderData();
});

// function to get name and city of the store
function renderData() {
    const stores = JSON.parse(localStorage.getItem("storeStorage")) || [];
    const storeDisplayHorizontal = document.querySelector('#stores-display-horizontal');
    storeDisplayHorizontal.innerHTML = "";

    stores.forEach(function (store){
        const newHorizontalCard = document.createElement("div");
        newHorizontalCard.classList.add("horizontal-card");

        newHorizontalCard.innerHTML = `
            <div class="store-img">
                <img src='./assets/img/aswa9-salam.jpg'> <img/>
            </div>
            <div class="store-detail-holder">
            <h3> ${store.storeName} </h3>
            <p> <i class="fas fa-map"></i> ${store.storeLocation}</p>
            </div>
        `
      storeDisplayHorizontal.appendChild(newHorizontalCard)
    })
}