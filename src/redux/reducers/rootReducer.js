import { combineReducers } from "@reduxjs/toolkit";
import { moneyReducer as money } from './moneyReducer.js'
import { colorsReducer as colors } from "./colorsReducer.js";


export const rootReducer = combineReducers({ money, colors })