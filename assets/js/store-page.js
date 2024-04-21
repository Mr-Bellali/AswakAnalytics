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

const storeStorage = JSON.parse(localStorage.getItem("storeStorage"));
const temporaryStoreId = localStorage.getItem("temporaryStoreId");

const yearInputModify = document.getElementById("yearInputModify");
const turnoverInputModify = document.getElementById("turnoverInputModify");
const workforceInputModify = document.getElementById("workforceInputModify");
const surfaceInputModify = document.getElementById("surfaceInputModify");

const yearInputModifyHelp = document.getElementById("yearInputModifyHelp");
const turnoverInputModifyHelp = document.getElementById("turnoverInputModifyHelp");
const workforceInputModifyHelp = document.getElementById("workforceInputModifyHelp");
const surfaceInputModifyHelp = document.getElementById("surfaceInputModifyHelp");

const dashboardHeading = document.getElementById("storeDashboardHeader");
const headingSupportingText = document.getElementById("storeDashboardHeaderSupportingText");

let dataId;
let dataIdIndex;

dashboardHeading.innerHTML = `${storeStorage[temporaryStoreId].storeName}`;
headingSupportingText.innerText = `À ${storeStorage[temporaryStoreId].storeLocation}`;



const restoreModifyDefault = () => {
    yearInputModifyHelp.innerHTML = "";
    yearInputModifyHelp.classList.add("hidden");
    yearInputModify.style.border = "1px var(--light-gray-color) solid";
    yearInputModify.style.outline = "none";

    turnoverInputModifyHelp.innerHTML = "";
    turnoverInputModifyHelp.classList.add("hidden");
    turnoverInputModify.style.border = "1px var(--light-gray-color) solid";
    turnoverInputModify.style.outline = "none";

    workforceInputModifyHelp.innerHTML = "";
    workforceInputModifyHelp.classList.add("hidden");
    workforceInputModify.style.border = "1px var(--light-gray-color) solid";
    workforceInputModify.style.outline = "none";

    surfaceInputModifyHelp.innerHTML = "";
    surfaceInputModifyHelp.classList.add("hidden");
    surfaceInputModify.style.border = "1px var(--light-gray-color) solid";
    surfaceInputModify.style.outline = "none";
};

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

document.addEventListener('DOMContentLoaded' , () => {
    renderData();
});

