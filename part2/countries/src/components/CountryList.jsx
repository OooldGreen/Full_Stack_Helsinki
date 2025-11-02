const CountryList = ({countries, showDetail}) => (
    countries.map(country => 
        <div key={country.area}>
            {country.name.common} 
            <button onClick={() => showDetail(country)}>show</button>
        </div>
))


export default CountryList