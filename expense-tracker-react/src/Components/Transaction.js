import React, { useContext } from 'react'
import { GlobalContext } from '../Context/GlobalState';

const Transaction = (props) => {
  const { transaction } = props;
  const { deleteTransaction } = useContext(GlobalContext);

  return (
    <li className={transaction.amount > 0 ? "plus" : "minus"}>
      {transaction.text} <span>{transaction.amount}</span>
      <button onClick={() => deleteTransaction(transaction.id)} className='delete-btn'>x</button>
    </li>
  )
}

export default Transaction
