import { useState, useEffect } from "react"
import Countries from "./components/Countries"
import CountryInfo from "./components/CountryInfo"
import countryService from "./services/countries"

function App() {

  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService.getAllCountries()
      .then(returnedCountries => setCountries(returnedCountries))
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
