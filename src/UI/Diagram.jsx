import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const Diagram = ({ sortedColors, sortedTotalSum }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const doughnutConfig = {
    datasets: [{
      label: 'money spent',
      data: sortedTotalSum,
      backgroundColor: sortedColors,
      borderColor: sortedColors,
      borderWidth: 1,
    }]
  }

  return (
    <div className='h-60 col-start-2 col-end-4 row-start-2 row-end-4'><Doughnut data={doughnutConfig} /></div>
  )
}

export default Diagram