import React, { useContext } from 'react'
import { GlobalContext } from '../Context/GlobalState'

const IncomeExpense = (props) => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  //first filter out the positive amounts i.e-Income and then accumulate them with reduce to find out total income
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  //first filter out the negative amounts i.e-Expense and then accumulate them with reduce to find out total expense
  const expense = Math.abs(amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2));

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${income}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-${expense}</p>
      </div>
    </div>
  )
}

export default IncomeExpense
