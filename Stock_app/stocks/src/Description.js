import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export default function Description(props) {
    let [symbol, setSymbol] = useState(props.symbol);
    let [description, setDescription] = useState();

    useEffect(() => {
        setSymbol(props.symbol);
    }, [props]);

    useEffect(() => {
        getDescription();
    }, [symbol]);

    async function getDescription() {
        try {
            const r = await fetch(`https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=3pDqkKA9RypGc0FZKaFUduzblTMiLidw`);
            if (!r.ok) {
                throw new Error(`${r.status} ${r.statusText}`);
            }
            const data = await r.json();
            //console.log(data);
            setDescription(data.results.description);
        } catch(err) {
            console.error(err);
        }
    }

  return (
    <div id="companyDescription">{description ? description : null}</div>
  )
}

Description.propTypes = {
    symbol: PropTypes.string.isRequired
};
