import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const Diagram = ({ sortedCategories, sortedTotalSum, colors }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    datasets: [{
      label: 'money spent',
      data: sortedTotalSum,
      //как то формировать цвета(возможно случайно)
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1,
    }]
  }

  // console.log('data', data)

  return (
    <div className='h-60  flex items-center'>
      <Doughnut data={data} />
    </div>
  )
}

export default Diagram