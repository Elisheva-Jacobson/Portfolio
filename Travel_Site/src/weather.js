//import $ from 'jquery';
// import {jquery} from './index.js';
// const $ = jquery;
import { myAPIkeys } from '../config.js';

let currentWeather;
let weatherForecast = [];




export const dailyWeather = async (arr) => {
    'use strict';
    const [latitude, longitude] = arr;
    // const latitude = arr[0];
    // const longitude = arr[1];
    //look up destructuring and use it in this code
    $('#errorWeather').text('');
    try {
        const r = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${myAPIkeys.open_weather_map}&units=imperial&lang=en`);
        if (!r.ok) {
            throw new Error(`${r.status} ${r.statusText}`);
        }
        const data = await r.json();
        //see, maybe can use mapping data instead of doing it like this - nicer
        weatherForecast = [];
        //extraneous that set it above then.
        //also, should see if will even be a problem or if will be cleared automatically

        currentWeather = {
            date: getDate(data.current.dt),
            temperature: data.current.temp,
            feelsLike: data.current.feels_like,
            clouds: data.current.clouds,
            windSpeed: data.current.wind_speed,
            humidity: data.current.humidity,
            weather: data.current.weather[0].main,
            description: data.current.weather[0].description,
            icon: data.current.weather[0].icon
        };


        data.daily.forEach(day => {
            weatherForecast.push({
                date: getDate(day.dt),
                clouds: day.clouds,
                feelsLikeDay: day.feels_like.day,
                feelsLikeEve: day.feels_like.eve,
                feelsLikeMorn: day.feels_like.morn,
                feelsLikeNight: day.feels_like.night,
                humidity: day.humidity,
                tempDay: day.temp.day,
                tempEve: day.temp.eve,
                tempMax: day.temp.max,
                tempMin: day.temp.min,
                tempMorn: day.temp.morn,
                tempNight: day.temp.night,
                weather: day.weather[0].main,
                description: day.weather[0].description,
                icon: day.weather[0].icon,
                windSpeed: day.wind_speed

            });
        });
        //weather alerts are not being handled

        showWeather();
        $('#weatherInfo').show();
    } catch (err) {
        $('#errorWeather').text("We're sorry! That location was not found.");
        $('#weatherInfo').hide();
        //weatherDisplay.hide();
        console.error(err);
    }
    // finally {
    //     weatherDisplay.show();
    // }
};
//with current and alerts as well

const showWeather = () => {
    'use strict';
    $('#currentDate').text(`${currentWeather.date}`);
    $('#currentDescription').text(`${currentWeather.description}`);
    $('#currentWeatherBrief').text(`${currentWeather.weather}`);
    $('#currentTemp').html(`${currentWeather.temperature}&#176;F`);
    $('#currentFeel').html(`${currentWeather.feelsLike}&#176F`);
    //notice used html there
    $('#currentClouds').text(`${currentWeather.clouds}%`);
    $('#currentWeather .icon').attr('src', `https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`)/*.attr('alt', currentWeather.weather)*/;
    $('#currentWindSpeed').text(`${currentWeather.windSpeed}mph`);
    $('#currentHumidity').text(`${currentWeather.humidity}%`);

    $('#diffDayWeather').text('');
    //to clear it from earlier appendings
    for (let i = 0; i < weatherForecast.length; i++) {
        //console.log('added one day to the html');
        $(`<div class = "day"> <div class="date">${weatherForecast[i].date}</div> <div class="weatherBrief">${weatherForecast[i].weather}</div>
        <div class="description">${weatherForecast[i].description}</div>
        <img src="https://openweathermap.org/img/wn/${weatherForecast[i].icon}@2x.png" alt="${weatherForecast[i].weather}" class="icon">
        <div>High <span class="tempMax">${weatherForecast[i].tempMax}&#176;F</span> Low <span class="tempMin">${weatherForecast[i].tempMin}&#176;F</span></div>
        <div>Cloud Cover <span class="clouds">${weatherForecast[i].clouds}%</span>
        </div>
        <div>Wind Speed <span class="windSpeed">${weatherForecast[i].windSpeed}mph</span>
        </div>
        <div>Humidity <span class="humidity">${weatherForecast[i].humidity}%</span>
        </div></div>`).appendTo($('#diffDayWeather'));
    }
};

function getDate(seconds) {
    'use strict';
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString('en-US');
}