import CountryDetails from './CountryDetails'

const Results = ({
  countries,
  selectedCountry,
  searchfield,
  selectCountry,
  weatherData
}) => {
  if (searchfield !== '') {
    console.log('results component', countries)
    if (countries.length === 0) return <p>No results... :(</p>
    if (countries.length >= 10) return <p>too many countries match...</p>
    if (countries.length === 1 || selectedCountry)
      return (
        <CountryDetails country={selectedCountry} weatherData={weatherData} />
      )

    return countries.map((country) => (
      <p key={country.name.common}>
        {country.name.common}{' '}
        <button onClick={() => selectCountry(country)}>show details</button>
      </p>
    ))
  } else {
    return null
  }
}

export default Results
