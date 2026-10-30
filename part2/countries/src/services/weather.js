import axios from 'axios'
const appid = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/';

const getWeatherInfo = (lat, lon) => {
    return axios.get(`${BASE_URL}data/4.0/onecall/current`, {
        params: {
            lat,
            lon,
            units: 'metric',
            lang: 'en',
            appid
        }
    }).then(response => response.data)
}

export default { getWeatherInfo }