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
let years = dates.map((date) => {
    return date.split("/")[2];
})



const uniqueYears =  Array.from(new Set(dates.map(dateString => dateString.split("/")[2]))).sort((a, b) => b - a);

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

  averageValue.innerText = formatNumberWithSpaces(calculateAverage(turnoverData)) + " DH";
  averageValueHint.innerText = `Le chiffre d'affaires moyen de tous les magasins.`

  modeValue.innerText = calculateMode(turnoverData).toLocaleString().replace(/\./g, " ") + " DH";
  modeValueHint.innerText = `Le chiffre d'affaires réalisé par le plus grand nombre de magasins est ${calculateMode(turnoverData).toLocaleString().replace(/\./g, " ") + " DH"}.`;

  medianValue.innerText = calculateMedian(turnoverData).toLocaleString().replace(/\./g, " ") + " DH";
  medianValueHint.innerText = `50% des magasins réalisent un chiffre d'affaires inférieur à ${calculateMedian(turnoverData).toLocaleString().replace(/\./g, " ") + " DH"} et, par conséquent, 50% d'entre eux réalisent un chiffre d'affaire supérieur à ce résultat.`;

  deviationCoefficient.innerText = calculateDeviation(turnoverData).toFixed(2) + "%";
  deviationCoefficientHint.innerText = `L'écart-type montre que les chiffres d'affaires des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(turnoverData)) + " DH"}, et le coefficient de variation est de ${((calculateDeviation(turnoverData) * 100) / calculateAverage(turnoverData)).toFixed(4)}.`;

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

  averageValue.innerText = formatNumberWithSpaces(calculateAverage(turnoverData)) + " DH";
  averageValueHint.innerText = `Le chiffre d'affaires moyen de tous les magasins.`

  modeValue.innerText = calculateMode(turnoverData).toLocaleString().replace(/\./g, " ") + " DH";
  modeValueHint.innerText = `Le chiffre d'affaires réalisé par le plus grand nombre de magasins est ${calculateMode(turnoverData).toLocaleString().replace(/\./g, " ") + " DH"}.`;

  medianValue.innerText = calculateMedian(turnoverData).toLocaleString().replace(/\./g, " ") + " DH";
  medianValueHint.innerText = `50% des magasins réalisent un chiffre d'affaires inférieur à ${calculateMedian(turnoverData).toLocaleString().replace(/\./g, " ") + " DH"} et, par conséquent, 50% d'entre eux réalisent un chiffre d'affaire supérieur à ce résultat.`;

  deviationCoefficient.innerText = calculateDeviation(turnoverData).toFixed(2) + "%";
  deviationCoefficientHint.innerText = `L'écart-type montre que les chiffres d'affaires des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(turnoverData)) + " DH"}, et le coefficient de variation est de ${((calculateDeviation(turnoverData) * 100) / calculateAverage(turnoverData)).toFixed(4)}.`;
  updateTurnoversChart(selectedOption.textContent.trim());
});

workforceTabButton.addEventListener("click", () => {
  if (turnoverTabButton.classList.contains("active-dashboard-navigation-button")) {
    turnoverTabButton.classList.remove("active-dashboard-navigation-button");
  }

  if (surfaceTabButton.classList.contains("active-dashboard-navigation-button")) {
    surfaceTabButton.classList.remove("active-dashboard-navigation-button");
  }

  workforceTabButton.classList.add("active-dashboard-navigation-button");

  averageValue.innerHTML = formatNumberWithSpaces(calculateAverage(workforceData));
  averageValueHint.innerText = `L'effectif moyen de tous les magasins.`

  modeValue.innerText = calculateMode(workforceData);
  modeValueHint.innerText = `L'effectif attends par le plus grand nombre de magasins est ${calculateMode(workforceData)}.`;

  medianValue.innerText = calculateMedian(workforceData);
  medianValueHint.innerText = `50% des magasins ayant un effectif inférieur à ${calculateMedian(workforceData)} et, par conséquent, 50% d'entre eux ayant un effectif supérieur à ce résultat.`;

  deviationCoefficient.innerText = calculateDeviation(workforceData).toFixed(2) + "%";
  deviationCoefficientHint.innerText = `L'écart-type montre que l'effectif des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(workforceData))}, et le coefficient de variation est de ${((calculateDeviation(workforceData) * 100) / calculateAverage(workforceData)).toFixed(4)}.`;
  updateWorkforcesChart(selectedOption.textContent.trim());
});

