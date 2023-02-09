import './index.css'
import { useSelector } from 'react-redux'
import Diagram from './components/Diagram';
import Operations from './components/Operations';
import { calcAll } from './utils/calcSpent';

function App() {
  const { money, categories, spent } = useSelector(state => state.money)
  //useMemo чтобы не считало только когда меняется spent | categories
  const [sortedCategories, sortedColors, sortedTotalSum] = calcAll(spent, categories)


  return (
    <div className=' flex flex-col items-center '>
      <Diagram
        sortedCategories={sortedCategories}
        sortedColors={sortedColors}
        sortedTotalSum={sortedTotalSum}
      />
      {/* <Operations /> */}
    </div>
  );
}

export default App;
