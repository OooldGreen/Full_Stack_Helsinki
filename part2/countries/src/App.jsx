import { useState, useEffect } from 'react'
// import './App.css'
import countriesService from './services/countries'
import Country from './components/Country'
import CountryList from './components/CountryList'

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

  // 当只有1个国家时，修改state
  useEffect(() => {
    if(countries.length === 1) {
      setSelectedCountry(countries[0])
    }
  }, [countries])

  const showDetail = (country) => {
    // console.log('show', country)
    setSelectedCountry(country)
  }

  const renderCountries = () => {
    if(countries.length >= 10 && text) {
      return <p>Too many matches, specify another filter</p>
    } else if(countries.length > 1) {
      return <CountryList countries={countries} showDetail={showDetail}></CountryList>
    } else if(countries.length === 1) {
      return null
    }
  }

  const handleChange = (event) => {
    setText(event.target.value)
    setSelectedCountry(null)
    setWeather(null)
  }

  return (
    <>
      <div>
         <p>
          Find countries
          <input value={text} onChange={handleChange}/>
        </p>
         {renderCountries()}
         {selectedCountry && weather && <Country country={selectedCountry} weather={weather}></Country>}
      </div>
    </>
  )
}

export default App
