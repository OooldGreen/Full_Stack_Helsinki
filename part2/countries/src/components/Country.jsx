const Country = ({country, weather}) => {
    // console.log(weather)
    return (
        <>
          <h1>{country.name.common}</h1>
          <p>Capital {country.capital}</p>
          <p>Area {country.area}</p>

          <h2>languages</h2>
          <ul>
            {Object.values(country.languages).map((language, index) => (
              // console.log(language)
              <li key={index}>{language}</li>
            ))}
          </ul>

          <h2>Weather in {country.capital}</h2>
          <p>Temperature {weather.main.temp}  Celsius</p>
          <p><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img></p>
          <p>Wind {weather.wind.speed} m/s</p>

        </>
    )
}

export default Country