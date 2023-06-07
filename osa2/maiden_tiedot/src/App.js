import { useState, useEffect } from 'react'
import dataService from './services/countryData'

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

const RenderSearchResults = ({ filter, countryData, searchCountries }) => {
  filter = filter.toLowerCase()

  const results = searchCountries(countryData, filter)

  if (!filter) {
    return null
  }

  if (results.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (results.length > 1) {
    const names = results.map(country =>
      <p key={country.tld[0]}> {country.name.common} </p>
    )

    return names
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
        <img src={country.flags.png} />
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
  const [searchResults, setSearchResults] = useState([])
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    dataService
      .getAll()
      .then(data => {
        setCountryData(data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const searchCountries = (data, filter) => {
    const results = data.filter(country =>
      country.name.common.toLowerCase().includes(filter)
      || country.name.official.toLowerCase().includes(filter)
    )

    return results
  }

  return (
    <div>
      <SearchBox filter={filter} onChange={handleFilterChange} />
      <RenderSearchResults
        filter={filter}
        countryData={countryData}
        searchCountries={searchCountries} />
    </div>
  )

}

export default App;
