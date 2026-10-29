import CountryInfo from "./CountryInfo"

const Countries = ({ countries, onCountryShowSelect }) => {

    if (countries.length > 10)
        return <p>Too many matches, specify another filter</p>

    if (countries.length === 1)
        return <CountryInfo country={countries[0]} />


    return (
        countries.map(c => {
            return (
                <p key={c.cca3}>{c.name.common}<button onClick={() => onCountryShowSelect(c)}>Show</button></p>
            )
        })
    )
}

export default Countries