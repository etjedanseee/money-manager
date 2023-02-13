import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import Diagram from './components/Diagram';
import { calcAll } from './utils/calcSpent';
import Header from './components/Header';
import Categories from './components/Categories';
import { useEffect } from 'react';
import { setSortedSpent } from './redux/actions/moneyActions';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewCattegory from './pages/NewCattegory';

function App() {
  const { invoice, filterInvoiceBy, categories, spent, sortedCategories, sortedColors, sortedTotalSum } = useSelector(state => state.money)
  const { selectedDate, typeDateName } = useSelector(state => state.date)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSortedSpent(calcAll(spent, categories, selectedDate, filterInvoiceBy)))
  }, [categories, selectedDate, typeDateName, spent, filterInvoiceBy, dispatch])

  return (
    <div className='bg-black min-h-screen'>
      <div className='relative min-h-screen flex flex-col items-center max-w-md mx-auto bg-white'>
        <Routes>
          <Route path='/' element={
            <Home
              invoice={invoice}
              typeDateName={typeDateName}
              sortedCategories={sortedCategories}
              sortedColors={sortedColors}
              sortedTotalSum={sortedTotalSum}
            />}
          />
          <Route path='/newCategory' element={<NewCattegory categories={categories} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
