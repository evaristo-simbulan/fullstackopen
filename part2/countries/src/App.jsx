import { useState, useEffect } from "react"
import axios from 'axios'
import Countries from "./components/Countries"

function App() {

  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

  const handleCountrySearchChange = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <div>
        find countries <input value={searchCountry} onChange={handleCountrySearchChange} />
      </div>
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App
