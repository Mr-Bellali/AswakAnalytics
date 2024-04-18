// Get all custom select elements
let customDropdowns = document.querySelectorAll('.custom-dropdown');

// Attach click event listeners to each custom select
customDropdowns.forEach(function (select) {
    let selectedOption = select.querySelector('.selected-option');
    let dropdownOptions = select.querySelector('.dropdown-options');
    let options = dropdownOptions.querySelectorAll('div');
    let arrowIcon = select.querySelector('.arrow-icon');
  
    // Function to set the text color of selected-option
    function setTextColor() {
        if (selectedOption.textContent.trim() === 'Emplacement') {
            selectedOption.style.color = 'var(--light-gray-color)';
        } else {
            selectedOption.style.color = 'var(--black-color)'; // Reset to default color
        }
    }
  
    // Function to toggle the arrow rotation
    function toggleArrowRotation() {
        if (dropdownOptions.style.display === 'block') {
            arrowIcon.style.transform = 'translate(-50%, -50%) rotate(180deg)';
        } else {
            arrowIcon.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        }
    }
  
    // Toggle the dropdown visibility and arrow rotation when the select box is clicked
    selectedOption.addEventListener('click', function () {
        if (dropdownOptions.children.length === 0) {
            return; // Don't show if no options available
        }
        if (dropdownOptions.style.display === 'block') {
            dropdownOptions.style.display = 'none';
        } else {
            dropdownOptions.style.display = 'block';
        }
        toggleArrowRotation(); // Toggle arrow rotation
    });
  
    // Set the selected option, hide the dropdown, reset arrow rotation, and append arrow back when an option is clicked
    dropdownOptions.addEventListener('click', function(e) {
        // Check if the clicked element is an option
        if (e.target.tagName === 'DIV') {
            selectedOption.textContent = e.target.textContent;
            dropdownOptions.style.display = 'none';
            selectedOption.appendChild(arrowIcon); // Append arrow back
            toggleArrowRotation(); // Reset arrow rotation
            setTextColor(); // Reset text color
        }
    });
  
    // Close the dropdown, reset arrow rotation, and append arrow back if the user clicks outside of it
    window.addEventListener('click', function (e) {
        if (!select.contains(e.target)) {
            dropdownOptions.style.display = 'none';
            arrowIcon.style.transform = 'translate(-50%, -50%) rotate(0deg)'; // Reset arrow rotation
            selectedOption.appendChild(arrowIcon); // Append arrow back
        }
    });

    // Set initial text color
    setTextColor();
});