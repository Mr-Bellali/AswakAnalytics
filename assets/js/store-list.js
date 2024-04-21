//
//
// general variables declaration
//
//
const horizontalLayoutButton = document.getElementById("horizontalLayoutButton");
const verticalLayoutButton = document.getElementById("verticalLayoutButton");
const horizontalLayoutButtonIcon = document.getElementById("horizontalLayoutButtonIcon");
const verticalLayoutButtonIcon = document.getElementById("verticalLayoutButtonIcon");

const storeLocationSelect = document.querySelector(".dropdown-options");
const dropdownOptions = document.querySelector(".dropdown-options");

const sortingElements = document.querySelector(".store-list-sorting-elements");

//
//
// generate store locations and inject them in dropdown menu
//
//

let storeLocations;

if (localStorage.getItem("storeStorage")) {
  const storeStorage = JSON.parse(localStorage.getItem("storeStorage"));
  storeLocations = storeStorage.map((store) => store.storeLocation);

  storeLocations = Array.from(new Set(storeLocations));
}

storeLocations.forEach((storeLocation) => {
  const div = document.createElement("div");
  div.textContent = storeLocation;
  storeLocationSelect.appendChild(div);
});

//
//
// render vertical cards on load
//
//

window.onload = () => {
  horizontalLayoutButton.classList.remove("selected-orientation-button");
  verticalLayoutButton.classList.add("selected-orientation-button");
  verticalLayoutButtonIcon.src = "./assets/img/white-vertical-sort-icon.svg";
  horizontalLayoutButtonIcon.src = "./assets/img/blue-horizontal-sort-icon.svg";

  let storeData = JSON.parse(localStorage.getItem("storeStorage"));
  let verticalLayout = `<div class="vertical-cards-list-container margin-top-42">`;

  storeData.forEach((store) => {
    verticalLayout += `
    <div class="vertical-card-container" data-store-id="${store.storeId}">
      <img class="vertical-card-image" src="./assets/img/vertical-card-image.png" alt="Aswak Assalam Logo Image">
      <div class="vertical-card-info-container">
        <p>${store.storeName}</p>
        <p>${store.storeLocation}</p>
      </div>
    </div>
    `;
  });

  verticalLayout += `</div>`;
  sortingElements.insertAdjacentHTML("afterend", verticalLayout);
};

//
//
// render cards on dropdown menu option change
//
//

