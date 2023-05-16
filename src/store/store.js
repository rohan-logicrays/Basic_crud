import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit";





const persistConfig = {
    key:"root",
    versio:1,
    storage
}
const reducer = combineReducers({
    
})
const persistedReducer = persistReducer(persistConfig,reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
