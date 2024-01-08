const CountryDetails = ({ country }) => {
  if (!country) return

  const { name, capital, area, flag, flags, languages } = country
  return (
    <>
      <h2>
        {name.common}
        {flag}
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
    </>
  )
}
export default CountryDetails
