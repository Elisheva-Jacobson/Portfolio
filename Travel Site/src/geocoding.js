//import $ from 'jquery';
// import {jquery} from './index.js';
// const $ = jquery;
import {myAPIkeys} from '../config.js';

export const countriesList = async (select) => {
    'use strict';
    try {
        const r = await fetch('../countries.json');
        if (!r.ok) {
            throw new Error(`${r.status} ${r.statusText}`);
        }
        const data = await r.json();
        //console.log(data);
        const countries = Object.keys(data);
        const countryCodes = Object.values(data);
        for (let i = 0; i < countries.length; i++) {
            $(`<option value="${countryCodes[i]}">${countries[i]}</option>`).appendTo(select);
        }
    } catch (err) {
        console.error(err);
    }
};
//must be passed element to append to

export const getLatLon = async (city, country, errorDiv) => {
    'use strict';
    errorDiv.text('');
    try {
        const r = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${myAPIkeys.open_weather_map}`);
        if (!r.ok) {
            throw new Error(`${r.status} ${r.statusText}`);
        }
        const data = await r.json();
        return [data[0].lat, data[0].lon];
    } catch (err) {
        errorDiv.text("We're sorry! That location was not found.");
        console.error(err);
    }
};
//must be passed city and country names
//must pass an error div