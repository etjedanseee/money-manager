import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import Diagram from './components/Diagram';
import { calcAll } from './utils/calcSpent';
import Header from './components/Header';
import Categories from './components/Categories';

function App() {
  const { money, categories, spent } = useSelector(state => state.money)
  const { selectedDate } = useSelector(state => state.date)
  //useMemo чтобы не считало только когда меняется spent | categories
  const [sortedCategories, sortedColors, sortedTotalSum] = calcAll(spent, categories)


  return (
    <>
      <div className='relative flex flex-col justify-center items-center max-w-md mx-auto'>
        <Header money={money} selectedDate={selectedDate} />
        <div className='grid grid-cols-4 grid-rows-4 grid-flow-row-dense gap-2'>
          <Categories
            sortedCategories={sortedCategories}
            sortedColors={sortedColors}
            sortedTotalSum={sortedTotalSum}
          />
          <Diagram
            sortedColors={sortedColors}
            sortedTotalSum={sortedTotalSum}
          />
        </div>
      </div>
    </>
  );
}

export default App;
