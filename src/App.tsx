import React from 'react';
import './App.css';
import {Route,Routes} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ShowData from './Components/ShowList';
import ExpenseTracker from './Components/ExpenseTracker';

function App() {
  return (
    <div className="App">

      <ShowData></ShowData>


    </div>
  );
}

export default App;