dropdownOptions.addEventListener("click", (e) => {
  let selectedDropdownOption = e.target.textContent.trim();
  const stores = JSON.parse(localStorage.getItem("storeStorage")) || [];
  let filteredStores;

  if (selectedDropdownOption === "Tous") {
    if (document.querySelector(".vertical-cards-list-container")) {
      document.querySelector(".vertical-cards-list-container").remove();
    }
      
    if (document.querySelector(".horizontal-cards-list-container")) {
      document.querySelector(".horizontal-cards-list-container").remove();
    }
      
    if (document.getElementById("verticalLayoutButton").classList.contains("selected-orientation-button")) {
      let cardsLayout = `<div class="vertical-cards-list-container margin-top-42">`;
      stores.forEach((store) => {
        cardsLayout += `
        <div class="vertical-card-container" data-store-id="${store.storeId}">
          <img class="vertical-card-image" src="./assets/img/vertical-card-image.png" alt="Aswak Assalam Logo Image">
          <div class="vertical-card-info-container">
            <p>${store.storeName}</p>
            <p>${store.storeLocation}</p>
          </div>
        </div>
        `;
      });
      cardsLayout += `</div>`;
      sortingElements.insertAdjacentHTML("afterend", cardsLayout);
    }

    if (document.getElementById("horizontalLayoutButton").classList.contains("selected-orientation-button")) {
      let cardsLayout = `<div class="horizontal-cards-list-container margin-top-42">`;
      stores.forEach((store) => {
        cardsLayout += `
        <div class="horizontal-card-container" data-store-id="${store.storeId}">
          <img class="horizontal-card-image" src="./assets/img/horizontal-card-image.png" alt="Aswak Assalam Logo Image">
          <div class="horizontal-card-info-container">
            <p>${store.storeName}</p>
            <p>${store.storeLocation}</p>
          </div>
        </div>
        `;
      });
      cardsLayout += `</div>`;
      sortingElements.insertAdjacentHTML("afterend", cardsLayout);
    }
  }
  
  else {
    filteredStores = stores.filter((store) => store.storeLocation === selectedDropdownOption);

    if (document.querySelector(".vertical-cards-list-container")) {
      document.querySelector(".vertical-cards-list-container").remove();
    }
      
    if (document.querySelector(".horizontal-cards-list-container")) {
      document.querySelector(".horizontal-cards-list-container").remove();
    }
      
    if (document.getElementById("verticalLayoutButton").classList.contains("selected-orientation-button")) {
      let cardsLayout = `<div class="vertical-cards-list-container margin-top-42">`;
      filteredStores.forEach((store) => {
        cardsLayout += `
        <div class="vertical-card-container" data-store-id="${store.storeId}">
          <img class="vertical-card-image" src="./assets/img/vertical-card-image.png" alt="Aswak Assalam Logo Image">
          <div class="vertical-card-info-container">
            <p>${store.storeName}</p>
            <p>${store.storeLocation}</p>
          </div>
        </div>
        `;
      });
      cardsLayout += `</div>`;
      sortingElements.insertAdjacentHTML("afterend", cardsLayout);
    }

    if (document.getElementById("horizontalLayoutButton").classList.contains("selected-orientation-button")) {
      let cardsLayout = `<div class="horizontal-cards-list-container margin-top-42">`;
      filteredStores.forEach((store) => {
        cardsLayout += `
        <div class="horizontal-card-container" data-store-id="${store.storeId}">
          <img class="horizontal-card-image" src="./assets/img/horizontal-card-image.png" alt="Aswak Assalam Logo Image">
          <div class="horizontal-card-info-container">
            <p>${store.storeName}</p>
            <p>${store.storeLocation}</p>
          </div>
        </div>
        `;
      });
      cardsLayout += `</div>`;
      sortingElements.insertAdjacentHTML("afterend", cardsLayout);
    }
  }
});

horizontalLayoutButton.addEventListener("click", () => {
  let selectedDropdownOption = document.getElementById("locationSelect").textContent.trim();
  const stores = JSON.parse(localStorage.getItem("storeStorage")) || [];
  let filteredStores;

  horizontalLayoutButton.classList.add("selected-orientation-button");
  verticalLayoutButton.classList.remove("selected-orientation-button");
  verticalLayoutButtonIcon.src = "./assets/img/blue-vertical-sort-icon.svg";
  horizontalLayoutButtonIcon.src = "./assets/img/white-horizontal-sort-icon.svg";

  if (selectedDropdownOption === "Tous" || selectedDropdownOption === "Emplacement") {
    if (document.querySelector(".vertical-cards-list-container")) {
      document.querySelector(".vertical-cards-list-container").remove();
    }
      
    if (document.querySelector(".horizontal-cards-list-container")) {
      document.querySelector(".horizontal-cards-list-container").remove();
    }
      
    let cardsLayout = `<div class="horizontal-cards-list-container margin-top-42">`;
    stores.forEach((store) => {
      cardsLayout += `
      <div class="horizontal-card-container" data-store-id="${store.storeId}">
        <img class="horizontal-card-image" src="./assets/img/horizontal-card-image.png" alt="Aswak Assalam Logo Image">
        <div class="horizontal-card-info-container">
          <p>${store.storeName}</p>
          <p>${store.storeLocation}</p>
        </div>
      </div>
      `;
    });
    cardsLayout += `</div>`;
    sortingElements.insertAdjacentHTML("afterend", cardsLayout);
  }

  else {
    if (document.querySelector(".vertical-cards-list-container")) {
      document.querySelector(".vertical-cards-list-container").remove();
    }
      
    if (document.querySelector(".horizontal-cards-list-container")) {
      document.querySelector(".horizontal-cards-list-container").remove();
    }

    filteredStores = stores.filter((store) => store.storeLocation === selectedDropdownOption);
    let cardsLayout = `<div class="horizontal-cards-list-container margin-top-42">`;
    filteredStores.forEach((store) => {
      cardsLayout += `
      <div class="horizontal-card-container" data-store-id="${store.storeId}">
        <img class="horizontal-card-image" src="./assets/img/horizontal-card-image.png" alt="Aswak Assalam Logo Image">
        <div class="horizontal-card-info-container">
          <p>${store.storeName}</p>
          <p>${store.storeLocation}</p>
        </div>
      </div>
      `;
    });
    cardsLayout += `</div>`;
    sortingElements.insertAdjacentHTML("afterend", cardsLayout);
  }
});