surfaceTabButton.addEventListener("click", () => {
  if (turnoverTabButton.classList.contains("active-dashboard-navigation-button")) {
    turnoverTabButton.classList.remove("active-dashboard-navigation-button");
  }

  if (workforceTabButton.classList.contains("active-dashboard-navigation-button")) {
    workforceTabButton.classList.remove("active-dashboard-navigation-button");
  }

  surfaceTabButton.classList.add("active-dashboard-navigation-button");

  averageValue.innerHTML = formatNumberWithSpaces(calculateAverage(surfaceData)) + " m²";
  averageValueHint.innerText = `Surface moyen de tous les magasins.`

  modeValue.innerText = parseInt(calculateMode(surfaceData))  + " m²";
  modeValueHint.innerText = `Surface attends par le plus grand nombre de magasins est ${parseInt(calculateMode(surfaceData))  + " m²"}.`;

  medianValue.innerText = calculateMedian(surfaceData) + " m²";
  medianValueHint.innerText = `50% des magasins ayant un surface inférieur à ${calculateMedian(surfaceData) + " m²"} et, par conséquent, 50% d'entre eux ayant un surface supérieur à ce résultat.`;

  deviationCoefficient.innerText = calculateDeviation(surfaceData).toFixed(2) + "%";
  deviationCoefficientHint.innerText = `L'écart-type montre que surface des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(surfaceData)) + " m²"}, et le coefficient de variation est de ${((calculateDeviation(surfaceData) * 100) / calculateAverage(surfaceData)).toFixed(4)}.`;
  updateWorkforcesChart(selectedOption.textContent.trim());
});

