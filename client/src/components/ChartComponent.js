// import React, { useEffect, useRef } from 'react';
// import { Chart } from 'chart.js';

// function ChartComponent() {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const xValues = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//     const yValues = [30, 25, 20, 15, 10, 5, 0];
//     const barColors = ["#0000FF", "#38B6FF", "#0000FF", "#38B6FF", "#0000FF", "#38B6FF", "#0000FF"];

//     const ctx = chartRef.current.getContext("2d");

//     new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels: xValues,
//         datasets: [{
//           backgroundColor: barColors,
//           data: yValues
//         }]
//       },
//       options: {
//         legend: { display: false },
//         title: {
//           display: true,
//           text: "Total Appointments Taken Per Day",
//           fontColor: "#000000",
//         },
//         scales: {
//           xAxes: [{
//             ticks: {
//               fontColor: "#000000"
//             }
//           }],
//           yAxes: [{
//             ticks: {
//               fontColor: "#000000"
//             }
//           }]
//         }
//       }
//     });
//   }, []);

//   return <canvas ref={chartRef} id="myChart"></canvas>;
// }

// export default ChartComponent;