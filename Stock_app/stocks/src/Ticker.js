import React, { useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export default function Ticker(props) {
  let [symbol, setSymbol] = useState(props.symbol);
  let [info, setInfo] = useState();
  let [date, setDate] = useState();
  let intervalId;

  useEffect(() => {
    setSymbol(props.symbol);
  }, [props]);

  async function getPrice() {
    try {
      const r = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=c7o52faad3idf06mn5k0`);
      if (!r.ok) {
        throw new Error(`${r.status} ${r.statusText}`);
      }
      const data = await r.json();
      setInfo({
        price: data.c, direction: findDirection(data.d), change: data.d,
        percentChange: data.dp, totalShares: data.t, high: data.h, low: data.l
      });
      console.log('symbol', symbol);
      console.log('info', info);
      setDate(dateString);
    } catch (err) {
      console.error(err);
    }
  }

  function findDirection(change) {
    return change > 0 ? 'up' : 'down';
    //if it is = will be down in this case
  }

  function dateString() {
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  useEffect(() => {
    getPrice();//so it shouldn't wait 30 seconds in the beginning
    intervalId = setInterval(() => {
      getPrice();
    }, 30000);
    return () => {
      console.log('returned function running');
      clearInterval(intervalId);
    };
  }, [symbol]);

  return (<div>
    {info ? <div>{console.log('info in div', info)}<div className="price">Price
      <span> {info.price} </span>
      <img className="arrow" src={info.direction === 'up' ? 'images/upArrow.png' : 'images/downArrow.png'} alt={info.direction
      } /> <span className="pointsChange"> {info.change} </span>
      <span className="percentChange"> {info.percentChange}% </span></div>
      <div>High <span>{info.high}</span> Low <span>{info.low}</span></div>
      <div>Last Updated <span>{date}</span></div>
    </div> : null}
  </div>);
}

Ticker.propTypes = {
  symbol: PropTypes.string.isRequired
}

//set the arrow up or down
//sample response
// c: 288.66 current price
// d: -7.71 change
// dp: -2.6015 percent change
// h: 294.99 high price of the day
// l: 285.185 low price of the day
// o: 291.52 open price of the day
// pc: 296.37 previous close price
// t: 1643144003

