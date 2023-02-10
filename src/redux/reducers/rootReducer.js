import { combineReducers } from "@reduxjs/toolkit";
import { moneyReducer as money } from './moneyReducer'
import { colorsReducer as colors } from "./colorsReducer";
import { dateReducer as date } from "./dateReducer";


export const rootReducer = combineReducers({ money, colors, date })