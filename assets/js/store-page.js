const addDataButton = document.getElementById("addDataButton");
const addDataModal = document.getElementById("addDataModal");
const cancelButton = document.getElementById("cancelButton");
const submitButton = document.getElementById("submitButton");

addDataButton.addEventListener("click", () => {
    addDataModal.showModal();
});

cancelButton.addEventListener("click", () => {
    addDataModal.close();
});