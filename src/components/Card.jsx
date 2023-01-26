import { useState } from 'react'
import '../App.css'

export default function Card(props) {
    const data = props.data
    const [weatherData, setWeatherData] = useState({
        country: data.country,
        name: data.name,
        temp: {
            humidity: data.temp.humidity,
            seaLevel: data.temp.sea_level,
            temp: data.temp.temp,
            tempMax: data.temp.temp_max,
            tempMin: data.temp.temp_min
        },
        weather: {
            description: data.weather.description,
            icon: data.weather.icon,
            id: data.weather.id,
            main: data.weather.main,
        }
    })

    return(
        <article>
            <div className="header">
                <h1 className='cardTitle'>{weatherData.name}</h1>
                <div className="countryContainer">
                    <h3 className="country">{weatherData.country}</h3>
                </div>
            </div>
            <div className="desc">
                <h1 className='weatherDescription'>{weatherData.weather.description.toUpperCase()}</h1>
            </div>
            <div className="imageContainer">
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}.png`} alt="weather-image" />
            </div>
            <h1 className="temperature">{weatherData.temp.temp}°C</h1>
            <section>
                <div className="maxMinContainer">
                    <p>Max <span>{weatherData.temp.tempMax} ° C</span></p>
                    <p>Min <span>{weatherData.temp.tempMin} ° C</span></p>
                </div>
                <div className="humidLevelContainer">
                    <p>Humidity <span>{weatherData.temp.humidity}</span></p>
                    <div className="sea">
                        <p>Sealevel {weatherData.temp.seaLevel ? <span>{weatherData.temp.seaLevel}</span> : <span>undefined</span>}</p>
                    </div>
                </div>
            </section>
        </article>
    )
}