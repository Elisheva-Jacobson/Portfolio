import $ from 'jquery';
// export const jquery = $;
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
    link: $('#attractionsLink'),
    button: $('#attractionsGo')
}, {
    div: $('#food'),
    file: '../Travel_Site/places_lists/food.json',
    select: $('#foodSelect'),
    link: $('#foodLink'),
    button: $('#foodGo')
}, {
    div: $('#health'),
    file: '../Travel_Site/places_lists/health.json',
    select: $('#healthSelect'),
    link: $('#healthLink'),
    button: $('#healthGo'),
}, {
    div: $('#stores'),
    file: '../Travel_Site/places_lists/shopping.json',
    select: $('#storesSelect'),
    link: $('#storesLink'),
    button: $('#storesGo')
}, {
    div: $('#transportation'),
    file: '../Travel_Site/places_lists/transportation.json',
    select: $('#transportationSelect'),
    link: $('#transportationLink'),
    button: $('#transportationGo')
}, {
    div: $('#useful'),
    file: '../Travel_Site/places_lists/useful.json',
    select: $('#usefulSelect'),
    link: $('#usefulLink'),
    button: $('#usefulGo')
}];

function populatePlaces() {
    'use strict';
    placesArray.forEach(place => {
        //place.div.hide();//so should all be hidden initially - fixed - should all be hidden initially in css
        place.link.click(() => {
            if (place.div.css('display') !== 'block') {
                placesArray.forEach(p => p.div.hide());
                $(place.div.children('.display')).text('');//to clear from other searches
                place.div.show();
                if (place.select.children().length < 1) {
                    console.log('length is less than 1 by type select');
                    placesList(place.file, place.select);
                } 
                // else {
                //     console.log('children', place.select.children());
                //     console.log('length', place.select.children().length);
                // }
            }
        });
        place.button.click(async event => {
            event.preventDefault();
            //console.log('button clicked');
            const arr = await getLatLon(citiesCityInput.val(), citiesCountrySelect.val(), $('#citiesError'));
            findPlaces(arr, $(place.div.children('.display')), place.select.val());
        });
    });

}

function openCities() {
    'use strict';
    if (citiesCountrySelect.children().length < 1) {
        //console.log('it worked');
        countriesList(citiesCountrySelect);
    } else {
        console.log('length was greater than 1');
    }
    populatePlaces();
}

const sections = [
    {
        section: $('#home'),
        //link: $('#homeLink')
        link: $('a[href="#home"]')
    },
    {
        section: $('#cities'),
        //link: $('#citiesLink'),
        link: $('a[href="#cities"]'),
        callback: openCities
    }, {
        section: $('#covid'),
        //link: $('#covidLink'),
        link: $('a[href="#covid"]'),
        callback: covidCountries
    }, {
        section: $('#translate'),
        //link: $('#translateLink'),
        link: $('a[href="#translate"]'),
        callback: languagesList
    }, {
        section: $('#weather'),
        //link: $('#weatherLink'),
        link: $('a[href="#weather"]'),
        callback: openWeather
    }
];

function controlLinks(arr) {
    'use strict';
    arr.forEach(item => {
        //item.section.hide();//should be initially hidden in css, other than home
        item.link.click(() => {
            arr.forEach(i => i.section.hide());
            item.section.show();
            if (item.callback) {
                item.callback();
            }
        });
    });
    //arr[0].section.show();
    //to display the home page
}

controlLinks(sections);
