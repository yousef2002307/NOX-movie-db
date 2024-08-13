import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route,useNavigate }  from 'react-router-dom';
import Com from './Com';
import Nav from './Nav';
import 'semantic-ui-css/semantic.min.css'; // Import Semantic UI CSS
import { createBrowserHistory } from 'history'; 
import First from './context/First'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ChakraProvider } from '@chakra-ui/react'
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore,applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';
import Item from './Components/Item';

import Register from './Components/Register';
import LogOut from './Components/LogOut';
import Test from './Components/Test';
import Movies from './Components/Movies';
import Series from './Components/Series';
import People from './Components/People';
import SingleEle from './Components/SingleEle';
const root = ReactDOM.createRoot(document.getElementById('root'));
const history = createBrowserHistory();

const theme = createTheme();


root.render(
  <ChakraProvider>
      <Provider store={createStore(reducers,applyMiddleware(thunk))}>
      <BrowserRouter >
      <Routes>
      <Route path='/' exact element={<App/>}/>
      <Route path='/login' exact element={<Item/>}/>
      <Route path='/register' exact element={<Register/>}/>
      <Route path='/movies' exact element={<Movies/>}/>
      <Route path='/shows' exact element={<Series/>}/>
      <Route path='/people' exact element={<People/>}/>
      <Route path='/logout' exact element={<LogOut/>}/>
      <Route path='/single/:id/:kind' exact element={<SingleEle/>}/>
      <Route path='/test' exact element={<Test/>}/>
      <Route path="*" element={<App/>} />
        </Routes>

</BrowserRouter>
</Provider>
    </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
