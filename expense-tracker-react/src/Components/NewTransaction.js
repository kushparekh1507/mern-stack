import React, { useState, useContext } from 'react'
import { GlobalContext } from '../Context/GlobalState';

const NewTransaction = (props) => {
  const { addTransaction } = useContext(GlobalContext);

  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    setText("");
    setAmount(0);
    const NewTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text: text,
      amount: +amount
    }
    addTransaction(NewTransaction);
  }

  return (

    <>
      <h3>Add new transaction</h3>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" name="text" placeholder="Enter text..." onChange={(e) => setText(e.target.value)} value={text} />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount <br />
            (negative - expense, positive - income)
          </label>
          <input type="number" name="amount" placeholder="Enter amount..." onChange={(e) => setAmount(e.target.value)}
            value={amount} />
        </div>
        <button className="btn" type="submit">Add transaction</button>
      </form>
    </>
  )
}

export default NewTransaction;
