import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?'

const fetchWeather = (lat, lon, apiKey) => {
    const url = `${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&exclude=minutely,hourly,daily&units=metric`
    const request = axios.get(url)

    return request.then(response => response.data)
}

export default fetchWeather