verticalLayoutButton.addEventListener("click", () => {
  let selectedDropdownOption = document.getElementById("locationSelect").textContent.trim();
  const stores = JSON.parse(localStorage.getItem("storeStorage")) || [];
  let filteredStores;

  horizontalLayoutButton.classList.remove("selected-orientation-button");
  verticalLayoutButton.classList.add("selected-orientation-button");
  verticalLayoutButtonIcon.src = "./assets/img/white-vertical-sort-icon.svg";
  horizontalLayoutButtonIcon.src = "./assets/img/blue-horizontal-sort-icon.svg";

  if (selectedDropdownOption === "Tous" || selectedDropdownOption === "Emplacement") {
    if (document.querySelector(".vertical-cards-list-container")) {
      document.querySelector(".vertical-cards-list-container").remove();
    }
      
    if (document.querySelector(".horizontal-cards-list-container")) {
      document.querySelector(".horizontal-cards-list-container").remove();
    }
      
    let cardsLayout = `<div class="vertical-cards-list-container margin-top-42">`;
    stores.forEach((store) => {
      cardsLayout += `
      <div class="vertical-card-container" data-store-id="${store.storeId}">
        <img class="vertical-card-image" src="./assets/img/vertical-card-image.png" alt="Aswak Assalam Logo Image">
        <div class="vertical-card-info-container">
          <p>${store.storeName}</p>
          <p>${store.storeLocation}</p>
        </div>
      </div>
      `;
    });
    cardsLayout += `</div>`;
    sortingElements.insertAdjacentHTML("afterend", cardsLayout);
  }

  else {
    if (document.querySelector(".vertical-cards-list-container")) {
      document.querySelector(".vertical-cards-list-container").remove();
    }
      
    if (document.querySelector(".horizontal-cards-list-container")) {
      document.querySelector(".horizontal-cards-list-container").remove();
    }

    filteredStores = stores.filter((store) => store.storeLocation === selectedDropdownOption);
    let cardsLayout = `<div class="vertical-cards-list-container margin-top-42">`;
    filteredStores.forEach((store) => {
      cardsLayout += `
      <div class="vertical-card-container" data-store-id="${store.storeId}">
        <img class="vertical-card-image" src="./assets/img/vertical-card-image.png" alt="Aswak Assalam Logo Image">
        <div class="vertical-card-info-container">
          <p>${store.storeName}</p>
          <p>${store.storeLocation}</p>
        </div>
      </div>
      `;
    });
    cardsLayout += `</div>`;
    sortingElements.insertAdjacentHTML("afterend", cardsLayout);
  }
});

// Define store variable
let store = null;

document.addEventListener("click", (e) => {
  let targetElement = e.target; // Clicked element
  let cardContainer = null;
 
  // Traverse up the DOM tree to find the card container
  while (targetElement) {
      if (targetElement.classList.contains("vertical-card-container") || targetElement.classList.contains("horizontal-card-container")) {
        cardContainer = targetElement;
        break;
      }
      targetElement = targetElement.parentElement;
  }
 
  // If a card container was found, proceed with your logic
  if (cardContainer) {
    const storeId = cardContainer.dataset.storeId;
    console.log("Store ID:", storeId);
    let stores = JSON.parse(localStorage.getItem("storeStorage"));

    for (let i = 0; i < stores.length; i++) {
      if (stores[i].storeId == storeId) {
        temporaryStoreId = i;
        console.log("Index:", temporaryStoreId);
        break;
      }
    }

    try {
      localStorage.setItem("temporaryStoreId", temporaryStoreId);
      console.log("temporaryStoreId set to:", temporaryStoreId);
      window.location.href = "store-page.html";
    }
    
    catch (error) {
      console.error("Error setting temporaryStoreId:", error);
    }
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