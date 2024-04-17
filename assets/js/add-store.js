// Initialize empty storage objects
let userStorage = JSON.parse(localStorage.getItem('userStorage')) || [];
let storeStorage = JSON.parse(localStorage.getItem('storeStorage')) || [];
let dataStorage = [];

// Hardcoded default user
const defaultUser = {
    userId: "defaultUser123",
    userEmail: "default@example.com",
    userPassword: "defaultPassword",
    isActive: true
};

// Add the default user to userStorage if not already added
if (userStorage.length === 0) {
    userStorage.push(defaultUser);
    localStorage.setItem('userStorage', JSON.stringify(userStorage));
}

// Function to add a store to storeStorage
const addStore = (storeOpeningDate, storeLocation, storeName) => {
    // Get the last store ID from the storeStorage array
    const lastStoreId = storeStorage.length > 0 ? parseInt(storeStorage[storeStorage.length - 1].storeId) : -1;

    // Increment the store ID by one
    const storeId = (lastStoreId + 1).toString();

    // Add the store to storeStorage
    storeStorage.push({
        storeId: storeId,
        storeOpeningDate: storeOpeningDate,
        storeLocation: storeLocation,
        storeName: storeName
    });

    // Store storeStorage in localStorage after adding a store
    localStorage.setItem('storeStorage', JSON.stringify(storeStorage));
    console.log("Store added:", storeStorage);

    // Clear input fields after adding a store
    document.getElementById('openingDateInput').value = '';
    document.getElementById('locationInput').value = '';
    document.getElementById('nameInput').value = '';
};

document.getElementById('addButton').addEventListener('click', function() {
    // Get input values
    const openingDate = document.getElementById('openingDateInput').value;
    const location = document.getElementById('locationInput').value;
    const name = document.getElementById('nameInput').value;

    // Add the store using the input values
    addStore(openingDate, location, name);
});
