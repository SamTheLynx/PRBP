// import React, { useState, useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import axios from 'axios';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = () => {
//   const [chartData, setChartData] = useState(null);  // Initialize with null

//   useEffect(() => {
//     // Simulate an API call
//     axios.get('/api/getApplicationStats')
//       .then(response => {
//         const data = response.data;

//         if (!data) {
//           console.error("Data is undefined!");
//           return;
//         }

//         setChartData({
//           labels: ['Total Applications', 'New Applications', 'In-process Applications', 'Pending Applications'],
//           datasets: [
//             {
//               label: '# of Applications',
//               data: [data.total || 150, data.new || 30, data.inProcess || 45, data.pending || 75], 
//               backgroundColor: [
//                 'rgba(54, 162, 235, 0.6)',
//                 'rgba(75, 192, 192, 0.6)',
//                 'rgba(255, 206, 86, 0.6)',
//                 'rgba(255, 99, 132, 0.6)',
//               ],
//               borderColor: [
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(255, 99, 132, 1)',
//               ],
//               borderWidth: 1,
//             },
//           ],
//         });
//       })
//       .catch(error => console.error('Error fetching chart data:', error));
//   }, []);

//   if (!chartData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ width: '30%', margin: 'auto' }}>
//       <h2>Application Statistics</h2>
//       <Pie data={chartData} options={{
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           tooltip: {
//             enabled: true,
//           },
//         },
//       }} />
//     </div>
//   );
// };

// export default PieChart;
