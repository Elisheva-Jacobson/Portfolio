import {myAPIkeys} from '../config.js';

export const placesList = async (file, select) => {
    'use strict';
    try {
        const r = await fetch(file);
        if (!r.ok) {
            throw new Error(`${r.status} ${r.statusText}`);
        }
        const data = await r.json();
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
    const [latitude, longitude] = arr;
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