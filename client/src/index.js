import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import BrandStore from './store/BrandStore';
import TypeStore from './store/TypeStore';
import './index.css'
import BasketStore from "./store/BasketStore";

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null)

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
    brand: new BrandStore(),
    type: new TypeStore(),
    basket: new BasketStore()
  }}>
    <App />
  </Context.Provider>
);