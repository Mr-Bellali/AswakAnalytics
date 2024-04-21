const turnoverTabButton = document.getElementById("turnoverTabButton");
const workforceTabButton = document.getElementById("workforceTabButton");
const surfaceTabButton = document.getElementById("surfaceTabButton");
const deviationCoefficient = document.getElementById("deviationCoefficient");
const coefficientVal = document.getElementById("coefficientVal");
const yearSelect = document.getElementById("yearSelect");

const averageValueHint = document.getElementById("averageValueHint");
const modeValueHint = document.getElementById("modeValueHint");
const medianValueHint = document.getElementById("medianValueHint");
const deviationCoefficientHint = document.getElementById("deviationCoefficientHint");

const averageValue = document.getElementById('averageValue');
const modeValue = document.getElementById('modeValue');
const medianValue = document.getElementById('medianValue');

const dataStorage = JSON.parse(localStorage.getItem("dataStorage"));

let turnoverData = dataStorage.map((data) => data.dataTurnover);
let workforceData = dataStorage.map((data) => data.dataWorkforce);
let surfaceData = dataStorage.map((data) => data.dataSurface);

let dates = dataStorage.map((data) => data.dataYear);

const uniqueYears =  Array.from(new Set(dates)).sort((a, b) => b - a);

const dateSelect = document.querySelector(".dropdown-options");
const selectedOption = document.querySelector(".selected-option");

uniqueYears.forEach((year) => {
  const option = document.createElement("div");
  option.textContent = year;
  option.value = year;
  dateSelect.appendChild(option);
});

const calculateAverage = (dataArray) => {
  let turnoverTotal = 0;
  let counter = 0;
  let turnoverAverage = 0;

  dataArray.forEach(item => {
    turnoverTotal += parseInt(item);
    counter++;
  });
  turnoverAverage = turnoverTotal / counter;
  return turnoverAverage;
}

const calculateMode = (dataArray) => {
  let frequency = {};
  let maxFreq = 0;
  let mode = null;
 
  for (var i = 0; i < dataArray.length; i++) {
     var num = parseInt(dataArray[i], 10);
     frequency[num] = (frequency[num] || 0) + 1;
     if (frequency[num] > maxFreq) {
       maxFreq = frequency[num];
     }
  }
 
  for (var key in frequency) {
     if (frequency[key] === maxFreq) {
       mode = Number(key);
       break;
     }
  }
 
  return mode;
}

const calculateMedian = (dataArray) => {
  const intArray = dataArray.map(Number);
  intArray.sort((a, b) => a - b);
  const middle = Math.floor(intArray.length / 2);
 
  if (intArray.length % 2 === 0) {
     return (intArray[middle - 1] + intArray[middle]) / 2;
  }
  
  else {
     return intArray[middle];
  }
}

const calculateDeviation = (dataArray) => {
    const numbers = dataArray.map(Number);
    const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
    const sumOfSquaredDifferences = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    const standardDeviation = Math.sqrt(sumOfSquaredDifferences / (numbers.length - 1));
    const standardDeviationPercentage = (standardDeviation / mean) * 100;
    return standardDeviationPercentage;
}

const formatNumberWithSpaces = (number) => {
  return number.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}

