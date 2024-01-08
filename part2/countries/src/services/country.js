import axios from 'axios'
const weatherApiKey = import.meta.env.VITE_REACT_APP_API_KEY

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  return axios.get(baseUrl + 'all').then((response) => {
    // console.log('fetching all countries', response)
    return response.data
  })
}

const getWeatherFrom = (country) => {
  console.log('getting weatherdata:', country.capitalInfo.latlng, weatherApiKey)
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${weatherApiKey}`
  return axios.get(weatherUrl).then((res) => res.data)
}

export default { getAll, getWeatherFrom }
