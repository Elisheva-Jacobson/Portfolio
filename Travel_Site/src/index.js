import $ from 'jquery';
import './style.scss';
const translateForm = $('#chooseLang');


import { displayLanguages } from './translate.js';
function languagesList() {
    'use strict';
    if ($('#language').children().length < 1) {
        displayLanguages();
    }
}


import { retrieveTranslation } from './translate.js';
translateForm.submit(event => {
    'use strict';
    event.preventDefault();
    retrieveTranslation();
});

import { getCountries } from './covid.js';
function covidCountries() {
    'use strict';
    if ($('#countries').children().length < 1) {
        getCountries();
    }
}

import { countryCurrents } from './covid.js';
const covidStatsButton = $('#covidStats');
covidStatsButton.click(event => {
    'use strict';
    event.preventDefault();
    countryCurrents();
});

import { countriesList } from './geocoding.js';
const weatherCountrySelect = $('#countriesWeather');

import { getLatLon } from './geocoding.js';
const weatherErrorDiv = $('#errorWeather');
const weatherCityInput = $('#cityInputWeather');

import { dailyWeather } from './weather.js';
const weatherButton = $('#weatherForecast');
weatherButton.click(async event => {
    'use strict';
    event.preventDefault();
    const arr = await getLatLon(weatherCityInput.val(), weatherCountrySelect.val(), weatherErrorDiv);
    dailyWeather(arr);
});

function openWeather() {
    'use strict';
    if (weatherCountrySelect.children().length < 1) {
        countriesList(weatherCountrySelect);
    }
}

import { placesList, findPlaces } from './cities.js';

const citiesCityInput = $('#citiesCityInput');
const citiesCountrySelect = $('#citiesCountrySelect');

const placesArray = [{
    div: $('#attractions'),
    file: '../Travel_Site/places_lists/attractions.json',
    select: $('#attractionsSelect'),
    button: $('#attractionsGo')
}, {
    div: $('#food'),
    file: '../Travel_Site/places_lists/food.json',
    select: $('#foodSelect'),
    button: $('#foodGo')
}, {
    div: $('#health'),
    file: '../Travel_Site/places_lists/health.json',
    select: $('#healthSelect'),
    button: $('#healthGo'),
}, {
    div: $('#stores'),
    file: '../Travel_Site/places_lists/shopping.json',
    select: $('#storesSelect'),
    button: $('#storesGo')
}, {
    div: $('#transportation'),
    file: '../Travel_Site/places_lists/transportation.json',
    select: $('#transportationSelect'),
    button: $('#transportationGo')
}, {
    div: $('#useful'),
    file: '../Travel_Site/places_lists/useful.json',
    select: $('#usefulSelect'),
    button: $('#usefulGo')
}];

let placesPopulated;
function populatePlaces() {
    'use strict';
    if (!placesPopulated) {
        placesArray.forEach(place => {
            const placesClickHandlers = [];
            placesArray.forEach(place => {
                placesClickHandlers.push(() => {
                    $(place.div.children('.display')).text('');
                    if (place.select.children().length < 1) {
                        placesList(place.file, place.select);
                    }
                });
            });
            place.button.click(async event => {
                event.preventDefault();
                const arr = await getLatLon(citiesCityInput.val(), citiesCountrySelect.val(), $('#citiesError'));
                findPlaces(arr, $(place.div.children('.display')), place.select.val());
            });
            navigate(['attractions', 'food', 'health', 'stores', 'transportation', 'useful'], null,
                placesClickHandlers);
        });
        placesPopulated = true;
    }
}

function openCities() {
    'use strict';
    if (citiesCountrySelect.children().length < 1) {
        countriesList(citiesCountrySelect);
    }
    populatePlaces();
}

import navigate from 'js-routing';
navigate(['home', 'cities', 'covid', 'translate', 'weather'], 'home',
    [null, openCities, covidCountries, languagesList, openWeather]);
