//filling store location dropdown menu
let storeLocations = [];

if (localStorage.getItem("storeStorage")) {
  const storeStorage = JSON.parse(localStorage.getItem("storeStorage"));
  storeLocations = storeStorage.map((store) => store.storeLocation);
  // Remove duplicates
  storeLocations = Array.from(new Set(storeLocations));
}

const storeLocationSelect = document.querySelector(".dropdown-options");

storeLocations.forEach((storeLocation) => {
  const div = document.createElement("div");
  div.textContent = storeLocation;
  storeLocationSelect.appendChild(div);
});

//filter
const dropdownOptions = document.querySelector(".dropdown-options");

dropdownOptions.addEventListener("click", (e) => {
  const selectedOption = e.target.textContent.trim();
  let dropdownValue = selectedOption;

  const stores = JSON.parse(localStorage.getItem("storeStorage")) || [];

  let filteredStores;

  if (dropdownValue === "All") {
    filteredStores = stores;
  } else {
    filteredStores = stores.filter(
      (store) => store.storeLocation === dropdownValue
    );
  }

  console.log(filteredStores);

  const verticalLayouts = document.querySelectorAll(
    ".vertical-cards-list-container"
  );
  verticalLayouts.forEach((layout) => layout.remove());
  const horizontalLayouts = document.querySelectorAll(
    ".horizontal-cards-list-container"
  );
  horizontalLayouts.forEach((layout) => layout.remove());

  let verticalLayout = `<div class="vertical-cards-list-container margin-top-20">`;
  filteredStores.forEach((store, index) => {
    verticalLayout += `
    <div class="vertical-card-container" data-index="${index}">
      <div class="vertical-card-image-container">

      </div>
      <div class="vertical-card-info-container">
        <p>${store.storeName}</p>
        <p>${store.storeLocation}</p>
      </div>
    </div>
    `;
  });
  verticalLayout += `</div>`;
  sortingElements.insertAdjacentHTML("afterend", verticalLayout);
});

//rendering cards
window.onload = () => {
  const verticalLayouts = document.querySelectorAll(
    ".vertical-cards-list-container"
  );
  verticalLayouts.forEach((layout) => layout.remove());
  const horizontalLayouts = document.querySelectorAll(
    ".horizontal-cards-list-container"
  );
  horizontalLayouts.forEach((layout) => layout.remove());

  horizontalLayoutButton.classList.remove("selected-orientation-button");
  verticalLayoutButton.classList.add("selected-orientation-button");
  verticalLayoutButtonIcon.src = "./assets/img/white-vertical-sort-icon.svg";
  horizontalLayoutButtonIcon.src = "./assets/img/blue-horizontal-sort-icon.svg";

  let storeData = JSON.parse(localStorage.getItem("storeStorage"));
  let verticalLayout = `<div class="vertical-cards-list-container margin-top-20">`;

  storeData.forEach((store, index) => {
    verticalLayout += `
        <div class="vertical-card-container" data-index="${index}">
          <div class="vertical-card-image-container">

          </div>
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

const horizontalLayoutButton = document.getElementById(
  "horizontalLayoutButton"
);
const verticalLayoutButton = document.getElementById("verticalLayoutButton");
const horizontalLayoutButtonIcon = document.getElementById(
  "horizontalLayoutButtonIcon"
);
const verticalLayoutButtonIcon = document.getElementById(
  "verticalLayoutButtonIcon"
);

const sortingElements = document.querySelector(".sorting-elements");

horizontalLayoutButton.addEventListener("click", () => {
  const horizontalLayouts = document.querySelectorAll(
    ".horizontal-cards-list-container"
  );
  horizontalLayouts.forEach((layout) => layout.remove());
  const verticalLayouts = document.querySelectorAll(
    ".vertical-cards-list-container"
  );
  verticalLayouts.forEach((layout) => layout.remove());

  verticalLayoutButton.classList.remove("selected-orientation-button");
  horizontalLayoutButton.classList.add("selected-orientation-button");
  verticalLayoutButtonIcon.src = "./assets/img/blue-vertical-sort-icon.svg";
  horizontalLayoutButtonIcon.src =
    "./assets/img/white-horizontal-sort-icon.svg";

  let storeData = JSON.parse(localStorage.getItem("storeStorage"));
  let horizontalLayout = `<div class="horizontal-cards-list-container margin-top-20">`;

  storeData.forEach((store, index) => {
    horizontalLayout += `
        <div class="horizontal-card-container" data-index="${index}">
          <div class="horizontal-card-image-container">

          </div>
          <div class="horizontal-card-info-container">
            <p>${store.storeName}</p>
            <p>${store.storeLocation}</p>
          </div>
        </div>
        `;
  });

  horizontalLayout += `</div>`;

  sortingElements.insertAdjacentHTML("afterend", horizontalLayout);
});

verticalLayoutButton.addEventListener("click", () => {
  const verticalLayouts = document.querySelectorAll(
    ".vertical-cards-list-container"
  );
  verticalLayouts.forEach((layout) => layout.remove());
  const horizontalLayouts = document.querySelectorAll(
    ".horizontal-cards-list-container"
  );
  horizontalLayouts.forEach((layout) => layout.remove());

  horizontalLayoutButton.classList.remove("selected-orientation-button");
  verticalLayoutButton.classList.add("selected-orientation-button");
  verticalLayoutButtonIcon.src = "./assets/img/white-vertical-sort-icon.svg";
  horizontalLayoutButtonIcon.src = "./assets/img/blue-horizontal-sort-icon.svg";

  let storeData = JSON.parse(localStorage.getItem("storeStorage"));
  let horizontalLayout = `<div class="vertical-cards-list-container margin-top-20">`;

  storeData.forEach((store, index) => {
    horizontalLayout += `
        <div class="vertical-card-container" data-index="${index}">
          <div class="vertical-card-image-container">

          </div>
          <div class="vertical-card-info-container">
            <p>${store.storeName}</p>
            <p>${store.storeLocation}</p>
          </div>
        </div>
        `;
  });

  horizontalLayout += `</div>`;

  sortingElements.insertAdjacentHTML("afterend", horizontalLayout);
});

// Define store variable
let store = null;

// evenlistener for card clicks
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("vertical-card-container") || e.target.classList.contains("horizontal-card-container")) {
    const dataIndex = e.target.dataset.index;
    console.log("Index of clicked card:", dataIndex);
    // Do whatever you want with the index here
    let stores = JSON.parse(localStorage.getItem("storeStorage"));

    let store = null;

    for (let i = 0; i < stores.length; i++) {
      if (stores[i].storeId == dataIndex) {
        store = stores[i];
        break;
      }
    }
    console.log(store);
  }
});

// Exporting store variable
// export default { store };