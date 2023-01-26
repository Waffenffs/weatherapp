import { useEffect, useState } from 'react'
import Card from './components/Card'

export default function App(){
  /* 
    1. Only thing left to do is styling!!
  */

  const [location, setLocation] = useState('')
  const [latLon, setLatLon] = useState({
    country: '',
    name: '',
    lat: '',
    lon: '',
  })
  const [weather, setWeather] = useState([])

  function handleSubmit(e){
    e.preventDefault()
    
    console.log('submitted')

    const fetchData = async () => {
      const data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=e1b1602a0fa88bbea08d779f80e625ae`)
      data.json().then((result) => {
        const loc = result[0]

        const locationObject = {
          country: loc.country,
          name: loc.name,
          lat: loc.lat,
          lon: loc.lon
        }

        setLatLon(locationObject)
      })
    }

    fetchData()
  }

  useEffect(() => {
    const pullData = async () => {
      const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&units=metric&lon=${latLon.lon}&appid=e1b1602a0fa88bbea08d779f80e625ae`)
      result.json().then((data) => {
        const weatherObject = {
          country: data.sys.country,
          name: data.name,
          temp: data.main,
          weather: data.weather[0]
        }

        const newWeather = weather.filter((data) => data.name !== weatherObject.name)
        setWeather(newWeather)
        setWeather(prevWeather => [...prevWeather, weatherObject])
      })
    }

    pullData()
  }, [latLon])

  const cardElements = weather.map((data) => {
    return <Card data={data}/>
  })

  return(
    <main>
      <form onSubmit={handleSubmit}>
        <h1 className='mainTitle'>Simple Weather APP</h1>
        <div className="formContainer">
          <input placeholder='Enter a city/country' type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          <button>SUBMIT</button>
        </div>
      </form>
      <div className="cardContainer">
        {cardElements}
      </div>
    </main>
  )
}