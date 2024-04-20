// let turnOverLink = document.querySelector(".dashboard-nav-elements li:nth-of-type(1)");
// let workForceLink = document.querySelector(".dashboard-nav-elements li:nth-of-type(2)");
// let surfaceLink = document.querySelector(".dashboard-nav-elements li:nth-of-type(3)");

// let avg = document.getElementById('averageValue');
// let mode = document.getElementById('modeValue');
// let median = document.getElementById('medianValue');

// // const storeStorage = JSON.parse(localStorage.getItem("storeStorage"));
// const dataStorage = JSON.parse(localStorage.getItem("dataStorage"));

// let turnOver = dataStorage.map((data) => data.dataTurnover);
// let dates = dataStorage.map((data) => data.dataYear);
// let years = dates.map((date) => {
//     return date.split("/")[2];
// })

// const uniqueYears = new Set(dates.map(dateString => dateString.split("/")[2]));

// const dateSelect = document.querySelector(".dropdown-options");

// uniqueYears.forEach((year) => {
//     const div = document.createElement("div");
//     div.textContent = year;
//     dateSelect.appendChild(div);
// });

// //filter


// let turnoverTotal = 0;
// let counter = 0;
// let turnoverAverage = 0;

// //average calculation
// const average = () => {
//     turnOver.forEach(item => {
//         turnoverTotal += item;
//         counter++;
//     });
//     turnoverAverage = turnoverTotal / counter;
//     return turnoverAverage.toLocaleString().replace(/,/g, " ") + " DH";
// }

// const mode_fun = () => {
//     if (turnOver.length > 0) {
//         let modeVal = turnOver[0];
//         for (let i = 1; i < turnOver.length; i++) {
//             if (turnOver[i] > modeVal) {
//                 modeVal = turnOver[i];
//             }
//         }
//         return modeVal.toLocaleString().replace(/,/g, " ") + " DH";
//     }
// }

// function mediane_fun() {
//     let c;

//     if (turnOver.length > 0) {
//         turnOver.sort((a, b) => a - b);

//         let index = turnOver.length;
//         let medianeVal;

//         if (index % 2 === 0) {
//             medianeVal = (turnOver[index / 2] + turnOver[(index / 2) - 1]) / 2;
//         } else {
//             medianeVal = turnOver[Math.floor(index / 2)];
//         }
//         return medianeVal.toLocaleString().replace(/,/g, " ") + " DH";
//     }
// }

// function display_ecart_type() {
//     let somme = 0;
//     for (let i = 0; i < turnOver.length; i++) {
//         somme += turnOver[i];
//     }
//     let moyenne = somme / turnOver.length;

//     let variance = 0;
//     for (let i = 0; i < turnOver.length; i++) {
//         variance += Math.pow(turnOver[i] - moyenne, 2);
//     }
//     variance /= turnOver.length;
//     let ecartType = Math.sqrt(variance);

//     let coefficientVariation = (ecartType / moyenne) * 100; 

//     return {
//         moyenne: moyenne,
//         ecartType: ecartType,
//         coefficientVariation: coefficientVariation
//     };
// }

// let result = display_ecart_type();

// window.onload = () => {
//     avg.innerHTML = average();
//     mode.innerHTML = mode_fun();
//     median.innerHTML = mediane_fun();

//     document.getElementById("moyenne").innerHTML = result.moyenne.toFixed(2).toLocaleString().replace(/,/g, " ") + " DH";
//     document.getElementById("deviationCoefficient").innerHTML = result.coefficientVariation.toFixed(2) + " %";
//     document.getElementById("coefficientVal").innerHTML = result.ecartType.toFixed(2);
// }


const dataStorage = JSON.parse(localStorage.getItem("dataStorage"));
        let dates = dataStorage.map((data) => data.dataYear);
        let turnoversDataChart;
        let workforcesDataChart;
        let surfacesDataChart;

        let avgDataChart;
        let recursiveDataChart;
        let plageDataChart = [];
        let fruequenceDataChart = [];

        const filteredData = (year, dataKey) => {
            return dataStorage.filter(data => data.dataYear === year).map(data => data[dataKey]);
        }

        const dateSelect = document.querySelector(".dropdown-options");

        dates.forEach((year) => {
            const option = document.createElement("div");
            option.textContent = year;
            option.value = year;
            dateSelect.appendChild(option);
        });

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

        dateSelect.addEventListener('change', (event) => {
            const selectedYear = event.target.value;
            updateTurnoversChart(selectedYear);
        });

        document.getElementById('turnoverButton').addEventListener('click', () => {
            const selectedYear = dateSelect.value;
            updateTurnoversChart(selectedYear);
        });

        document.getElementById('workforceButton').addEventListener('click', () => {
            const selectedYear = dateSelect.value;
            updateWorkforcesChart(selectedYear);
        });

        document.getElementById('surfaceButton').addEventListener('click', () => {
            const selectedYear = dateSelect.value;
            updateSurfacesChart(selectedYear);
        });