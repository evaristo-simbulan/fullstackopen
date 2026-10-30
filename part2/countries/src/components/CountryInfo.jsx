import { useState, useEffect } from "react"
import weatherService from "../services/weather"

const CountryInfo = ({ country }) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const latlng = country.capitalInfo?.latlng
        if(!latlng) return
        weatherService
            .getWeatherInfo(latlng[0], latlng[1])
            .then(returnedWeather => setWeather(returnedWeather))
    }, [country])

    console.log(weather)


    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital?.[0] ?? 'no capital'}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages ?? {}).map(([code, name]) => {
                    return <li key={code}>{name}</li>
                })}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            {weather && (
                <div>
                    <h2>Weather in {country.capital?.[0]}</h2>
                    <p>Temperature {weather.data[0].temp} °C</p>
                    <img src={`https://openweathermap.org/payload/api/media/file/${weather.data[0].weather[0].icon}.png`}/>
                    <p>Wind {weather.data[0].wind_speed}</p>
                </div>
            )}

        </div>
    )
}


export default CountryInfo