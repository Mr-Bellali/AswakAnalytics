const horizontalLayoutButton = document.getElementById("horizontalLayoutButton");
const verticalLayoutButton = document.getElementById("verticalLayoutButton");
const horizontalLayoutButtonIcon = document.getElementById("horizontalLayoutButtonIcon");
const verticalLayoutButtonIcon = document.getElementById("verticalLayoutButtonIcon");

const sortingElements = document.querySelector(".sorting-elements");

horizontalLayoutButton.addEventListener("click", () => {
    verticalLayoutButton.classList.remove("selected-orientation-button");
    horizontalLayoutButton.classList.add("selected-orientation-button");
    verticalLayoutButtonIcon.src="./assets/img/blue-vertical-sort-icon.svg";
    horizontalLayoutButtonIcon.src="./assets/img/white-horizontal-sort-icon.svg";

    let storeData = JSON.parse(localStorage.getItem("storeStorage"));
    let horizontalLayout = `<div class="horizontal-cards-list-container margin-top-20">`

    storeData.forEach((store) => {
        horizontalLayout += `
        <div class="horizontal-card-container" id="${store.storeId}">
          <div class="horizontal-card-image-container">

          </div>
          <div class="horizontal-card-info-container">
            <p>${store.storeName}</p>
            <p>${store.storeLocation}</p>
          </div>
        </div>
        `
    });

    horizontalLayout += `</div>`;
    
    sortingElements.insertAdjacentHTML("afterend", horizontalLayout);
});

verticalLayoutButton.addEventListener("click", () => {
    horizontalLayoutButton.classList.remove("selected-orientation-button");
    verticalLayoutButton.classList.add("selected-orientation-button");
    verticalLayoutButtonIcon.src="./assets/img/white-vertical-sort-icon.svg";
    horizontalLayoutButtonIcon.src="./assets/img/blue-horizontal-sort-icon.svg";
});