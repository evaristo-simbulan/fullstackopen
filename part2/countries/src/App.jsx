import { useState, useEffect } from "react"
import axios from 'axios'
import Countries from "./components/Countries"
import CountryInfo from "./components/CountryInfo"

function App() {

  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

  const handleCountrySearchChange = (event) => {
    setSearchCountry(event.target.value)
    setSelectedCountry(null)
  }

  const handleCountryShowSelect = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <div>
        find countries <input value={searchCountry} onChange={handleCountrySearchChange} />
      </div>
      {selectedCountry ? <CountryInfo country={selectedCountry} /> : <Countries countries={countriesToShow} onCountryShowSelect={handleCountryShowSelect} />}
    </div>
  )
}

export default App
