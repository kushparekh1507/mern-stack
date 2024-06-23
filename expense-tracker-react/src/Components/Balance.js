import React, { useContext } from 'react'
import { GlobalContext } from '../Context/GlobalState'

const Balance = (props) => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);
  // console.log(amounts);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
      <h1>Your Balance</h1>
      <h1>${total}</h1>
    </>
  )
}

export default Balance
