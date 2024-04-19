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

//modify inputs 
const yearInputModify = document.getElementById("yearInputModify");
const turnoverInputModify = document.getElementById("turnoverInputModify");
const workforceInputModify = document.getElementById("workforceInputModify");
const surfaceInputModify = document.getElementById("surfaceInputModify");

//modify help 
const yearInputModifyHelp = document.getElementById("yearInputModifyHelp");
const turnoverInputModifyHelp = document.getElementById("turnoverInputModifyHelp");
const workforceInputModifyHelp = document.getElementById("workforceInputModifyHelp");
const surfaceInputModifyHelp = document.getElementById("surfaceInputModifyHelp");

// titles 

const dashboardHeading = document.getElementById("dashboard-heading");
const headingSupportingText = document.getElementById("heading-supporting-text")

let dataIndex ;

dashboardHeading.innerHTML = `${storeStorage[temporaryStoreId].storeName}`
headingSupportingText.innerHTML = `${storeStorage[temporaryStoreId].storeLocation}`



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

document.addEventListener('DOMContentLoaded' , function () {
    renderData();
});

function renderData() {
    const dataStorages = JSON.parse(localStorage.getItem("dataStorage")) || [];
    const dashboardTable = document.getElementById("dashboard-table");

    dataStorages.forEach(function (dataStorage , index) {
        if (dataStorage.storeId === temporaryStoreId) {
            const newLine = document.createElement("tr");
            newLine.innerHTML = `
            <td>${dataStorage.dataYear}</td>
            <td>${dataStorage.dataTurnover}</td>
            <td>${dataStorage.dataWorkforce}</td>
            <td>${dataStorage.dataSurface}</td>
            <td>
              <button class="modify-button" id="modifyButton" data-index="${index}">Modifier</button>
              <button class="delete-button" id="deleteButton" data-index="${index}">Supprimer</button>
            </td>
            `;
            dashboardTable.appendChild(newLine);
        }
    });

    const modifyButtons = document.querySelectorAll("#modifyButton");
    
    modifyButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            dataIndex = e.target.dataset.index;

            yearInputModify.value = dataStorage[dataIndex].dataYear;
            turnoverInputModify.value = dataStorage[dataIndex].dataTurnover;
            workforceInputModify.value = dataStorage[dataIndex].dataWorkforce;
            surfaceInputModify.value = dataStorage[dataIndex].dataSurface;
            editDataModal.showModal();
        });
    });

    cancelEditButton.addEventListener("click" , () => {
        editDataModal.close()
    })
    
    applyEditButton.addEventListener("click", ()=>{
        restoreModifyDefault(); 

        let isError = false;

        if (yearInputModify.value === '' || isNaN(yearInputModify.value)) {
            yearInputHelp.innerText = "Veuillez saisir un emplacement valide.";
            yearInputHelp.classList.remove("hidden");
            yearInputModify.style.border = "1px solid var(--red-color)";
            yearInputModify.style.outline = "4px solid var(--error-outline-red-color)";
            isError = true;
        }
        
        if (turnoverInputModify.value === '' || isNaN(turnoverInputModify.value)) {
            turnoverInputModifyHelp.innerText = "Veuillez saisir un emplacement valide.";
            turnoverInputModifyHelp.classList.remove("hidden");
            turnoverInputModify.style.border = "1px solid var(--red-color)";
            turnoverInputModify.style.outline = "4px solid var(--error-outline-red-color)";
            isError = true;
        }
        
        if (workforceInputModify.value === '' || isNaN(workforceInputModify.value)) {
            workforceInputModifyHelp.innerText = "Veuillez saisir un emplacement valide.";
            workforceInputModifyHelp.classList.remove("hidden");
            workforceInputModify.style.border = "1px solid var(--red-color)";
            workforceInputModify.style.outline = "4px solid var(--error-outline-red-color)";
            isError = true;
        }
        
        if (surfaceInputModify.value === '' || isNaN(surfaceInputModify.value)) {
            surfaceInputModifyHelp.innerText = "Veuillez saisir un emplacement valide.";
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
            
            
            dataStorage[dataIndex].dataYear = newDataYear;
            dataStorage[dataIndex].dataTurnover = newDataTurnOver;
            dataStorage[dataIndex].dataWorkforce = newDataWorkForce;
            dataStorage[dataIndex].dataSurface = newDataSurface;
        
            localStorage.setItem("dataStorage", JSON.stringify(dataStorage));
        
            editDataModal.close();
        
            location.reload();
        }
        
        
        
    })



    const deleteButtons = document.querySelectorAll("#deleteButton");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            deleteDataModal.showModal();
        });
    });

    cancelDeleteButton.addEventListener("click", ()=> {
        deleteDataModal.close();
    })


    confirmDeleteButton.addEventListener("click" , () => {
        console.log(dataIndex);
        dataStorage.splice(dataIndex, 1);
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
    //renderData();
};

submitAddButton.addEventListener("click", function () {
    restoreDefault();
    let isError = false;

    if (yearInput.value === '' || isNaN(yearInput.value)) {
        yearInputHelp.innerText = "Veuillez saisir une emplacement valide.";
        yearInputHelp.classList.remove("hidden");
        yearInput.style.border = "1px solid var(--red-color)";
        yearInput.style.outline = "4px solid var(--error-outline-red-color)";
        isError = true;
    }
    
    if (turnoverInput.value === '' || isNaN(turnoverInput.value)) {
        turnoverInputHelp.innerText = "Veuillez saisir une emplacement valide.";
        turnoverInputHelp.classList.remove("hidden");
        turnoverInput.style.border = "1px solid var(--red-color)";
        turnoverInput.style.outline = "4px solid var(--error-outline-red-color)";
        isError = true;
    }
    
    if (workforceInput.value === '' || isNaN(workforceInput.value)) {
        workforceInputHelp.innerText = "Veuillez saisir une emplacement valide.";
        workforceInputHelp.classList.remove("hidden");
        workforceInput.style.border = "1px solid var(--red-color)";
        workforceInput.style.outline = "4px solid var(--error-outline-red-color)";
        isError = true;
    }
    
    if (surfaceInput.value === '' || isNaN(surfaceInput.value)) {
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