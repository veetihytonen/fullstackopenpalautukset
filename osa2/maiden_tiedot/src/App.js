import { useState, useEffect } from 'react'
import dataService from './services/countryData'
import fetchWeather from './services/weatherData'

const SearchBox = ({ filter, onChange }) => {
  return (
    <>
      <label>find countries </label>
      <input value={filter} onChange={onChange}></input>
    </>
  )
}

const LanguagesListed = ({ languages }) => {
  const asListElements = Object.values(languages).map(language =>
    <li key={language}>{language}</li>
  )

  return (
    <ul>
      {asListElements}
    </ul>
  )
}

const RenderWeatherData = ({ weatherData }) => {
  console.log('render Wather:', weatherData)
}

const RenderSearchResults = ({ filter, results, weatherData, showCountry }) => {
  if (!filter) {
    return null
  }

  if (results.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (results.length > 1) {
    const names = results.map(country =>
      <li style={{ listStyleType: 'none' }} key={country.tld[0]}>
        <label key={country.tld[0]}> {country.name.common} </label>
        <button onClick={() => showCountry(country)}>show</button>
      </li >
    )

    return <div>
      {names}
    </div>
  }

  if (results.length === 1) {
    const country = results[0]

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>
          capital {country.capital} <br />
          area {country.area}
        </p>
        <h3>languages:</h3>
        <LanguagesListed languages={country.languages} />
        <img src={country.flags.png} width={150} height={'auto'} />
        <RenderWeatherData weatherData={weatherData} />
      </div>
    )
  }

  return (
    <p>
      No results
    </p>
  )


}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countryData, setCountryData] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [weatherData, setWeatherData] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  let last_full_match = ''

  // fetch countrydata from api on first render
  useEffect(() => {
    dataService
      .getAll()
      .then(data => {
        data.sort((a, b) => (
          a.name.common.toLowerCase() > b.name.common.toLowerCase()) ? 1 : -1)
        setCountryData(data)
      })
  }, [])

  useEffect(() => {
    if (!filter) {
      setSearchResults([])
      return
    }
    console.log(filter)
    setSearchResults(searchCountries(countryData, filter))
    console.log(searchResults)
    if (searchResults.length === 1) {
      const country = searchResults[0]
      fetchWeather(country.latlng[0], country.latlng[1], api_key)
        .then(data => setWeatherData(data))
    }

  }, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const searchCountries = (data, filter) => {
    const results = data.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
      || country.name.official.toLowerCase().includes(filter.toLowerCase())
    )

    return results
  }

  const showCountry = (country) => {
    setFilter(country.name.common)
  }

  return (
    <div>
      <SearchBox filter={filter} onChange={handleFilterChange} />
      <RenderSearchResults
        filter={filter}
        results={searchResults}
        weatherData={weatherData}
        showCountry={showCountry} />
    </div>
  )

}

export default App;
