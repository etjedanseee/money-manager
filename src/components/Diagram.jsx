import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Categories from './Categories';

const Diagram = ({ sortedCategories, sortedColors, sortedTotalSum }) => {
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
    <div className='relative flex justify-center items-center'>
      <div className='grid grid-cols-4 grid-rows-4 grid-flow-row-dense gap-2'>
        <Categories
          sortedCategories={sortedCategories}
          sortedColors={sortedColors}
          sortedTotalSum={sortedTotalSum}
        />
        <div key='doughnut' className='h-60 col-start-2 col-end-4 row-start-2 row-end-4'><Doughnut data={doughnutConfig} /></div>
      </div>
    </div>
  )
}

export default Diagram