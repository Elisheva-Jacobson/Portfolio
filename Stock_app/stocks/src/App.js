import './App.css';
import React, {useState} from 'react';
import Stock from './Stock.js';
import Header from './Header';
import Error from './Error';

export default function App() {
  let [inputSymbol, setInputSymbol] = useState('');
  let [symbol, setSymbol] = useState();
  let [error, setError] = useState(false);

  function enterHandler(event) {
    if (event.key === 'Enter') {
        setSymbol(inputSymbol);
        setError(false);
    }
  }

  return (
    <div className="App">
      <Header title="Stocks"/>
      <form onSubmit={e => e.preventDefault()}>
        <label>Enter Stock Symbol <input name="symbol" placeholder="symbol" value={inputSymbol} onChange={event => {setInputSymbol(event.target.value)}} onKeyDown={event => enterHandler(event)}/></label>
      </form>
      {!symbol ? null : error ? <Error message={`Data for ${symbol} could not be found. Please try a different symbol.`}/> : <Stock symbol={symbol} setError={setError}></Stock>}
    </div>
  );
}
//either make it a dropdown or handle if they enter a bad symbol
//can make a function which has the setSymbol and validation to be the onClick
