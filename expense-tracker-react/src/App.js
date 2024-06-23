import React, { useState } from 'react';
import Header from './Components/Header';
import Balance from './Components/Balance';
import IncomeExpense from './Components/IncomeExpense';
import History from './Components/History';
import NewTransaction from './Components/NewTransaction';
import './App.css';

import { GlobalProvider } from './Context/GlobalState';

function App() {

  return (
    <GlobalProvider>
      <Header />
      <div className='container'>
        <Balance />
        <IncomeExpense />
        <History />
        <NewTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