dateSelect.addEventListener("click", (e) => {
  if (e.target.tagName === "DIV") {
    let selectedYear = parseInt(e.target.textContent);

    if (turnoverTabButton.classList.contains("active-dashboard-navigation-button")) {
      let turnoverByYear = [];
      for (let i = 0; i < dataStorage.length; i++) {
        const [day, month, year] = dataStorage[i].dataYear.split("/");
        if (parseInt(year) === selectedYear) {
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

    }

    if (surfaceTabButton.classList.contains("active-dashboard-navigation-button")) {

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

const updateTurnoverData = (selectedYear) => {
  // 1. Filter the data based on the selected year
  const filteredTurnoverData = filteredData(selectedYear, 'dataTurnover');

  // 2. Calculate the average, mode, median, and deviation
  const averageTurnover = calculateAverage(filteredTurnoverData);
  const modeTurnover = calculateMode(filteredTurnoverData);
  const medianTurnover = calculateMedian(filteredTurnoverData);
  const deviationTurnover = calculateDeviation(filteredTurnoverData);

  // 3. Update HTML elements with the calculated values
  averageValue.innerText = formatNumberWithSpaces(averageTurnover) + " DH";
  modeValue.innerText = modeTurnover.toLocaleString().replace(/\./g, " ") + " DH";
  medianValue.innerText = medianTurnover.toLocaleString().replace(/\./g, " ") + " DH";
  deviationCoefficient.innerText = deviationTurnover.toFixed(2) + "%";
}

const updateWorkforceData = (selectedYear) => {
  // 1. Filter the data based on the selected year
  const filteredWorkforceData = filteredData(selectedYear, 'dataWorkforce');

  // 2. Calculate the average, mode, median, and deviation
  const averageWorkforce = calculateAverage(filteredWorkforceData);
  const modeWorkforce = calculateMode(filteredWorkforceData);
  const medianWorkforce = calculateMedian(filteredWorkforceData);
  const deviationWorkforce = calculateDeviation(filteredWorkforceData);

  // 3. Update HTML elements with the calculated values
  averageValue.innerText = formatNumberWithSpaces(averageWorkforce);
  modeValue.innerText = modeWorkforce;
  medianValue.innerText = medianWorkforce;
  deviationCoefficient.innerText = deviationWorkforce.toFixed(2) + "%";
}

const updateSurfaceData = (selectedYear) => {
 // 1. Filter the data based on the selected year
 const filteredSurfaceData = filteredData(selectedYear, 'dataSurface');

 // 2. Calculate the average, mode, median, and deviation
 const averageSurface = calculateAverage(filteredSurfaceData);
 const modeSurface = calculateMode(filteredSurfaceData);
 const medianSurface = calculateMedian(filteredSurfaceData);
 const deviationSurface = calculateDeviation(filteredSurfaceData);

 // 3. Update HTML elements with the calculated values
 averageValue.innerText = formatNumberWithSpaces(averageSurface) + " m²";
 modeValue.innerText = parseInt(modeSurface) + " m²";
 medianValue.innerText = medianSurface + " m²";
 deviationCoefficient.innerText = deviationSurface.toFixed(2) + "%";
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


dateSelect.addEventListener("click", (e) => {
  if (e.target.tagName === "DIV") {
    const selectedYear = e.target.textContent.trim();
    selectedOption.textContent = selectedYear;
    updateChartBasedOnTab();
    updateDataBasedOnTab();
}
});


turnoverTabButton.addEventListener('click', () => {
    // Add or remove active class for tab buttons
    turnoverTabButton.classList.add("active-dashboard-navigation-button");
    workforceTabButton.classList.remove("active-dashboard-navigation-button");
    surfaceTabButton.classList.remove("active-dashboard-navigation-button");
    // Update the chart based on the selected year
    updateChartBasedOnTab();
    
});

workforceTabButton.addEventListener('click', () => {
  turnoverTabButton.classList.remove("active-dashboard-navigation-button");
  workforceTabButton.classList.add("active-dashboard-navigation-button");
  surfaceTabButton.classList.remove("active-dashboard-navigation-button");
  // Update the chart based on the selected year
  updateChartBasedOnTab();
});

surfaceTabButton.addEventListener('click', () => {
    // Add or remove active class for tab buttons
    turnoverTabButton.classList.remove("active-dashboard-navigation-button");
    workforceTabButton.classList.remove("active-dashboard-navigation-button");
    surfaceTabButton.classList.add("active-dashboard-navigation-button");
    // Update the chart based on the selected year
    updateChartBasedOnTab();
});



const updateChartBasedOnTab = () => {
    const selectedYear = selectedOption.textContent.trim();
    if (turnoverTabButton.classList.contains("active-dashboard-navigation-button")) {
        updateTurnoversChart(selectedYear);
    } else if (workforceTabButton.classList.contains("active-dashboard-navigation-button")) {
        updateWorkforcesChart(selectedYear);
    } else if (surfaceTabButton.classList.contains("active-dashboard-navigation-button")) {
        updateSurfacesChart(selectedYear);
    }
  }

  const updateDataBasedOnTab = () => {
    const selectedYear = selectedOption.textContent.trim();
    if (turnoverTabButton.classList.contains("active-dashboard-navigation-button")) {
        updateTurnoverData(selectedYear);
    } else if (workforceTabButton.classList.contains("active-dashboard-navigation-button")) {
        updateWorkforceData(selectedYear);
    } else if (surfaceTabButton.classList.contains("active-dashboard-navigation-button")) {
        updateSurfaceData(selectedYear);
    }
}



    //logout button
    logoutButton.addEventListener("click", () => {
      const userData = JSON.parse(localStorage.getItem("userStorage"));
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].isActive === true) {
          userData[i].isActive = false;
        }
      }
      localStorage.setItem("userStorage", JSON.stringify(userData));
      window.location.href = "login.html";
    });