import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import Transaction from './Transaction';

const History = (props) => {
  // const context = useContext(GlobalContext);
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => {
          return <Transaction key={transaction.id} transaction={transaction} />
        })}
      </ul>
    </>
  )
}

export default History
