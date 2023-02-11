import { combineReducers } from "@reduxjs/toolkit";
import { moneyReducer as money } from './moneyReducer'
import { dateReducer as date } from "./dateReducer";


export const rootReducer = combineReducers({ money, date })