import './index.css'
import { useSelector } from 'react-redux'
import Diagram from './components/Diagram';
import Operations from './components/Operations';
import { calcAll } from './utils/calcSpent';
function App() {
  const { money, categories, spent } = useSelector(state => state.money)
  const { colors } = useSelector(state => state.colors)
  const [sortedCategories, sortedTotalSum] = calcAll(spent, categories)

  return (
    <div className='flex flex-col items-center'>
      <Diagram
        sortedCategories={sortedCategories}
        sortedTotalSum={sortedTotalSum}
        colors={colors}
      />
      <Operations />
    </div>
  );
}

export default App;
