const turnoverTabButton = document.getElementById("turnoverTabButton");
const workforceTabButton = document.getElementById("workforceTabButton");
const surfaceTabButton = document.getElementById("surfaceTabButton");
const deviationCoefficient = document.getElementById("deviationCoefficient");
const coefficientVal = document.getElementById("coefficientVal");
const locationSelect = document.getElementById("locationSelect");

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
  let modes = [];
 
  for (var i = 0; i < dataArray.length; i++) {
     var num = parseInt(dataArray[i], 10);
     frequency[num] = (frequency[num] || 0) + 1;
     if (frequency[num] > maxFreq) {
       maxFreq = frequency[num];
     }
  }
 
  for (var key in frequency) {
     if (frequency[key] === maxFreq) {
       modes.push(Number(key));
     }
  }
 
  return modes;
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

  locationSelect.innerHTML = `${uniqueYears[0]}
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
  updateTurnoversChart(uniqueYears[0]);
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
  updateWorkforcesChart(uniqueYears[0]);
});

surfaceTabButton.addEventListener("click", () => {
  if (turnoverTabButton.classList.contains("active-dashboard-navigation-button")) {
    turnoverTabButton.classList.remove("active-dashboard-navigation-button");
  }

  if (workforceTabButton.classList.contains("active-dashboard-navigation-button")) {
    workforceTabButton.classList.remove("active-dashboard-navigation-button");
  }

  surfaceTabButton.classList.add("active-dashboard-navigation-button");

  averageValue.innerHTML = formatNumberWithSpaces(calculateAverage(surfaceData));
  averageValueHint.innerText = `Surface moyen de tous les magasins.`

  modeValue.innerText = parseInt(calculateMode(surfaceData));
  modeValueHint.innerText = `Surface attends par le plus grand nombre de magasins est ${parseInt(calculateMode(surfaceData))}.`;

  medianValue.innerText = calculateMedian(surfaceData);
  medianValueHint.innerText = `50% des magasins ayant un surface inférieur à ${calculateMode(surfaceData)} et, par conséquent, 50% d'entre eux ayant un surface supérieur à ce résultat.`;

  deviationCoefficient.innerText = calculateDeviation(surfaceData).toFixed(2) + "%";
  deviationCoefficientHint.innerText = `L'écart-type montre que surface des magasins s'écartent en moyenne de ${formatNumberWithSpaces(calculateAverage(workforceData))}, et le coefficient de variation est de ${((calculateDeviation(workforceData) * 100) / calculateAverage(workforceData)).toFixed(4)}.`;
  updateWorkforcesChart(uniqueYears[0]);
});


dateSelect.addEventListener("click", (e) => {
  if (e.target.tagName === "DIV") {
    // this is the value of the selected year from the dropdown menu
    let selectedYear = parseInt(e.target.textContent);

    const activeTab = document.querySelector('.active-dashboard-navigation-button');
    if (activeTab) {
      let data;
      if (activeTab.id === 'turnoverTabButton') {
        for (let i = 0; i < dataStorage.length; i++)
        {
          let dates = dataStorage.map((data) => data.dataYear);
          let years = dates.map((date) => {
          return date.split("/")[2];
})
          if (dataStorage[i].dataYear === selectedYear)
          {
            let selectedTurnover = [];
            selectedTurnover.push(dataStorage[i].dataTurnover);
            console.log(selectedTurnover);
          }
        }
        data = turnoverData;

      } else if (activeTab.id === 'workforceTabButton') {
        data = workforceData;
      } else if (activeTab.id === 'surfaceTabButton') {
        data = surfaceData;
      }

      console.log(data);
    }
  }

  // 1. check which tab is selected and use its data :
  // if turnoverTabButton is selected (has .active-dashboard-navigation-button class name) use turnoverData
  // if workforceTabButton is selected (has .active-dashboard-navigation-button class name) use workforceData 
  // if surfaceTabButton is selected (has .active-dashboard-navigation-button class name) use surfaceData 

  // get 
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


uniqueYears.forEach((year) => {
    const option = document.createElement("div");
    option.textContent = year;
    option.value = year;
    dateSelect.appendChild(option);
});

const updateTurnoversChart = (year) => {
    updateChart(year.trim(), 'dataTurnover');
}

const updateWorkforcesChart = (year) => {
    updateChart(year.trim(), 'dataWorkforce');
}

const updateSurfacesChart = (year) => {
    updateChart(year.trim(), 'dataSurface');
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