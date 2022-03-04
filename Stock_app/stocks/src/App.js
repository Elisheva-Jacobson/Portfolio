import './App.css';
import React, {useEffect, useState} from 'react';
import Stock from './Stock.js';
import Header from './Header';
import Error from './Error';

export default function App() {
  let [inputSymbol, setInputSymbol] = useState('');
  let [symbol, setSymbol] = useState();
  let [error, setError] = useState(false);

  // useEffect(() => {
  //   console.log('symbol', symbol);
  //   console.log('error', error);
  //   console.log(typeof error, 'typeof error');
  // })

  function enterHandler(event) {
    if (event.key === 'Enter') {
      setSymbol(inputSymbol);
      setError(null);
    }
  }


  return (
    <div className="App">
      <Header title="Stocks"/>
      <form onSubmit={e => e.preventDefault()}>
        <label>Enter Stock Ticker Symbol <input name="symbol" placeholder="symbol" value={inputSymbol} onChange={event => {setInputSymbol(event.target.value)}} onKeyDown={event => enterHandler(event)}/></label>
      </form>
      {!symbol ? null : error ? <Error message="The symbol you entered could not be found. Please try a different symbol."/> : <Stock symbol={symbol} setError={setError}></Stock>}
    </div>
  );
}
//either make it a dropdown or handle if they enter a bad symbol
//can make a function which has the setSymbol and validation to be the onClick
