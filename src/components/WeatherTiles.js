import React, { useState, useEffect } from 'react'

const tileStyles = {
  backgroundImage: `url(${getIconUrl(icon)})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'gray',
  color: 'white',
  margin: '0.1em',
  height: '8em',
  width: '9em',
  textAlign: 'center',
  position: 'relative',
  padding: '0.2em'
}

const setWeatherDataInState = async setWeatherData => {
  try {
    let response = await fetch(
      'https://samples.openweathermap.org/data/2.5/forecast/daily?zip=94040&appid=b6907d289e10d714a6e88b30761fae22'
    )
    let json = await response.json()
    setWeatherData(json)
  } catch (error) {
    console.log(error)
  }
}

const convertTimestamp = timestamp => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const date = new Date(timestamp * 1000)
  return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`
}

const convertTemperature = kelvinTemp => {
  return Math.round(kelvinTemp * (9 / 5) - 459.67)
}

const getIconUrl = icon => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`
}

const WeatherTile = ({ forecast }) => {
  const {
    dt: timestamp,
    temp: { min: lowTemp, max: highTemp },
    weather: [{ main: description, icon }]
  } = forecast

  return (
    <div key={timestamp} style={tileStyles}>
      <div className="tile__date">{convertTimestamp(timestamp)}</div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          width: '95%',
          margin: '0 auto'
        }}
      >
        <span className="tile__description">{description}</span>
        <span className="tile__lowHigh">{`${convertTemperature(
          lowTemp
        )} : ${convertTemperature(highTemp)}`}</span>
      </div>
    </div>
  )
}

const WeatherTiles = () => {
  const [weatherData, setWeatherData] = useState({})
  useEffect(() => {
    setWeatherDataInState(setWeatherData)
  }, [])

  const { list = [] } = weatherData

  return (
    <div style={{ display: 'flex', margin: '0 auto' }}>
      {list.map(dayDetails => (
        <WeatherTile forecast={dayDetails} />
      ))}
    </div>
  )
}

export default WeatherTiles
