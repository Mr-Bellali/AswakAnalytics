// Retrieve store locations from localStorage
let storeLocations = [];
if (localStorage.getItem('storeStorage')) {
    const storeStorage = JSON.parse(localStorage.getItem('storeStorage'));
    storeLocations = storeStorage.map(store => store.storeLocation);
}

// Get the select element
const storeLocationSelect = document.getElementById('locationSelect');

// Populate options for storeLocation select
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
