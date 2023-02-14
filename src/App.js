import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { calcAll } from './utils/calcSpent';
import { useEffect } from 'react';
import { setSortedSpent } from './redux/actions/moneyActions';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewCategory from './pages/NewCategory';
import EditCategory from './pages/EditCategory';

function App() {
  const { filterInvoiceBy, categories, spent, sortedCategories, sortedColors, sortedTotalSum, isEditCategories } = useSelector(state => state.money)
  const { selectedDate, typeDateName } = useSelector(state => state.date)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSortedSpent(calcAll(spent, categories, selectedDate, filterInvoiceBy)))
  }, [categories, selectedDate, typeDateName, spent, filterInvoiceBy, dispatch])

  return (
    <div className='bg-black min-h-screen overflow-hidden'>
      <div className='relative min-h-screen flex flex-col items-center max-w-md mx-auto bg-white'>
        <Routes>
          <Route path='/' element={
            <Home
              isEditCategories={isEditCategories}
              typeDateName={typeDateName}
              sortedCategories={sortedCategories}
              sortedColors={sortedColors}
              sortedTotalSum={sortedTotalSum}
            />}
          />
          <Route path='/new-category' element={<NewCategory categories={categories} />} />
          <Route path='/edit-category/:category' element={<EditCategory categories={categories} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
