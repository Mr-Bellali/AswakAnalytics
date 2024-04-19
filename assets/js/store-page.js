const addDataButton = document.getElementById("addDataButton");
const addDataModal = document.getElementById("addDataModal");
const cancelAddButton = document.getElementById("cancelAddButton");
const submitAddButton = document.getElementById("submitAddButton");

const editDataModal = document.getElementById("editDataModal");
const cancelEditButton = document.getElementById("cancelEditButton");
const applyEditButton = document.getElementById("applyEditButton");

const deleteDataModal = document.getElementById("deleteDataModal");
const cancelDeleteButton = document.getElementById("cancelDeleteButton");
const confirmDeleteButton = document.getElementById("confirmDeleteButton");

const temporaryStoreId = localStorage.getItem("temporaryStoreId");

console.log(temporaryStoreId);

var dataStorage = JSON.parse(localStorage.getItem("dataStorage")) || [];

addDataButton.addEventListener("click", () => {
    addDataModal.showModal();
});

cancelAddButton.addEventListener("click", () => {
    addDataModal.close();
});

const yearInput = document.getElementById("yearInput");
const turnoverInput = document.getElementById("turnoverInput");
const workforceInput = document.getElementById("workforceInput");
const surfaceInput = document.getElementById("surfaceInput");
const yearInputHelp = document.getElementById("yearInputHelp");
const turnoverInputHelp = document.getElementById("turnoverInputHelp");
const workforceInputHelp = document.getElementById("workforceInputHelp");
const surfaceInputHelp = document.getElementById("surfaceInputHelp");

document.addEventListener('DOMContentLoaded' , function () {
    renderData();
});

function renderData() {
    console.log("temporaryStoreId:", temporaryStoreId);
    const dataStorages = JSON.parse(localStorage.getItem("dataStorage")) || [];
    console.log("dataStorages:", dataStorages);
    const dashboardTable = document.getElementById("dashboard-table");

    dataStorages.forEach(function (dataStorage) {
        console.log("dataStorage.storeId:", dataStorage.storeId);
        if (dataStorage.storeId === temporaryStoreId) {
            console.log("Matched storeId:", dataStorage.storeId);
            const newLine = document.createElement("tr");
            newLine.innerHTML = `
            <td>${dataStorage.dataYear}</td>
            <td>${dataStorage.dataTurnover}</td>
            <td>${dataStorage.dataWorkforce}</td>
            <td>${dataStorage.dataSurface}</td>
            <td>
              <button class="modify-button" id="modifyButton">Modifier</button>
              <button class="delete-button" id="deleteButton">Supprimer</button>
            </td>
            `;
            dashboardTable.appendChild(newLine);
        }
    });

    const modifyButtons = document.querySelectorAll("#modifyButton");

    modifyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            editDataModal.showModal();
        });
    });

    const deleteButtons = document.querySelectorAll("#deleteButton");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            deleteDataModal.showModal();
        });
    });
}


const restoreDefault = () => {
    yearInputHelp.innerHTML = "";
    yearInputHelp.classList.add("hidden");
    yearInput.style.border = "1px var(--light-gray-color) solid";
    yearInput.style.outline = "none";

    turnoverInputHelp.innerHTML = "";
    turnoverInputHelp.classList.add("hidden");
    turnoverInput.style.border = "1px var(--light-gray-color) solid";
    turnoverInput.style.outline = "none";

    workforceInputHelp.innerHTML = "";
    workforceInputHelp.classList.add("hidden");
    workforceInput.style.border = "1px var(--light-gray-color) solid";
    workforceInput.style.outline = "none";

    surfaceInputHelp.innerHTML = "";
    surfaceInputHelp.classList.add("hidden");
    surfaceInput.style.border = "1px var(--light-gray-color) solid";
    surfaceInput.style.outline = "none";
};

window.addEventListener('load', () => {
    yearInput.value = '';
    turnoverInput.value = '';
    workforceInput.value = '';
    surfaceInput.value = '';
});


const addData = (dataYear, dataTurnover, dataWorkforce, dataSurface) => {
    const lastDataId = dataStorage.length > 0 ? parseInt(dataStorage[dataStorage.length - 1].dataId) : 0;
    const dataId = (lastDataId + 1).toString();

    dataStorage.push({
        dataId: dataId,
        storeId: temporaryStoreId,
        dataYear: dataYear,
        dataTurnover: dataTurnover,
        dataWorkforce: dataWorkforce,
        dataSurface: dataSurface
    });

    localStorage.setItem('dataStorage', JSON.stringify(dataStorage));
    //renderData();
};

submitAddButton.addEventListener("click", function () {
    restoreDefault();
    let isError = false;

    if (yearInput.value === '') {
        yearInputHelp.innerText = "Veuillez saisir une emplacement valide.";
        yearInputHelp.classList.remove("hidden");
        yearInput.style.border = "1px solid var(--red-color)";
        yearInput.style.outline = "4px solid var(--error-outline-red-color)";
        isError = true;
    }

    if (turnoverInput.value === '') {
        turnoverInputHelp.innerText = "Veuillez saisir une emplacement valide.";
        turnoverInputHelp.classList.remove("hidden");
        turnoverInput.style.border = "1px solid var(--red-color)";
        turnoverInput.style.outline = "4px solid var(--error-outline-red-color)";
        isError = true;
    }

    if (workforceInput.value === '') {
        workforceInputHelp.innerText = "Veuillez saisir une emplacement valide.";
        workforceInputHelp.classList.remove("hidden");
        workforceInput.style.border = "1px solid var(--red-color)";
        workforceInput.style.outline = "4px solid var(--error-outline-red-color)";
        isError = true;
    }

    if (surfaceInput.value === '') {
        surfaceInputHelp.innerText = "Veuillez saisir une emplacement valide.";
        surfaceInputHelp.classList.remove("hidden");
        surfaceInput.style.border = "1px solid var(--red-color)";
        surfaceInput.style.outline = "4px solid var(--error-outline-red-color)";
        isError = true;
    } 
    
    if (!isError) {
        const year = yearInput.value;
        const turnover = turnoverInput.value;
        const workforce = workforceInput.value;
        const surface = surfaceInput.value;

        addData(year, turnover, workforce, surface);

        yearInput.value = "";
        turnoverInput.value = "";
        workforceInput.value = "";
        surfaceInput.value = "";

        addDataModal.close();
        window.location.href = "./store-page.html";
    }
});