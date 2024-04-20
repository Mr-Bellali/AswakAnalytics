openingDateInput.onkeyup = function(evt) {
  if((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 && evt.keyCode <= 105)) {
    evt = evt || window.event;

    var size = openingDateInput.value.length;

    if ((size == 2 && openingDateInput.value > 31)|| (size == 5 && Number(openingDateInput.value.split('/')[1]) > 12) || (size == 10 && Number(openingDateInput.value.split('/')[2]) > 2024)) {
        openingDateInputHelp.innerText = "Veuillez saisir une date d'ouverture valide.";
        openingDateInputHelp.classList.remove("hidden");
        openingDateInput.style.border = "1px solid var(--red-color)";
        openingDateInput.style.outline = "4px solid var(--error-outline-red-color)";
        document.getElementById('openingDateInput').value = '';
        return;
    }

    if ((size == 2 && openingDateInput.value < 32) || (size == 5 && Number(openingDateInput.value.split('/')[1]) < 13)) {
      openingDateInputHelp.innerText = "";
      openingDateInputHelp.classList.add("hidden");
      openingDateInput.style.border = "1px var(--light-gray-color) solid";
      openingDateInput.style.outline = "none";
      document.getElementById('openingDateInput').value += '/';        
    }
  }
}