import { useState, useEffect } from 'react'
// import './App.css'
import countriesService from './services/countries'
import Country from './components/Country'

function App() {
  const [text, setText] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  // 获得国家数据
  useEffect(() => {
    if(text) {
      countriesService.getAllName().then(allCountries => {
        const filtered = allCountries.filter(country => (
          country.name.common.toLowerCase().includes(text.toLocaleLowerCase())
        ))
        setCountries(filtered)
      }).catch(err => console.log(err))
    } else {
      setCountries([])
    }
  },[text])

  // 获得天气数据
  useEffect(() => {
    if(selectedCountry) { 
      countriesService.getWeather(selectedCountry.capital).then(weather => {
        // console.log(weather.weather[0].icon)
        setWeather(weather)
      })
    }
  }, [selectedCountry])

  const showDetail = (country) => {
    // console.log('show', country)
    setSelectedCountry(country)
    return <Country country={country} weather={weather}></Country>
  }

  const renderCountries = () => {
    if(countries.length >= 10 && text) {
      return <p>Too many matches, specify another filter</p>
    } else if(countries.length > 1) {
      return (countries.map(country => 
        <div key={country.area}>
          {country.name.common} 
          <button onClick={() => showDetail(country)}>show</button>
        </div>
      ))
    } else if(countries.length === 1) {
      if(!selectedCountry) setSelectedCountry(countries[0])
      // return weather && <Country country={countries[0]} weather={weather}></Country>
    }
  }

  const handleChange = (event) => {
    setText(event.target.value)
    setSelectedCountry(null)
  }

  return (
    <>
      <div>find countries  
         <input value={text} onChange={handleChange}/>
         {renderCountries()}
         {selectedCountry && weather && <Country country={selectedCountry} weather={weather}></Country>}
      </div>
    </>
  )
}

export default App