window.onload = () => {
  turnoverTabButton.classList.add("active-dashboard-navigation-button");
  selectedOption.textContent = uniqueYears[0];

  let turnoverByYear = [];
  for (let i = 0; i < dataStorage.length; i++) {
    if (parseInt(dataStorage[i].dataYear) === parseInt(uniqueYears[0])) {
      turnoverByYear.push(dataStorage[i].dataTurnover);
    }
  }

  averageValue.innerText = formatNumberWithSpaces(calculateAverage(turnoverByYear)) + " DH";
  averageValueHint.innerText = `Le chiffre d'affaires moyen de tous les magasins.`

  modeValue.innerText = calculateMode(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH";
  modeValueHint.innerText = `Le chiffre d'affaires réalisé par le plus grand nombre de magasins est ${calculateMode(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH"}.`;

  medianValue.innerText = calculateMedian(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH";
  medianValueHint.innerText = `50% des magasins réalisent un chiffre d'affaires inférieur à ${calculateMedian(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH"} et, par conséquent, 50% d'entre eux réalisent un chiffre d'affaire supérieur à ce résultat.`;

  deviationCoefficient.innerText = calculateDeviation(turnoverByYear).toFixed(2) + "%";
  deviationCoefficientHint.innerText = `L'écart-type montre que les chiffres d'affaires des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(turnoverByYear)) + " DH"}, et le coefficient de variation est de ${((calculateDeviation(turnoverByYear) * 100) / calculateAverage(turnoverByYear)).toFixed(4)}.`;

  yearSelect.innerHTML = `${uniqueYears[0]}
  <img class="arrow-icon" src="./assets/img/dropdown-icon.svg">`;
  updateTurnoversChart(uniqueYears[0]);
}

turnoverTabButton.addEventListener("click", () => {
  if (workforceTabButton.classList.contains("active-dashboard-navigation-button")) {
    workforceTabButton.classList.remove("active-dashboard-navigation-button");
  }

  if (surfaceTabButton.classList.contains("active-dashboard-navigation-button")) {
    surfaceTabButton.classList.remove("active-dashboard-navigation-button");
  }

  turnoverTabButton.classList.add("active-dashboard-navigation-button");

  selectedYear = selectedOption.textContent.trim();
  let turnoverByYear = [];
  for (let i = 0; i < dataStorage.length; i++) {
    if (parseInt(dataStorage[i].dataYear) === parseInt(selectedYear)) {
      turnoverByYear.push(dataStorage[i].dataTurnover);
    }
  }

  averageValue.innerText = formatNumberWithSpaces(calculateAverage(turnoverByYear)) + " DH";
  averageValueHint.innerText = `Le chiffre d'affaires moyen de tous les magasins.`

  modeValue.innerText = calculateMode(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH";
  modeValueHint.innerText = `Le chiffre d'affaires réalisé par le plus grand nombre de magasins est ${calculateMode(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH"}.`;

  medianValue.innerText = calculateMedian(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH";
  medianValueHint.innerText = `50% des magasins réalisent un chiffre d'affaires inférieur à ${calculateMedian(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH"} et, par conséquent, 50% d'entre eux réalisent un chiffre d'affaire supérieur à ce résultat.`;

  deviationCoefficient.innerText = calculateDeviation(turnoverByYear).toFixed(2) + "%";
  deviationCoefficientHint.innerText = `L'écart-type montre que les chiffres d'affaires des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(turnoverByYear)) + " DH"}, et le coefficient de variation est de ${((calculateDeviation(turnoverByYear) * 100) / calculateAverage(turnoverByYear)).toFixed(4)}.`;
  updateTurnoversChart(selectedOption);
});

workforceTabButton.addEventListener("click", () => {
  if (turnoverTabButton.classList.contains("active-dashboard-navigation-button")) {
    turnoverTabButton.classList.remove("active-dashboard-navigation-button");
  }

  if (surfaceTabButton.classList.contains("active-dashboard-navigation-button")) {
    surfaceTabButton.classList.remove("active-dashboard-navigation-button");
  }

  workforceTabButton.classList.add("active-dashboard-navigation-button");

  selectedYear = selectedOption.textContent.trim();
  let workforceByYear = [];
  for (let i = 0; i < dataStorage.length; i++) {
    if (parseInt(dataStorage[i].dataYear) === parseInt(selectedYear)) {
      workforceByYear.push(dataStorage[i].dataWorkforce);
    }
  }

  averageValue.innerHTML = formatNumberWithSpaces(calculateAverage(workforceByYear));
  averageValueHint.innerText = `L'effectif moyen de tous les magasins.`

  modeValue.innerText = calculateMode(workforceByYear);
  modeValueHint.innerText = `L'effectif attends par le plus grand nombre de magasins est ${calculateMode(workforceByYear)}.`;

  medianValue.innerText = calculateMedian(workforceByYear);
  medianValueHint.innerText = `50% des magasins ayant un effectif inférieur à ${calculateMedian(workforceByYear)} et, par conséquent, 50% d'entre eux ayant un effectif supérieur à ce résultat.`;

  deviationCoefficient.innerText = calculateDeviation(workforceByYear).toFixed(2) + "%";
  deviationCoefficientHint.innerText = `L'écart-type montre que l'effectif des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(workforceByYear))}, et le coefficient de variation est de ${((calculateDeviation(workforceByYear) * 100) / calculateAverage(workforceByYear)).toFixed(4)}.`;
  updateWorkforcesChart(selectedOption);
});

surfaceTabButton.addEventListener("click", () => {
  if (turnoverTabButton.classList.contains("active-dashboard-navigation-button")) {
    turnoverTabButton.classList.remove("active-dashboard-navigation-button");
  }

  if (workforceTabButton.classList.contains("active-dashboard-navigation-button")) {
    workforceTabButton.classList.remove("active-dashboard-navigation-button");
  }

  surfaceTabButton.classList.add("active-dashboard-navigation-button");

  selectedYear = selectedOption.textContent.trim();
  let surfaceByYear = [];
  for (let i = 0; i < dataStorage.length; i++) {
    if (parseInt(dataStorage[i].dataYear) === parseInt(selectedYear)) {
      surfaceByYear.push(dataStorage[i].dataSurface);
    }
  }

  averageValue.innerHTML = formatNumberWithSpaces(calculateAverage(surfaceByYear)) + " m²";
  averageValueHint.innerText = `Surface moyen de tous les magasins.`

  modeValue.innerText = parseInt(calculateMode(surfaceByYear))  + " m²";
  modeValueHint.innerText = `Surface attends par le plus grand nombre de magasins est ${parseInt(calculateMode(surfaceByYear))  + " m²"}.`;

  medianValue.innerText = calculateMedian(surfaceByYear) + " m²";
  medianValueHint.innerText = `50% des magasins ayant un surface inférieur à ${calculateMedian(surfaceByYear) + " m²"} et, par conséquent, 50% d'entre eux ayant un surface supérieur à ce résultat.`;

  deviationCoefficient.innerText = calculateDeviation(surfaceByYear).toFixed(2) + "%";
  deviationCoefficientHint.innerText = `L'écart-type montre que surface des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(surfaceByYear)) + " m²"}, et le coefficient de variation est de ${((calculateDeviation(surfaceByYear) * 100) / calculateAverage(surfaceByYear)).toFixed(4)}.`;
  updateWorkforcesChart(selectedOption);
});

dateSelect.addEventListener("click", (e) => {
  if (e.target.tagName === "DIV") {
    let selectedYear = parseInt(e.target.textContent);

    if (turnoverTabButton.classList.contains("active-dashboard-navigation-button")) {
      let turnoverByYear = [];
      for (let i = 0; i < dataStorage.length; i++) {
        if (parseInt(dataStorage[i].dataYear) === selectedYear) {
          turnoverByYear.push(dataStorage[i].dataTurnover);
        }
      }

      averageValue.innerText = formatNumberWithSpaces(calculateAverage(turnoverByYear)) + " DH";
      averageValueHint.innerText = `Le chiffre d'affaires moyen de tous les magasins.`

      modeValue.innerText = calculateMode(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH";
      modeValueHint.innerText = `Le chiffre d'affaires réalisé par le plus grand nombre de magasins est ${calculateMode(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH"}.`;

      medianValue.innerText = calculateMedian(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH";
      medianValueHint.innerText = `50% des magasins réalisent un chiffre d'affaires inférieur à ${calculateMedian(turnoverByYear).toLocaleString().replace(/\./g, " ") + " DH"} et, par conséquent, 50% d'entre eux réalisent un chiffre d'affaire supérieur à ce résultat.`;

      deviationCoefficient.innerText = calculateDeviation(turnoverByYear).toFixed(2) + "%";
      deviationCoefficientHint.innerText = `L'écart-type montre que les chiffres d'affaires des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(turnoverByYear)) + " DH"}, et le coefficient de variation est de ${((calculateDeviation(turnoverByYear) * 100) / calculateAverage(turnoverByYear)).toFixed(4)}.`;
      updateTurnoversChart(selectedYear);
    }

    if (workforceTabButton.classList.contains("active-dashboard-navigation-button")) {
      let workforceByYear = [];
      for (let i = 0; i < dataStorage.length; i++) {
        if (parseInt(dataStorage[i].dataYear) === selectedYear) {
          workforceByYear.push(dataStorage[i].dataWorkforce);
        }
      }

      averageValue.innerHTML = formatNumberWithSpaces(calculateAverage(workforceByYear));
      averageValueHint.innerText = `L'effectif moyen de tous les magasins.`

      modeValue.innerText = calculateMode(workforceByYear);
      modeValueHint.innerText = `L'effectif attends par le plus grand nombre de magasins est ${calculateMode(workforceByYear)}.`;

      medianValue.innerText = calculateMedian(workforceByYear);
      medianValueHint.innerText = `50% des magasins ayant un effectif inférieur à ${calculateMedian(workforceByYear)} et, par conséquent, 50% d'entre eux ayant un effectif supérieur à ce résultat.`;

      deviationCoefficient.innerText = calculateDeviation(workforceByYear).toFixed(2) + "%";
      deviationCoefficientHint.innerText = `L'écart-type montre que l'effectif des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(workforceByYear))}, et le coefficient de variation est de ${((calculateDeviation(workforceByYear) * 100) / calculateAverage(workforceByYear)).toFixed(4)}.`;
      updateWorkforcesChart(selectedYear);
    }

    if (surfaceTabButton.classList.contains("active-dashboard-navigation-button")) {
      let surfaceByYear = [];
      for (let i = 0; i < dataStorage.length; i++) {
        if (parseInt(dataStorage[i].dataYear) === selectedYear) {
          surfaceByYear.push(dataStorage[i].dataSurface);
        }
      }

      averageValue.innerHTML = formatNumberWithSpaces(calculateAverage(surfaceByYear)) + " m²";
      averageValueHint.innerText = `Surface moyen de tous les magasins.`

      modeValue.innerText = parseInt(calculateMode(surfaceByYear))  + " m²";
      modeValueHint.innerText = `Surface attends par le plus grand nombre de magasins est ${parseInt(calculateMode(surfaceByYear))  + " m²"}.`;

      medianValue.innerText = calculateMedian(surfaceByYear) + " m²";
      medianValueHint.innerText = `50% des magasins ayant un surface inférieur à ${calculateMedian(surfaceByYear) + " m²"} et, par conséquent, 50% d'entre eux ayant un surface supérieur à ce résultat.`;

      deviationCoefficient.innerText = calculateDeviation(surfaceByYear).toFixed(2) + "%";
      deviationCoefficientHint.innerText = `L'écart-type montre que surface des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(surfaceByYear)) + " m²"}, et le coefficient de variation est de ${((calculateDeviation(surfaceByYear) * 100) / calculateAverage(surfaceByYear)).toFixed(4)}.`;
      updateSurfacesChart(selectedYear);
    }
  }
});

let turnoversDataChart;
let workforcesDataChart;
let surfacesDataChart;

let avgDataChart;
let recursiveDataChart;
let plageDataChart = [];
let fruequenceDataChart = [];

const filteredData = (year, dataKey) => {
    return dataStorage.filter(data => data.dataYear.split("/")[2] === year).map(data => data[dataKey]);
}

const updateTurnoversChart = (year) => {
    updateChart(year, 'dataTurnover');
}

const updateWorkforcesChart = (year) => {
    updateChart(year, 'dataWorkforce');
}

const updateSurfacesChart = (year) => {
    updateChart(year, 'dataSurface');
}

const updateChart = (year, dataKey) => {
    // Destroy existing chart if it exists
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    const filteredDataChart = filteredData(year, dataKey);

    const maxData = Math.max(...filteredDataChart);
    const minData = Math.min(...filteredDataChart);

    avgDataChart = maxData - minData;

    // Calculate the recursive interval
    recursiveDataChart = avgDataChart / 5;

    // Generate plageDataChart
    if (filteredDataChart.length <= 1) {
        // If there is only one value, create a single interval
        plageDataChart = [[minData, maxData]];
    } else {
        // Otherwise, split the values into intervals
        plageDataChart = [];
        for (let i = minData; i < maxData; i += recursiveDataChart) {
            plageDataChart.push([i, Math.min(i + recursiveDataChart, maxData)]);
        }
        // Push the maximum value to ensure it's included
        plageDataChart.push([maxData, maxData]);
    }
    
    // Calculate frequency for each plage
    fruequenceDataChart = plageDataChart.map(range => {
        const [start, end] = range;
        // Count the frequency within each plage
        return filteredDataChart.filter(value => value >= start && value <= end).length;
    });

    // Create the bar chart
    const ctx = document.getElementById('data-chart').getContext('2d');
    Chart.defaults.font.family = "'Nunito Sans', sans-serif";

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: plageDataChart.map(range => `${range[0]} - ${range[1]}`), // Use plages as labels
            datasets: [{
                label: 'Frequency',
                data: fruequenceDataChart, // Use frequency data
                borderWidth: 1,
                backgroundColor: 'rgba(0, 59, 137, 0.5)',
                borderColor: 'rgba(16, 16, 16, 0.6)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        display: true,
                    },
                    grid: {
                        drawTicks: false,
                    },
                    border: {
                        display: false,
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


dateSelect.addEventListener('change', () => {
    updateTurnoversChart(selectedOption.innerText.trim());
});

turnoverTabButton.addEventListener('click', () => {
    const selectedYear = selectedOption.textContent;
    updateTurnoversChart(selectedYear);
    
});

workforceTabButton.addEventListener('click', () => {
    const selectedYear = selectedOption.textContent;
    updateWorkforcesChart(selectedYear);
});

surfaceTabButton.addEventListener('click', () => {
    const selectedYear = selectedOption.textContent;
    updateSurfacesChart(selectedYear);
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