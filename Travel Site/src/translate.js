import qs from '../node_modules/qs/dist/qs.js';
import { myAPIkeys } from '../config.js';
//import $ from 'jquery';
// import {jquery} from './index.js';
// const $ = jquery;


//const translateInput = $('#translateInput');
//const translateOutput = $('#translateOutput');
//const languageChoice = $('#language');



export const displayLanguages = async /*function showLanguages*/() => {
    'use strict';
    try {
        const r = await fetch('../languages.json');
        if (!r.ok) {
            throw new Error(`${r.status} ${r.statusText}`);
        }
        const languages = await r.json();
        languages.forEach(lang => {
            $(`<option value="${lang.code}">${lang.name}</option>`).appendTo($('#language'));
        });
    } catch (err) {
        console.error(err);
    }
};


export const retrieveTranslation = async () => {
    'use strict';
    const input = $('#translateInput').val();

    const body = {
        "q": `${input}`,
        "target": `${$('#language').val()}`
    };

    const qsbody = qs.stringify(body);
    try {
        const r = await fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", {
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "accept-encoding": "application/gzip",
                "x-rapidapi-host": "google-translate1.p.rapidapi.com",
                "x-rapidapi-key": myAPIkeys.rapid_api
            },
            "body": qsbody

        });
        if (!r.ok) {
            throw new Error(`${r.status} ${r.statusText}`);
        }
        const output = await r.json();
        $('#translateOutput').text(output.data.translations[0].translatedText);
        console.log(output);
    } catch (err) {
        console.error(err);
    }
};