function renderData() {
    const dashboardTable = document.getElementById("dashboard-table");

    dataStorage.forEach(function (dataStorage) {
        if (dataStorage.storeId === temporaryStoreId) {
            const newLine = document.createElement("tr");
            newLine.innerHTML = `
            <td>${dataStorage.dataYear}</td>
            <td>${dataStorage.dataTurnover}</td>
            <td>${dataStorage.dataWorkforce}</td>
            <td>${dataStorage.dataSurface}</td>
            <td>
              <button class="modify-button" id="modifyButton" data-data-id="${dataStorage.dataId}">Modifier</button>
              <button class="delete-button" id="deleteButton" data-data-id="${dataStorage.dataId}">Supprimer</button>
            </td>
            `;
            dashboardTable.appendChild(newLine);
        }
    });

    const modifyButtons = document.querySelectorAll("#modifyButton");
    
    modifyButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            dataId = e.target.dataset.dataId;

            for (let i = 0; i < dataStorage.length; i++) {
                if (dataStorage[i].dataId === dataId) {
                    dataIdIndex = i;
                }
            }

            yearInputModify.value = dataStorage[dataIdIndex].dataYear;
            turnoverInputModify.value = dataStorage[dataIdIndex].dataTurnover;
            workforceInputModify.value = dataStorage[dataIdIndex].dataWorkforce;
            surfaceInputModify.value = dataStorage[dataIdIndex].dataSurface;
            editDataModal.showModal();
        });
    });

    cancelEditButton.addEventListener("click" , () => {
        editDataModal.close();
    })
    
    applyEditButton.addEventListener("click", ()=>{
        restoreModifyDefault(); 

        let isError = false;

        if (yearInputModify.value === '' || isNaN(yearInputModify.value)) {
            yearInputModifyHelp.innerText = "Veuillez saisir une année valide.";
            yearInputModifyHelp.classList.remove("hidden");
            yearInputModify.style.border = "1px solid var(--red-color)";
            yearInputModify.style.outline = "4px solid var(--error-outline-red-color)";
            isError = true;
        }
        
        if (turnoverInputModify.value === '' || isNaN(turnoverInputModify.value)) {
            turnoverInputModifyHelp.innerText = "Veuillez saisir un chiffre d'affaire valide.";
            turnoverInputModifyHelp.classList.remove("hidden");
            turnoverInputModify.style.border = "1px solid var(--red-color)";
            turnoverInputModify.style.outline = "4px solid var(--error-outline-red-color)";
            isError = true;
        }
        
        if (workforceInputModify.value === '' || isNaN(workforceInputModify.value)) {
            workforceInputModifyHelp.innerText = "Veuillez saisir une effectif valide.";
            workforceInputModifyHelp.classList.remove("hidden");
            workforceInputModify.style.border = "1px solid var(--red-color)";
            workforceInputModify.style.outline = "4px solid var(--error-outline-red-color)";
            isError = true;
        }
        
        if (surfaceInputModify.value === '' || isNaN(surfaceInputModify.value)) {
            surfaceInputModifyHelp.innerText = "Veuillez saisir une surface valide.";
            surfaceInputModifyHelp.classList.remove("hidden");
            surfaceInputModify.style.border = "1px solid var(--red-color)";
            surfaceInputModify.style.outline = "4px solid var(--error-outline-red-color)";
            isError = true;
        } 
        
        if (!isError) { 
            const newDataYear = yearInputModify.value;
            const newDataTurnOver = turnoverInputModify.value;
            const newDataWorkForce = workforceInputModify.value;
            const newDataSurface = surfaceInputModify.value;
            
            dataStorage[dataIdIndex].dataYear = newDataYear;
            dataStorage[dataIdIndex].dataTurnover = newDataTurnOver;
            dataStorage[dataIdIndex].dataWorkforce = newDataWorkForce;
            dataStorage[dataIdIndex].dataSurface = newDataSurface;
        
            localStorage.setItem("dataStorage", JSON.stringify(dataStorage));
            editDataModal.close();
            location.reload();
        }
    })

    const deleteButtons = document.querySelectorAll("#deleteButton");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            dataId = e.target.dataset.dataId;

            for (let i = 0; i < dataStorage.length; i++) {
                if (dataStorage[i].dataId === dataId) {
                    dataIdIndex = i;
                }
            }
        deleteDataModal.showModal();
        });
    });

    cancelDeleteButton.addEventListener("click", ()=> {
        deleteDataModal.close();
    })

    confirmDeleteButton.addEventListener("click" , () => {
        dataStorage.splice(dataIdIndex, 1);
        localStorage.setItem("dataStorage", JSON.stringify(dataStorage));
        deleteDataModal.close();
        location.reload();
    })
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
};

submitAddButton.addEventListener("click", function () {
    restoreDefault();
    let isError = false;

    if (yearInput.value === '' || isNaN(yearInput.value)) {
        yearInputHelp.innerText = "Veuillez saisir une année valide.";
        yearInputHelp.classList.remove("hidden");
        yearInput.style.border = "1px solid var(--red-color)";
        yearInput.style.outline = "4px solid var(--error-outline-red-color)";
        isError = true;
    }
    
    if (turnoverInput.value === '' || isNaN(turnoverInput.value)) {
        turnoverInputHelp.innerText = "Veuillez saisir un chiffre d'affaire valide.";
        turnoverInputHelp.classList.remove("hidden");
        turnoverInput.style.border = "1px solid var(--red-color)";
        turnoverInput.style.outline = "4px solid var(--error-outline-red-color)";
        isError = true;
    }
    
    if (workforceInput.value === '' || isNaN(workforceInput.value)) {
        workforceInputHelp.innerText = "Veuillez saisir une effectif valide.";
        workforceInputHelp.classList.remove("hidden");
        workforceInput.style.border = "1px solid var(--red-color)";
        workforceInput.style.outline = "4px solid var(--error-outline-red-color)";
        isError = true;
    }
    
    if (surfaceInput.value === '' || isNaN(surfaceInput.value)) {
        surfaceInputHelp.innerText = "Veuillez saisir une surface valide.";
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

//logout button
logoutButton.addEventListener("click", () => {
    const userData = JSON.parse(localStorage.getItem("userStorage"));
    for(let i = 0; i < userData.length; i++){
      if (userData[i].isActive === true){
        userData[i].isActive = false;
      }
    }
    localStorage.setItem("userStorage", JSON.stringify(userData));
    window.location.href = "login.html";
  });