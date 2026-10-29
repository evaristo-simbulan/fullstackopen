import { useState, useEffect } from "react"
import axios from 'axios'

function App() {

  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    console.log('hello')
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

  const handleCountrySearchChange = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <form>
        <div>
          find countries <input value={searchCountry} onChange={handleCountrySearchChange} />
        </div>
      </form>
      
      {countriesToShow.length > 11 ? <p>Too many matches, specify another filter</p> :  countriesToShow.map(c => <p key={c.name.common}>{c.name.common}</p>)}

    </div>
  )
}

export default App
