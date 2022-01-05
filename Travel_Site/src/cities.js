import {myAPIkeys} from '../config.js';

// const attractionsSelect = $('#attractionsSelect');
// const attractionsDisplay = $('#attractionsDisplay');
//import $ from 'jquery';
// import {jquery} from './index.js';
// const $ = jquery;

// export const placesArray = [{
//     div: $('#attractions'),
//     file: '../places_lists/attractions.json',
//     select: $('#attractionsSelect'),
//     link: $('#attractionsLink'),
//     button: $('#attractionsGo')
// }, {
//     div: $('#food'),
//     file: '../places_lists/food.json',
//     select: $('#foodSelect'),
//     link: $('#foodLink'),
//     button: $('#foodGo')
// }, {
//     div: $('#health'),
//     file: '../places_lists/health.json',
//     select: $('#healthSelect'),
//     link: $('#healthLink'),
//     button: $('#healthGo'),
// }, {
//     div: $('#stores'),
//     file: '../places_lists/shopping.json',
//     select: $('#storesSelect'),
//     link: $('#storesLink'),
//     button: $('#storesGo')
// }, {
//     div: $('#transportation'),
//     file: '../places_lists/transportation.json',
//     select: $('#transportationSelect'),
//     link: $('#transportationLink'),
//     button: $('#transportationGo')
// }, {
//     div: $('#useful'),
//     file: '../places_lists/useful.json',
//     select: $('#usefulSelect'),
//     link: $('#usefulLink'),
//     button: $('#usefulGo')
// }];

export const placesList = async (file, select) => {
    'use strict';
    try {
        const r = await fetch(file);
        if (!r.ok) {
            throw new Error(`${r.status} ${r.statusText}`);
        }
        const data = await r.json();
        console.log(data);
        data.forEach(a => {
            $(`<option value="${a.value}">${a.name}</option>`).appendTo(select);
        });
    } catch (err) {
        console.error(err);
    }
};
//must be passed which select it is appending to
//must be passed which json file it's loading

export const findPlaces = async (arr, display, type) => {
    'use strict';
    //console.log('display', display);
    const [latitude, longitude] = arr;
    // const latitude = arr[0];
    // const longitude = arr[1];
    display.text('');
    try {
        const r = await fetch(`https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${latitude}%2C${longitude}&type=${type}&radius=10000&language=en`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "trueway-places.p.rapidapi.com",
                "x-rapidapi-key": myAPIkeys.rapid_api
            }
        });
        if (!r.ok) {
            throw new Error(`${r.status} ${r.statusText}`);
        }
        const data = await r.json();
        console.log('data', data);
        console.log('data.results', data.results);
        if (data.results.length > 0) {
            data.results.forEach(result => {
                const address = result.address || 'No Address';
                const website = result.website || 'No Website';
                const phoneNumber = result.phone_number || 'No Phone Number';
                $(`<div class="place">
                <div class="name">${result.name}</div>
                <div class="address">${address}</div>
                <div class="phoneNumber">${phoneNumber}</div>
                <div class="website">${website}</div>
            </div>`).appendTo(display);
            });
        } else {
            $('#citiesError').text('No places found. Try changing your search parameters.');
        }
    } catch (err) {
        console.error(err);
    }
};
//array contains a lat and a long
//must be passed which display it's appending to
//must be passed which type - not pulling it automatically from select