import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const getAllName = () => {
    const request = axios.get('https://restcountries.com/v3.1/all?fields=name,capital,area,languages,flag')
    return request.then(response => response.data)
}

const getWeather = (city) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default { getAllName, getWeather }