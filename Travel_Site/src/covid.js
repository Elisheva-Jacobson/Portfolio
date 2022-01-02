//import { myAPIkeys } from '../config.js';
/*globals myAPIkeys */
//import $ from 'jquery';
// import { jquery } from './index.js';
// const $ = jquery;

//const covidDisplay = $('#covidDisplay');
//const totalTable = $('#covidTotals');
//const countriesDropdown = $('#countries');
// const countryTotal = $('#countryTotal');
// const confirmedTotal = $('#confirmedTotal');
// const criticalTotal = $('#criticalTotal');
// const recoveredTotal = $('#recoveredTotal');
// const deathsTotal = $('#deathsTotal');

export const getCountries = async () => {
    'use strict';
    try {
        const r = await fetch("https://covid-193.p.rapidapi.com/countries", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": myAPIkeys.rapid_api
            }
        });
        if (!r.ok) {
            throw new Error(`${r.status} ${r.statusText}`);
        }
        const countries = await r.json();
        console.log(countries);
        countries.response.forEach(country => {
            $(`<option value="${country}">${country}</option>`).appendTo($('#countries'));
        });
    } catch (err) {
        console.error(err);
    }
};

export const countryCurrents = async () => {
    'use strict';
    //errorDiv.text('');
    $('#errorCovid').text('');
    const country = $('#countries').val();
    const url = `https://covid-193.p.rapidapi.com/statistics?country=${country}`;
    try {
        const r = await fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": myAPIkeys.rapid_api
            }
        });
        if (!r.ok) {
            throw new Error(`${r.status} ${r.statusText}`);
        }
        const data = await r.json();
        //console.log(data);
        $('#covidCountry').text(data.response[0].country);
        $('#population').text(convertNumToString(data.response[0].population));
        $('#newCases').text(convertNumToString(data.response[0].cases.new));
        $('#active').text(convertNumToString(data.response[0].cases.active));
        $('#critical').text(convertNumToString(data.response[0].cases.critical));
        $('#recovered').text(convertNumToString(data.response[0].cases.recovered));
        $('#casesMill').text(convertNumToString(data.response[0].cases['1M_pop']));
        $('#totalCases').text(convertNumToString(data.response[0].cases.total));
        $('#newDeaths').text(convertNumToString(data.response[0].deaths.new));
        $('#totalDeaths').text(convertNumToString(data.response[0].deaths.total));
        $('#deathsMill').text(convertNumToString(data.response[0].deaths['1M_pop']));
        $('#totalTests').text(convertNumToString(data.response[0].tests.total));
        $('#testsMill').text(convertNumToString(data.response[0].tests['1M_pop']));
        $('#covidDaily').show();
    } catch (err) {
        //errorDiv.text('Data for that country was not found');
        $('#errorCovid').text('Data for that country was not found');
        $('#covidDaily').hide();
        console.error(err);
    }

};

function convertNumToString(num) {
    'use strict';
    if (num) {
        return parseInt(num).toLocaleString('en', { useGrouping: true });
    }

}