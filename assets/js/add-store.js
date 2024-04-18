let storeStorage = JSON.parse(localStorage.getItem('storeStorage')) || [];
let dataStorage = [];

const openingDateInput = document.getElementById('openingDateInput');
const locationInput = document.getElementById('locationInput');
const nameInput = document.getElementById('nameInput');
const openingDateInputHelp = document.getElementById("openingDateInputHelp")
const locationInputHelp = document.getElementById("locationInputHelp")
const nameInputHelp = document.getElementById("nameInputHelp");


const addStore = (storeOpeningDate, storeLocation, storeName) => {
    const lastStoreId = storeStorage.length > 0 ? parseInt(storeStorage[storeStorage.length - 1].storeId) : 0;
    console.log(lastStoreId);

    const storeId = (lastStoreId + 1).toString();
    console.log(storeId);

    storeStorage.push({
        storeId: storeId,
        storeOpeningDate: storeOpeningDate,
        storeLocation: storeLocation,
        storeName: storeName
    });

    localStorage.setItem('storeStorage', JSON.stringify(storeStorage));
    console.log("Store added:", storeStorage);
};

const restoreDefault = () => {
    nameInputHelp.innerText = "";
    nameInputHelp.classList.add("hidden");
    nameInput.style.border = "1px var(--light-gray-color) solid";
    nameInput.style.outline = "none";
    locationInputHelp.innerText = "";
    locationInputHelp.classList.add("hidden");
    locationInput.style.border = "1px var(--light-gray-color) solid";
    locationInput.style.outline = "none";
    openingDateInputHelp.innerText = "";
    openingDateInputHelp.classList.add("hidden");
    openingDateInput.style.border = "1px var(--light-gray-color) solid";
    openingDateInput.style.outline = "none";
}

window.addEventListener('load', () => {
    document.getElementById('openingDateInput').value = '';
    document.getElementById('locationInput').value = '';
    document.getElementById('nameInput').value = '';
});

document.getElementById('addButton').addEventListener('click', function() {
    const currentDate = new Date(); 
    restoreDefault();
    
    if (locationInput.value === '') {
        locationInputHelp.innerText = "Veuillez saisir une emplacement valide.";
        locationInputHelp.classList.remove("hidden");
        locationInput.style.border = "1px solid var(--red-color)";
        locationInput.style.outline = "4px solid var(--error-outline-red-color)";  
    } 
    
    if (nameInput.value === '') {
        nameInputHelp.innerText = "Veuillez saisir un nom valide.";
        nameInputHelp.classList.remove("hidden");
        nameInput.style.border = "1px solid var(--red-color)";
        nameInput.style.outline = "4px solid var(--error-outline-red-color)";
    } 
    
    if (openingDateInput.value === '') {
        openingDateInputHelp.innerText = "Veuillez saisir une date d'ouverture valide.";
        openingDateInputHelp.classList.remove("hidden");
        openingDateInput.style.border = "1px solid var(--red-color)";
        openingDateInput.style.outline = "4px solid var(--error-outline-red-color)"; 
    } 
    
    else {
        const openingDate = new Date(openingDateInput.value); 
        const location = document.getElementById('locationInput').value;
        const name = document.getElementById('nameInput').value;

        if (openingDate > currentDate || isNaN(openingDate)) { 
            const openingDateInputHelp = document.getElementById("openingDateInputHelp")
            openingDateInputHelp.innerText = "Veuillez saisir une date d'ouverture valide.";
            openingDateInputHelp.classList.remove("hidden");
            openingDateInput.style.border = "1px solid var(--red-color)";
            openingDateInput.style.outline = "4px solid var(--error-outline-red-color)";
        } 
        
        else if (location && name) { 
            addStore(openingDateInput.value, location, name);
            openingDateInput.value = "" ;
            locationInput.value = "" ; 
            nameInput.value = "" ;
        }
    }
});