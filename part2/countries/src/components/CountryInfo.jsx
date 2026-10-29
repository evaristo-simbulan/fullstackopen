const CountryInfo = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital?.[0] ?? 'no capital'}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages ?? {}).map(([code, name]) => {
                    return <li key={code}>{name}</li>
                })}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />

        </div>
    )
}


export default CountryInfo