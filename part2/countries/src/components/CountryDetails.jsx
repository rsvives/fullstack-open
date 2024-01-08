const CountryDetails = ({ country, weatherData }) => {
  if (!country) return

  const { name, capital, area, flag, flags, languages } = country
  return (
    <>
      <h2>
        {flag}
        {name.common}
      </h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={flags.png} width={300} />
      <h3>Weather data in {country.capital}</h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <img
          src={
            'https://openweathermap.org/img/wn/' +
            weatherData.weather[0].icon +
            '@2x.png'
          }
          alt=""
        />
        <div>
          <p>
            <b>Temperature: </b>
            {(weatherData.main.temp - 273).toFixed(1)}ºC
          </p>
          <p>
            <b>Wind:</b> {weatherData.wind.speed} m/s
          </p>
        </div>
      </div>
    </>
  )
}
export default CountryDetails
