import React, {useState, useEffect} from 'react';
import Ticker from './Ticker';
import PropTypes from 'prop-types';
import Description from './Description';
import DataTable from './DataTable';

export default function Stock(props) {
  let [symbol, setSymbol] = useState(props.symbol);
  const setError = props.setError;
  let [info, setInfo] = useState();
  const dataLabels = ['High', 'Low', 'Open', 'Prev Close'];
  let [tableData, setTableData] = useState();

    useEffect(() => {
        setSymbol(props.symbol);
    }, [props])
    

    useEffect(() => {
        getCompany();
      }, [symbol]);

    async function getCompany() {
        try {
          const r = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=c7o52faad3idf06mn5k0`);
          if (!r.ok) {
            throw new Error(`${r.status} ${r.statusText}`);
          }
          const data = await r.json();
          setInfo(data);
          validateProfile(data);
        } catch(err) {
          console.error(err);
          setError(true);
        }
      }
      //this fetch gets the company profile data

      function validateProfile(profile) {
        if(profile.name) {
          setError(false);
        } else {
          setError(true);
        }
      }

    return (<div className="stock">{
      info ? <div>
        <div className="companyName">{info.name}</div>
        <a className="companyWebsite" href={info.weburl} target="_blank" rel="noreferrer">{info.weburl}</a>
      <div className="exchange">Traded on the <span>{info.exchange}</span></div>
      <div >Industry <span className="companyIndustry">{info.finnhubIndustry}</span></div>
      {/*<div>Total Shares Outstanding <span>{info.shareOutstanding}</span></div>*/}
      <Ticker symbol ={symbol} currency ={info.currency} returnTableData={setTableData}/>
      <DataTable labels = {dataLabels} values ={tableData}/>
      <Description symbol={symbol}/>
      </div> : null}
    </div>);
}

Stock.propTypes = {
  symbol: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
};

//sample response
//Object
// country: "US"
// currency: "USD"
// exchange: "NASDAQ NMS - GLOBAL MARKET"
// finnhubIndustry: "Technology"
// ipo: "1986-03-13"
// logo: "https://finnhub.io/api/logo?symbol=MSFT"
// marketCapitalization: 2264407
// name: "Microsoft Corp"
// phone: "14258828080.0"
// shareOutstanding: 7507.98
// ticker: "MSFT"
// weburl: "https://www.microsoft.com/en-us"