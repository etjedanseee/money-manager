import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom'
import { setFilterInvoiceBy } from '../redux/actions/moneyActions';

const FooterMenu = () => {
  const location = useLocation();
  const dispatch = useDispatch()

  const onCategoriesClick = () => {
    dispatch(setFilterInvoiceBy('All invoice'))
  }

  return (
    <div className='fixed w-full max-w-md bottom-0 z-10 bg-white'>
      <div className='flex justify-around py-2 border-t-2 border-gray-400 text-lg font-medium'>
        <NavLink
          to='/invoice'
          className={`${location.pathname === '/invoice' ? 'text-blue-700' : 'text-gray-500'}`}
        >
          Invoice
        </NavLink>
        <NavLink
          to='/'
          className={`${location.pathname === '/' ? 'text-blue-700' : 'text-gray-500'}`}
          onClick={onCategoriesClick}
        >
          Categories
        </NavLink>
        <NavLink
          to='/operations'
          className={`${location.pathname === '/operations' ? 'text-blue-700' : 'text-gray-500'}`}
        >
          Operations
        </NavLink>
      </div>
    </div>
  )
}

export default FooterMenu