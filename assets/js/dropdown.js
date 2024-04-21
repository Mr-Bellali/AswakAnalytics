let customDropdowns = document.querySelectorAll('.custom-dropdown');

customDropdowns.forEach(function (select) {
    let selectedOption = select.querySelector('.selected-option');
    let dropdownOptions = select.querySelector('.dropdown-options');
    let options = dropdownOptions.querySelectorAll('div');
    let arrowIcon = select.querySelector('.arrow-icon');

    function toggleArrowRotation() {
        if (dropdownOptions.style.display === 'block') {
            arrowIcon.style.transform = 'translate(-50%, -50%) rotate(180deg)';
        } 
        
        else {
            arrowIcon.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        }
    }
  
    selectedOption.addEventListener('click', function () {
        if (dropdownOptions.children.length === 0) {
            return;
        }
        
        if (dropdownOptions.style.display === 'block') {
            dropdownOptions.style.display = 'none';
        } 
        
        else {
            dropdownOptions.style.display = 'block';
        }
        toggleArrowRotation();
    });
  
    dropdownOptions.addEventListener('click', function(e) {
        if (e.target.tagName === 'DIV') {
            selectedOption.textContent = e.target.textContent;
            dropdownOptions.style.display = 'none';
            selectedOption.appendChild(arrowIcon);
            toggleArrowRotation();
        }
    });
  
    window.addEventListener('click', function (e) {
        if (!select.contains(e.target)) {
            dropdownOptions.style.display = 'none';
            arrowIcon.style.transform = 'translate(-50%, -50%) rotate(0deg)';
            selectedOption.appendChild(arrowIcon);
        }
    });
});