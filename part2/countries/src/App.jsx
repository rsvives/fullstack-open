import { useState, useEffect } from 'react'
import countryService from './services/country'
// import CountryDetails from './components/CountryDetails'
import Results from './components/Results'

function App() {
  const [initialCountries, setInitialCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchfield, setSearchfield] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState({})

  const getAllCountriesHook = () => {
    countryService
      .getAll()
      .then((returnedCountries) => {
        console.log('fetched', returnedCountries)
        setInitialCountries(returnedCountries)
      })
      .catch((err) => console.error(err))
  }

  useEffect(getAllCountriesHook, [])

  const handleSearch = (ev) => {
    console.log('searching countries', ev.target.value)
    setSearchfield(ev.target.value)
  }

  const filterCountries = () => {
    if (searchfield) {
      const filteredCountries = initialCountries.filter((c) =>
        c.name.common.toLowerCase().includes(searchfield.toLowerCase())
      )
      // console.log('filtered', searchfield, filteredCountries)
      setFilteredCountries(filteredCountries)
    }
  }

  const selectCountry = (country) => {
    if (filteredCountries.length === 1) {
      const [newSelectedCountry] = filteredCountries
      console.log(newSelectedCountry)
      setSelectedCountry(newSelectedCountry)
    } else if (country) {
      console.log(country)
      setSelectedCountry(country)
    } else {
      setSelectedCountry(null)
    }
  }

  const getWeatherData = () => {
    if (selectedCountry) {
      // console.log('weather::::', selectedCountry)
      countryService.getWeatherFrom(selectedCountry).then((data) => {
        console.log(data)
        setWeatherData(data)
      })
    }
  }

  useEffect(filterCountries, [searchfield])
  useEffect(selectCountry, [filteredCountries])
  useEffect(getWeatherData, [selectedCountry])
  return (
    <>
      <h1>Countries</h1>
      <label htmlFor="search-countries"></label>
      <input
        id="search-countries"
        type="text"
        onChange={handleSearch}
        value={searchfield}
        placeholder="Search for a country"
      />
      <Results
        selectedCountry={selectedCountry}
        countries={filteredCountries}
        searchfield={searchfield}
        selectCountry={selectCountry}
        weatherData={weatherData}
      />
    </>
  )
}

export default App
